// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    // Election status enum
    enum ElectionState { NOT_STARTED, ONGOING, ENDED }
    
    // Candidate structure
    struct Candidate {
        uint id;
        string name;
        string proposal;
        uint voteCount;
        bool exists;
    }
    
    // Voter structure
    struct Voter {
        string name;
        bool isRegistered;
        bool hasVoted;
        uint votedCandidateId;
        address delegate;
        bool hasBeenDelegated;
        uint weight; // Default is 1, increases when someone delegates to this voter
    }
    
    // State variables
    address public admin;
    uint public candidateCount;
    ElectionState public electionState;
    uint public winningCandidateId;
    
    // Mappings
    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;
    
    // Events
    event CandidateAdded(uint candidateId, string name, string proposal);
    event VoterAdded(address voterAddress);
    event ElectionStarted();
    event ElectionEnded();
    event VoteCasted(address voter, uint candidateId);
    event VotingRightDelegated(address from, address to);
    
    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier electionNotStarted() {
        require(electionState == ElectionState.NOT_STARTED, "Election has already started");
        _;
    }
    
    modifier electionOngoing() {
        require(electionState == ElectionState.ONGOING, "Election is not ongoing");
        _;
    }
    
    modifier electionEnded() {
        require(electionState == ElectionState.ENDED, "Election has not ended yet");
        _;
    }
    
    modifier voterExists() {
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        _;
    }
    
    modifier hasNotVoted() {
        require(!voters[msg.sender].hasVoted, "Voter has already voted");
        _;
    }
    
    // Constructor
    constructor() {
        admin = msg.sender;
        electionState = ElectionState.NOT_STARTED;
        candidateCount = 0;
    }
    
    // Add a new candidate - only admin can call before election starts
    function addCandidate(string memory _name, string memory _proposal) public onlyAdmin electionNotStarted {
        candidateCount++;
        candidates[candidateCount] = Candidate({
            id: candidateCount,
            name: _name,
            proposal: _proposal,
            voteCount: 0,
            exists: true
        });
        
        emit CandidateAdded(candidateCount, _name, _proposal);
    }
    
    // Add a new voter - only admin can call before election starts
    function addVoter(address _voter, string memory _name) public onlyAdmin electionNotStarted {
        require(!voters[_voter].isRegistered, "Voter already registered");
        
        voters[_voter] = Voter({
            name: _name,
            isRegistered: true,
            hasVoted: false,
            votedCandidateId: 0,
            delegate: address(0),
            hasBeenDelegated: false,
            weight: 1
        });
        
        emit VoterAdded(_voter);
    }
    
    // Start the election - only admin can call
    function startElection() public onlyAdmin electionNotStarted {
        require(candidateCount > 0, "No candidates registered");
        electionState = ElectionState.ONGOING;
        emit ElectionStarted();
    }
    
    // End the election - only admin can call
    function endElection() public onlyAdmin electionOngoing {
        electionState = ElectionState.ENDED;
        determineWinner();
        emit ElectionEnded();
    }
    
    // Delegate voting right to another voter
    function delegateVotingRight(address _to) public voterExists hasNotVoted electionOngoing {
        require(_to != msg.sender, "Cannot delegate to self");
        require(voters[_to].isRegistered, "Delegate is not a registered voter");
        require(voters[_to].delegate != msg.sender, "Circular delegation not allowed");
        
        address to = _to;
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;
            require(to != msg.sender, "Circular delegation not allowed");
        }
        
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].delegate = _to;
        
        if (!voters[_to].hasVoted) {
            voters[_to].weight += voters[msg.sender].weight;
        } else {
            // If the delegate already voted, add the vote directly to the candidate
            candidates[voters[_to].votedCandidateId].voteCount += voters[msg.sender].weight;
        }
        
        voters[_to].hasBeenDelegated = true;
        
        emit VotingRightDelegated(msg.sender, _to);
    }
    
    // Cast a vote for a candidate
    function vote(uint _candidateId) public voterExists hasNotVoted electionOngoing {
        require(candidates[_candidateId].exists, "Candidate does not exist");
        
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateId = _candidateId;
        
        // Add weight of the voter to the candidate's vote count
        candidates[_candidateId].voteCount += voters[msg.sender].weight;
        
        emit VoteCasted(msg.sender, _candidateId);
    }
    
    // Get candidate details
    function getCandidateDetails(uint _candidateId) public view returns (uint id, string memory name, string memory proposal, uint voteCount) {
        require(candidates[_candidateId].exists, "Candidate does not exist");
        
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.proposal, candidate.voteCount);
    }
    
    // Show election results for a specific candidate
    function getElectionResults(uint _candidateId) public view returns (uint id, string memory name, uint voteCount) {
        require(candidates[_candidateId].exists, "Candidate does not exist");
        
        return (_candidateId, candidates[_candidateId].name, candidates[_candidateId].voteCount);
    }
    
    // View voter profile
    function getVoterProfile(address _voter) public view returns (string memory name, uint votedCandidateId, bool delegated) {
        require(voters[_voter].isRegistered, "Voter is not registered");
        
        return (voters[_voter].name, voters[_voter].votedCandidateId, voters[_voter].delegate != address(0));
    }
    
    // Determine the winner of the election
    function determineWinner() private {
        uint maxVotes = 0;
        
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winningCandidateId = i;
            }
        }
    }
    
    // Show the winner of the election
    function getWinner() public view electionEnded returns (string memory name, uint id, uint voteCount) {
        require(winningCandidateId > 0, "No winner determined yet");
        
        Candidate memory winner = candidates[winningCandidateId];
        return (winner.name, winner.id, winner.voteCount);
    }
    
    // Get list of all candidates
    function getAllCandidates() public view returns (uint[] memory ids, string[] memory names, uint[] memory voteCounts) {
        ids = new uint[](candidateCount);
        names = new string[](candidateCount);
        voteCounts = new uint[](candidateCount);
        
        for (uint i = 1; i <= candidateCount; i++) {
            ids[i-1] = candidates[i].id;
            names[i-1] = candidates[i].name;
            voteCounts[i-1] = candidates[i].voteCount;
        }
        
        return (ids, names, voteCounts);
    }
}