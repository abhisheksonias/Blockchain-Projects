// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    // Enum to track election state
    enum ElectionState { PENDING, ONGOING, ENDED }
    ElectionState public electionState;
    
    address public owner;
    
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
    
    // Storage for candidates and voters
    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;
    address[] public voterAddresses;
    uint public candidatesCount;
    
    // Winner info
    uint public winnerId;
    string public winnerName;
    uint public winnerVotes;
    bool public winnerDeclared;
    
    // Events
    event CandidateAdded(uint candidateId, string name);
    event VoterAdded(address voter);
    event ElectionStarted();
    event ElectionEnded();
    event VoteCasted(address voter, uint candidateId);
    event VotingRightDelegated(address from, address to);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyBeforeElection() {
        require(electionState == ElectionState.PENDING, "Election has already started");
        _;
    }
    
    modifier onlyDuringElection() {
        require(electionState == ElectionState.ONGOING, "Election is not ongoing");
        _;
    }
    
    modifier onlyAfterElection() {
        require(electionState == ElectionState.ENDED, "Election has not ended yet");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        electionState = ElectionState.PENDING;
        candidatesCount = 0;
        winnerDeclared = false;
    }
    
    // Function 1: Add a new candidate (only by admin, before election starts)
    function addCandidate(string memory _name, string memory _proposal) public onlyOwner onlyBeforeElection {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _proposal, 0, true);
        emit CandidateAdded(candidatesCount, _name);
    }
    
    // Function 2: Add a new voter (only by admin, before election starts)
    function addVoter(address _voter, string memory _name) public onlyOwner onlyBeforeElection {
        require(!voters[_voter].isRegistered, "Voter already registered");
        voters[_voter] = Voter(_name, true, false, 0, address(0), false, 1);
        voterAddresses.push(_voter);
        emit VoterAdded(_voter);
    }
    
    // Function 3: Start Election (only by admin)
    function startElection() public onlyOwner onlyBeforeElection {
        require(candidatesCount > 0, "No candidates registered");
        electionState = ElectionState.ONGOING;
        emit ElectionStarted();
    }
    
    // Function 4: Display candidate details
    function getCandidateDetails(uint _candidateId) public view returns (uint id, string memory name, string memory proposal, uint voteCount) {
        require(candidates[_candidateId].exists, "Candidate does not exist");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.proposal, candidate.voteCount);
    }
    
    // Function 5: Show the winner of the election
    function showWinner() public onlyAfterElection returns (string memory name, uint id, uint votes) {
        if (!winnerDeclared) {
            determineWinner();
        }
        return (winnerName, winnerId, winnerVotes);
    }
    
    // Helper function to determine the winner
    function determineWinner() private {
        uint maxVotes = 0;
        
        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerId = i;
                winnerName = candidates[i].name;
                winnerVotes = candidates[i].voteCount;
            }
        }
        
        winnerDeclared = true;
    }
    
    // Function 6: Delegate voting right
    function delegateVote(address _to) public onlyDuringElection {
        Voter storage sender = voters[msg.sender];
        
        require(sender.isRegistered, "You are not a registered voter");
        require(!sender.hasVoted, "You have already voted");
        require(_to != msg.sender, "Self-delegation is not allowed");
        require(voters[_to].isRegistered, "Delegate is not a registered voter");
        
        // Handle transitive delegation
        address to = _to;
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;
            require(to != msg.sender, "Delegation loop detected");
        }
        
        // Update delegation
        sender.delegate = _to;
        sender.hasBeenDelegated = true;
        
        Voter storage delegate = voters[_to];
        if (delegate.hasVoted) {
            // If delegate already voted, add weight to the candidate
            candidates[delegate.votedCandidateId].voteCount += sender.weight;
        } else {
            // If not, add weight to the delegate
            delegate.weight += sender.weight;
        }
        
        emit VotingRightDelegated(msg.sender, _to);
    }
    
    // Function 7: Cast vote
    function vote(uint _candidateId) public onlyDuringElection {
        Voter storage sender = voters[msg.sender];
        
        require(sender.isRegistered, "You are not a registered voter");
        require(!sender.hasVoted, "You have already voted");
        require(candidates[_candidateId].exists, "Candidate does not exist");
        
        sender.hasVoted = true;
        sender.votedCandidateId = _candidateId;
        
        // Add weight to the candidate's vote count
        candidates[_candidateId].voteCount += sender.weight;
        
        emit VoteCasted(msg.sender, _candidateId);
    }
    
    // Function 8: End the election
    function endElection() public onlyOwner onlyDuringElection {
        electionState = ElectionState.ENDED;
        emit ElectionEnded();
    }
    
    // Function 9: Show election results for a specific candidate
    function getCandidateResults(uint _candidateId) public view returns (uint id, string memory name, uint votes) {
        require(candidates[_candidateId].exists, "Candidate does not exist");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }
    
    // Function 10: View voter profile
    function getVoterProfile(address _voter) public view returns (string memory name, uint votedCandidateId, bool hasDelegated) {
        require(voters[_voter].isRegistered, "Voter not registered");
        Voter memory voter = voters[_voter];
        return (voter.name, voter.votedCandidateId, voter.hasBeenDelegated);
    }
    
    // Helper function to get all candidates
    function getAllCandidates() public view returns (uint[] memory ids, string[] memory names, uint[] memory votes) {
        ids = new uint[](candidatesCount);
        names = new string[](candidatesCount);
        votes = new uint[](candidatesCount);
        
        for (uint i = 1; i <= candidatesCount; i++) {
            ids[i-1] = candidates[i].id;
            names[i-1] = candidates[i].name;
            votes[i-1] = candidates[i].voteCount;
        }
        
        return (ids, names, votes);
    }
    
    // Get current election state as string
    function getElectionState() public view returns (string memory) {
        if (electionState == ElectionState.PENDING) return "PENDING";
        if (electionState == ElectionState.ONGOING) return "ONGOING";
        return "ENDED";
    }
}