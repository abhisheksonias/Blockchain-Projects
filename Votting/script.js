const contractAddress = "0x9bfbc684a37efd7f99ee259833dac0fc371c857e";
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "proposal",
				"type": "string"
			}
		],
		"name": "CandidateAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ElectionEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ElectionStarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "candidateId",
				"type": "uint256"
			}
		],
		"name": "VoteCasted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "voterAddress",
				"type": "address"
			}
		],
		"name": "VoterAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "VotingRightDelegated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_proposal",
				"type": "string"
			}
		],
		"name": "addCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "candidateCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "proposal",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "delegateVotingRight",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "electionState",
		"outputs": [
			{
				"internalType": "enum VotingSystem.ElectionState",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCandidates",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "names",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "voteCounts",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getCandidateDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "proposal",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "getElectionResults",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			}
		],
		"name": "getVoterProfile",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "votedCandidateId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "delegated",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startElection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_candidateId",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isRegistered",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "hasVoted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "votedCandidateId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "hasBeenDelegated",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "weight",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningCandidateId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let votingContract;
let currentAccount;
let isAdmin = false;
let electionState = 0; // 0: NOT_STARTED, 1: ONGOING, 2: ENDED


// DOM Elements
const accountAddress = document.getElementById('account-address');
const accountRole = document.getElementById('account-role');
const electionStatus = document.getElementById('election-status');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const addCandidateForm = document.getElementById('add-candidate-form');
const addVoterForm = document.getElementById('add-voter-form');
const startElectionBtn = document.getElementById('start-election');
const endElectionBtn = document.getElementById('end-election');
const candidatesList = document.getElementById('candidates-list');
const delegateForm = document.getElementById('delegate-form');
const voterDetailsSection = document.getElementById('voter-details');
const resultsTableBody = document.getElementById('results-table-body');
const winnerCard = document.getElementById('winner-card');
const winnerName = document.getElementById('winner-name');
const winnerId = document.getElementById('winner-id');
const winnerVotes = document.getElementById('winner-votes');
const candidateDetailsModal = document.getElementById('candidate-details-modal');
const voterDetailsModal = document.getElementById('voter-details-modal');
const closeButtons = document.querySelectorAll('.close-btn');
const notification = document.getElementById('notification');
const modalVoteBtn = document.getElementById('modal-vote-btn');
let selectedCandidateId = null;

// Initialize the application
async function init() {
	// Check if MetaMask is installed
	if (window.ethereum) {
		try {
			// Request account access
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			currentAccount = accounts[0];

			// Initialize Web3
			web3 = new Web3(window.ethereum);

			// Initialize the contract
			votingContract = new web3.eth.Contract(
				
				contractABI,
				contractAddress
			);

			// Setup event listeners for account changes
			window.ethereum.on('accountsChanged', handleAccountsChanged);

			// Initial UI update
			updateUI();

			// Event listeners
			setupEventListeners();

			// Show success message
			showNotification('Connected to blockchain successfully!', 'success');
		} catch (error) {
			console.error("User denied account access or error occurred:", error);
			showNotification('Failed to connect to blockchain. Please allow access to your MetaMask account.', 'error');
		}
	} else {
		showNotification('MetaMask is not installed. Please install it to use this application.', 'error');
	}
}

// Handle account changes in MetaMask
function handleAccountsChanged(accounts) {
	if (accounts.length === 0) {
		// MetaMask is locked or the user has no accounts
		showNotification('Please connect to MetaMask.', 'warning');
	} else if (accounts[0] !== currentAccount) {
		currentAccount = accounts[0];
		updateUI();
		showNotification('Account changed, refreshing data...', 'success');
	}
}

// Update the UI based on current state
async function updateUI() {
	try {
		// Update account info
		accountAddress.textContent = currentAccount;

		// Check if current user is admin
		const admin = await votingContract.methods.admin().call();
		isAdmin = admin.toLowerCase() === currentAccount.toLowerCase();
		accountRole.textContent = `Role: ${isAdmin ? 'Admin' : 'Voter'}`;

		// Get election state
		electionState = await votingContract.methods.electionState().call();
		const statusText = ['Not Started', 'Ongoing', 'Ended'][electionState];
		electionStatus.textContent = `Election Status: ${statusText}`;

		// Update admin panel based on election state
		updateAdminPanel();

		// Update voter panel
		loadVoterProfile();
		loadCandidates();

		// Update results panel
		loadResults();

		// Adjust UI based on election state
		if (electionState == 2) { // ENDED
			loadWinner();
		} else {
			// Hide winner card if election not ended
			winnerCard.style.display = 'none';
		}
	} catch (error) {
		console.error("Error updating UI:", error);
		showNotification('Error updating UI. See console for details.', 'error');
	}
}

// Update admin panel based on election state
function updateAdminPanel() {
	const addCandidateForm = document.getElementById('add-candidate-form');
	const addVoterForm = document.getElementById('add-voter-form');

	// Disable/enable forms based on election state
	if (electionState > 0) { // If election started or ended
		addCandidateForm.querySelectorAll('input, textarea, button').forEach(el => el.disabled = true);
		addVoterForm.querySelectorAll('input, button').forEach(el => el.disabled = true);
	} else {
		addCandidateForm.querySelectorAll('input, textarea, button').forEach(el => el.disabled = false);
		addVoterForm.querySelectorAll('input, button').forEach(el => el.disabled = false);
	}

	// Update election control buttons
	if (electionState == 0) { // NOT_STARTED
		startElectionBtn.disabled = false;
		endElectionBtn.disabled = true;
	} else if (electionState == 1) { // ONGOING
		startElectionBtn.disabled = true;
		endElectionBtn.disabled = false;
	} else { // ENDED
		startElectionBtn.disabled = true;
		endElectionBtn.disabled = true;
	}
}

// Load voter profile
async function loadVoterProfile() {
	try {
		const voterName = document.getElementById('voter-profile-name');
		const voterStatus = document.getElementById('voter-status');
		const voterVotedFor = document.getElementById('voter-voted-for');
		const voterDelegation = document.getElementById('voter-delegation');

		// Get voter details
		const voter = await votingContract.methods.voters(currentAccount).call();

		if (voter.isRegistered) {
			voterName.textContent = voter.name;
			voterStatus.textContent = voter.hasVoted ? 'Voted' : 'Not Voted';

			if (voter.hasVoted) {
				if (voter.votedCandidateId > 0) {
					const candidateDetails = await votingContract.methods.getCandidateDetails(voter.votedCandidateId).call();
					voterVotedFor.textContent = candidateDetails.name;
				} else {
					voterVotedFor.textContent = 'None';
				}
			} else {
				voterVotedFor.textContent = 'None';
			}

			if (voter.delegate !== '0x0000000000000000000000000000000000000000') {
				const delegateVoter = await votingContract.methods.voters(voter.delegate).call();
				voterDelegation.textContent = `Delegated to ${delegateVoter.name}`;
			} else if (voter.hasBeenDelegated) {
				voterDelegation.textContent = 'Others have delegated to you';
			} else {
				voterDelegation.textContent = 'None';
			}
		} else {
			voterName.textContent = 'Not registered';
			voterStatus.textContent = 'Not registered';
			voterVotedFor.textContent = 'None';
			voterDelegation.textContent = 'None';
		}
	} catch (error) {
		console.error("Error loading voter profile:", error);
	}
}

// Load candidates
async function loadCandidates() {
	try {
		// Get all candidates
		const result = await votingContract.methods.getAllCandidates().call();
		const { ids, names, voteCounts } = result;

		if (ids.length === 0) {
			candidatesList.innerHTML = '<p class="empty-state">No candidates available</p>';
			return;
		}

		let candidatesHTML = '';

		for (let i = 0; i < ids.length; i++) {
			candidatesHTML += `
                <div class="candidate-card" data-id="${ids[i]}">
                    <h4>${names[i]}</h4>
                    <p>ID: ${ids[i]}</p>
                    <p>Votes: ${voteCounts[i]}</p>
                    <span class="view-details-btn" data-id="${ids[i]}">View Details</span>
                </div>
            `;
		}

		candidatesList.innerHTML = candidatesHTML;

		// Add event listeners to view details buttons
		document.querySelectorAll('.view-details-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.stopPropagation();
				const candidateId = e.target.dataset.id;
				openCandidateDetailsModal(candidateId);
			});
		});

		// Add event listeners to candidate cards
		document.querySelectorAll('.candidate-card').forEach(card => {
			card.addEventListener('click', () => {
				const candidateId = card.dataset.id;
				openCandidateDetailsModal(candidateId);
			});
		});
	} catch (error) {
		console.error("Error loading candidates:", error);
		candidatesList.innerHTML = '<p class="empty-state">Error loading candidates</p>';
	}
}

// Load results
async function loadResults() {
	try {
		// Get all candidates
		const result = await votingContract.methods.getAllCandidates().call();
		const { ids, names, voteCounts } = result;

		if (ids.length === 0) {
			resultsTableBody.innerHTML = '<tr><td colspan="4" class="empty-state">No results available</td></tr>';
			return;
		}

		let resultsHTML = '';

		for (let i = 0; i < ids.length; i++) {
			resultsHTML += `
                <tr>
                    <td>${ids[i]}</td>
                    <td>${names[i]}</td>
                    <td>${voteCounts[i]}</td>
                    <td>
                        <button class="btn" onclick="openCandidateDetailsModal('${ids[i]}')">Details</button>
                    </td>
                </tr>
            `;
		}

		resultsTableBody.innerHTML = resultsHTML;
	} catch (error) {
		console.error("Error loading results:", error);
		resultsTableBody.innerHTML = '<tr><td colspan="4" class="empty-state">Error loading results</td></tr>';
	}
}

// Load winner details
async function loadWinner() {
	try {
		// Only attempt to get winner if election has ended
		if (electionState != 2) {
			winnerCard.style.display = 'none';
			return;
		}
		
		// Check if there are any candidates first
		const result = await votingContract.methods.getAllCandidates().call();
		if (result.ids.length === 0) {
			winnerCard.style.display = 'none';
			showNotification('No candidates available to determine winner', 'warning');
			return;
		}
		
		// Check if any votes have been cast
		let totalVotes = 0;
		for (let i = 0; i < result.voteCounts.length; i++) {
			totalVotes += parseInt(result.voteCounts[i]);
		}
		
		if (totalVotes === 0) {
			winnerCard.style.display = 'none';
			showNotification('No votes cast - cannot determine a winner', 'warning');
			return;
		}
		
		// Now try to get the winner
		const winner = await votingContract.methods.getWinner().call();
		
		winnerName.textContent = winner.name;
		winnerId.textContent = winner.id;
		winnerVotes.textContent = winner.voteCount;
		
		winnerCard.style.display = 'block';
	} catch (error) {
		console.error("Error loading winner:", error);
		winnerCard.style.display = 'none';
		
		// Check if the error is about "No winner determined yet"
		if (error.message && error.message.includes("No winner determined yet")) {
			showNotification('No winner can be determined yet', 'warning');
		} else {
			showNotification('Error loading winner: ' + error.message, 'error');
		}
	}
}

// Open candidate details modal
async function openCandidateDetailsModal(candidateId) {
	try {
		const candidateDetails = await votingContract.methods.getCandidateDetails(candidateId).call();

		document.getElementById('modal-candidate-name').textContent = candidateDetails.name;
		document.getElementById('modal-candidate-id').textContent = candidateDetails.id;
		document.getElementById('modal-candidate-proposal').textContent = candidateDetails.proposal;
		document.getElementById('modal-candidate-votes').textContent = candidateDetails.voteCount;
        
        // Check if voting is allowed
        const voter = await votingContract.methods.voters(currentAccount).call();
        const canVote = electionState === 1 && voter.isRegistered && !voter.hasVoted;
        
        modalVoteBtn.style.display = canVote ? 'block' : 'none';
        selectedCandidateId = candidateId;
        
        candidateDetailsModal.style.display = 'block';
    } catch (error) {
        console.error("Error opening candidate details:", error);
        showNotification('Error loading candidate details', 'error');
    }
}

// Open voter details modal
async function openVoterDetailsModal(voterAddress) {
    try {
        const voter = await votingContract.methods.voters(voterAddress).call();
        
        document.getElementById('modal-voter-name').textContent = voter.name;
        document.getElementById('modal-voter-address').textContent = voterAddress;
        document.getElementById('modal-voter-status').textContent = voter.hasVoted ? 'Voted' : 'Not Voted';
        
        if (voter.hasVoted && voter.votedCandidateId > 0) {
            const candidateDetails = await votingContract.methods.getCandidateDetails(voter.votedCandidateId).call();
            document.getElementById('modal-voter-voted-for').textContent = candidateDetails.name;
        } else {
            document.getElementById('modal-voter-voted-for').textContent = 'None';
        }
        
        if (voter.delegate !== '0x0000000000000000000000000000000000000000') {
            const delegateVoter = await votingContract.methods.voters(voter.delegate).call();
            document.getElementById('modal-voter-delegation').textContent = delegateVoter.name;
        } else {
            document.getElementById('modal-voter-delegation').textContent = 'None';
        }
        
        voterDetailsModal.style.display = 'block';
    } catch (error) {
        console.error("Error opening voter details:", error);
        showNotification('Error loading voter details', 'error');
    }
}

// Vote for a candidate
async function voteForCandidate(candidateId) {
    try {
        await votingContract.methods.vote(candidateId).send({ from: currentAccount });
        showNotification('Vote cast successfully!', 'success');
        candidateDetailsModal.style.display = 'none';
        updateUI();
    } catch (error) {
        console.error("Error voting:", error);
        showNotification('Error casting vote: ' + error.message, 'error');
    }
}

// Delegate vote
async function delegateVote(delegateAddress) {
    try {
        await votingContract.methods.delegateVotingRight(delegateAddress).send({ from: currentAccount });
        showNotification('Vote delegated successfully!', 'success');
        updateUI();
    } catch (error) {
        console.error("Error delegating vote:", error);
        showNotification('Error delegating vote: ' + error.message, 'error');
    }
}

// This function is redundant with the improved loadWinner function
// Removed to avoid duplication and potential conflicts
// async function loadWinnerIfEnded() {
//     ...
// }

// Add a new candidate
async function addCandidate(name, proposal) {
    try {
        await votingContract.methods.addCandidate(name, proposal).send({ from: currentAccount });
        showNotification('Candidate added successfully!', 'success');
        updateUI();
        addCandidateForm.reset();
    } catch (error) {
        console.error("Error adding candidate:", error);
        showNotification('Error adding candidate: ' + error.message, 'error');
    }
}

// Add a new voter
async function addVoter(voterAddress, voterName) {
    try {
        await votingContract.methods.addVoter(voterAddress, voterName).send({ from: currentAccount });
        showNotification('Voter added successfully!', 'success');
        updateUI();
        addVoterForm.reset();
    } catch (error) {
        console.error("Error adding voter:", error);
        showNotification('Error adding voter: ' + error.message, 'error');
    }
}

// Start the election
async function startElection() {
    try {
        await votingContract.methods.startElection().send({ from: currentAccount });
        showNotification('Election started successfully!', 'success');
        updateUI();
    } catch (error) {
        console.error("Error starting election:", error);
        showNotification('Error starting election: ' + error.message, 'error');
    }
}

// End the election
async function endElection() {
    try {
        // Get all candidates first to check if there are any
        const result = await votingContract.methods.getAllCandidates().call();
        if (result.ids.length === 0) {
            showNotification('Cannot end election: No candidates available', 'warning');
            return;
        }
        
        // Check if any votes have been cast
        let totalVotes = 0;
        for (let i = 0; i < result.voteCounts.length; i++) {
            totalVotes += parseInt(result.voteCounts[i]);
        }
        
        if (totalVotes === 0) {
            showNotification('Warning: No votes cast. Ending election anyway.', 'warning');
        }
        
        await votingContract.methods.endElection().send({ from: currentAccount });
        showNotification('Election ended successfully!', 'success');
        updateUI();
    } catch (error) {
        console.error("Error ending election:", error);
        showNotification('Error ending election: ' + error.message, 'error');
    }
}

// Show notification
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Setup event listeners
function setupEventListeners() {
    // Tab navigation
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show active tab content
            tabContents.forEach(content => {
                if (content.id === tabName) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
    
    // Add candidate form
    addCandidateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('candidate-name').value;
        const proposal = document.getElementById('candidate-proposal').value;
        addCandidate(name, proposal);
    });
    
    // Add voter form
    addVoterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const address = document.getElementById('voter-address').value;
        const name = document.getElementById('voter-name').value;
        addVoter(address, name);
    });
    
    // Delegate form
    delegateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const delegateAddress = document.getElementById('delegate-address').value;
        delegateVote(delegateAddress);
    });
    
    // Start election button
    startElectionBtn.addEventListener('click', startElection);
    
    // End election button
    endElectionBtn.addEventListener('click', endElection);
    
    // Vote button in modal
    modalVoteBtn.addEventListener('click', () => {
        if (selectedCandidateId) {
            voteForCandidate(selectedCandidateId);
        }
    });
    
    // Close buttons for modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            candidateDetailsModal.style.display = 'none';
            voterDetailsModal.style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === candidateDetailsModal) {
            candidateDetailsModal.style.display = 'none';
        }
        if (e.target === voterDetailsModal) {
            voterDetailsModal.style.display = 'none';
        }
    });
    
    // Check for smart contract events
    setupContractEvents();
}

// Setup contract events
function setupContractEvents() {
    try {
        // Alternative approach for event listening using getPastEvents and polling
        // This approach is more compatible with different Web3 versions
        
        // Set up polling for events every 5 seconds
        const pollEvents = async () => {
            try {
                // Get the latest block number
                const latestBlock = await web3.eth.getBlockNumber();
                const fromBlock = localStorage.getItem('lastCheckedBlock') || 0;
                
                // Update the last checked block
                localStorage.setItem('lastCheckedBlock', latestBlock);
                
                // Check for CandidateAdded events
                const CandidateAddedEvents = await votingContract.getPastEvents('CandidateAdded', {
                    fromBlock: fromBlock,
                    toBlock: 'latest'
                });
                
                CandidateAddedEvents.forEach(event => {
                    showNotification(`New candidate added: ${event.returnValues.name}`, 'info');
                    loadCandidates();
                });
                
                // Check for VoterAdded events
                const VoterAddedEvents = await votingContract.getPastEvents('VoterAdded', {
                    fromBlock: fromBlock,
                    toBlock: 'latest'
                });
                
                VoterAddedEvents.forEach(event => {
                    showNotification(`New voter registered: ${event.returnValues.name}`, 'info');
                    loadVoterProfile();
                });
                
                // Check for VoteCasted events
                const VoteCastedEvents = await votingContract.getPastEvents('VoteCasted', {
                    fromBlock: fromBlock,
                    toBlock: 'latest'
                });
                
                VoteCastedEvents.forEach(event => {
                    showNotification(`Vote cast by: ${event.returnValues.voter}`, 'info');
                    loadCandidates();
                    loadVoterProfile();
                });
                
                // Check for VotingRightDelegated events
                const VotingRightDelegatedEvents = await votingContract.getPastEvents('VotingRightDelegated', {
                    fromBlock: fromBlock,
                    toBlock: 'latest'
                });
                
                VotingRightDelegatedEvents.forEach(event => {
                    showNotification(`Vote delegated from ${event.returnValues.from} to ${event.returnValues.to}`, 'info');
                    loadVoterProfile();
                });
                
                // Check for ElectionStarted events
                const electionStartedEvents = await votingContract.getPastEvents('ElectionStarted', {
                    fromBlock: fromBlock,
                    toBlock: 'latest'
                });
                
                electionStartedEvents.forEach(() => {
                    showNotification('Election has started!', 'info');
                    updateUI();
                });
                
                // Check for ElectionEnded events
                const electionEndedEvents = await votingContract.getPastEvents('ElectionEnded', {
                    fromBlock: fromBlock,
                    toBlock: 'latest'
                });
                
                electionEndedEvents.forEach(() => {
                    showNotification('Election has ended!', 'info');
                    updateUI();
                });
                
            } catch (error) {
                console.error("Error polling events:", error);
            }
        };
        
        // Start polling for events
        setInterval(pollEvents, 5000);
        
        // Run once immediately
        pollEvents();
        
    } catch (error) {
        console.error("Error setting up event listeners:", error);
        showNotification('Error setting up event listeners', 'error');
    }
}

// Initialize the application when the page loads
window.addEventListener('load', init);

// Optional helpers for testing
window.voteForCandidate = voteForCandidate;
window.delegateVote = delegateVote;
window.openVoterDetailsModal = openVoterDetailsModal;
window.openCandidateDetailsModal = openCandidateDetailsModal;