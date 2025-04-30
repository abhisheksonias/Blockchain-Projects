// Replace these values with your actual deployed contract information
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
				"name": "id",
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
				"internalType": "enum JobPortal.ApplicantType",
				"name": "applicantType",
				"type": "uint8"
			}
		],
		"name": "ApplicantAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			}
		],
		"name": "JobAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "applicantId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "jobId",
				"type": "uint256"
			}
		],
		"name": "JobApplied",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "applicantId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "jobId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "score",
				"type": "uint8"
			}
		],
		"name": "RatingProvided",
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
				"name": "_contactInfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_skillsDescription",
				"type": "string"
			},
			{
				"internalType": "enum JobPortal.ApplicantType",
				"name": "_applicantType",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_personalDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_laborHistory",
				"type": "string"
			}
		],
		"name": "addApplicant",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_salary",
				"type": "uint256"
			},
			{
				"internalType": "enum JobPortal.ApplicantType",
				"name": "_requiredType",
				"type": "uint8"
			}
		],
		"name": "addJob",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "applicantRatingCount",
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
		"name": "applicantTotalRatings",
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
		"name": "applicants",
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
				"name": "contactInfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "skillsDescription",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			},
			{
				"internalType": "enum JobPortal.ApplicantType",
				"name": "applicantType",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "personalDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "laborHistory",
				"type": "string"
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
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "applications",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_applicantId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_jobId",
				"type": "uint256"
			}
		],
		"name": "applyForJob",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getApplicantCount",
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
				"name": "_applicantId",
				"type": "uint256"
			}
		],
		"name": "getApplicantDetails",
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
				"name": "contactInfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "skillsDescription",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "personalDetails",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "laborHistory",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_applicantId",
				"type": "uint256"
			}
		],
		"name": "getApplicantRating",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "averageRating",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "totalRatings",
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
				"name": "_applicantId",
				"type": "uint256"
			}
		],
		"name": "getApplicantType",
		"outputs": [
			{
				"internalType": "enum JobPortal.ApplicantType",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getJobCount",
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
				"name": "_jobId",
				"type": "uint256"
			}
		],
		"name": "getJobDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "employer",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isOpen",
				"type": "bool"
			},
			{
				"internalType": "enum JobPortal.ApplicantType",
				"name": "requiredType",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_applicantId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_jobId",
				"type": "uint256"
			}
		],
		"name": "getJobRatingDetails",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "score",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "comment",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_applicantId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_jobId",
				"type": "uint256"
			}
		],
		"name": "hireApplicant",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "jobs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "employer",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isOpen",
				"type": "bool"
			},
			{
				"internalType": "enum JobPortal.ApplicantType",
				"name": "requiredType",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_applicantId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_jobId",
				"type": "uint256"
			}
		],
		"name": "markJobCompleted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_applicantId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_jobId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_score",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_comment",
				"type": "string"
			}
		],
		"name": "rateApplicant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ratings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "applicantId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "jobId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "score",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "comment",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0xfb9cccc15dc5091f07d92565351cc7c0e3b641ed'; // Replace with your deployed contract address

let web3;
let jobPortalContract;
let accounts;


// Connect to Web3 provider
async function connectWeb3() {
	try {
		// Check if MetaMask is installed
		if (window.ethereum) {
			console.log("MetaMask detected");
			try {
				// Request account access
				web3 = new Web3(window.ethereum);
				accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
				console.log("Connected accounts:", accounts);

				// Initialize contract
				initContract();
				updateConnectionStatus(true, `Connected to blockchain. Account: ${accounts[0]}`);

				// Setup event listeners for account changes
				window.ethereum.on('accountsChanged', async (newAccounts) => {
					accounts = newAccounts;
					console.log("Accounts changed:", accounts);
					updateConnectionStatus(true, `Connected. Account: ${accounts[0]}`);
				});

				// Setup event listeners for chain changes
				window.ethereum.on('chainChanged', () => {
					// Reload the page when chain changes
					window.location.reload();
				});
			} catch (error) {
				console.error("User denied account access or connection failed", error);
				updateConnectionStatus(false, "You need to connect your wallet to use this application");
			}
		}
		// Legacy dapp browsers
		else if (window.web3) {
			console.log("Legacy web3 provider detected");
			web3 = new Web3(window.web3.currentProvider);
			accounts = await web3.eth.getAccounts();
			console.log("Connected accounts:", accounts);
			initContract();
			updateConnectionStatus(true, `Connected to blockchain. Account: ${accounts[0]}`);
		}
		// No web3 provider
		else {
			console.error("No web3 provider detected");
			updateConnectionStatus(false, "No web3 provider detected. Please install MetaMask or use a Web3-enabled browser.");
		}
	} catch (error) {
		console.error("Failed to connect to Web3:", error);
		updateConnectionStatus(false, `Connection error: ${error.message}`);
	}
}

// Update connection status
function updateConnectionStatus(connected, message) {
	const statusElement = document.getElementById('connectionStatus');

	if (connected) {
		statusElement.className = 'connected';
		statusElement.textContent = message || `Connected to blockchain. Account: ${accounts[0]}`;
	} else {
		statusElement.className = 'disconnected';
		statusElement.textContent = message || 'Not connected to blockchain';
	}
}

// Initialize contract
function initContract() {
	if (!web3 || !contractABI || !contractAddress) {
		console.error("Missing required data to initialize contract", {
			web3: !!web3,
			contractABI: !!contractABI,
			contractAddress: !!contractAddress
		});
		return;
	}

	try {
		jobPortalContract = new web3.eth.Contract(contractABI, contractAddress);
		console.log("Contract initialized:", jobPortalContract);

		// Setup event listeners for forms
		setupEventListeners();
	} catch (error) {
		console.error("Error initializing contract:", error);
		updateConnectionStatus(false, `Error initializing contract: ${error.message}`);
	}
}

// Setup event listeners
function setupEventListeners() {
	// Tab switching
	document.querySelectorAll('.tab').forEach(tab => {
		tab.addEventListener('click', () => {
			const tabId = tab.getAttribute('data-tab');

			// Update active tab
			document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
			tab.classList.add('active');

			// Show active content
			document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
			document.getElementById(tabId).classList.add('active');
		});
	});

	// Form submissions
	document.getElementById('addApplicantForm')?.addEventListener('submit', addApplicant);
	document.getElementById('getApplicantBtn')?.addEventListener('click', getApplicantDetails);
	document.getElementById('listApplicantsBtn')?.addEventListener('click', listAllApplicants);

	document.getElementById('addJobForm')?.addEventListener('submit', addJob);
	document.getElementById('getJobBtn')?.addEventListener('click', getJobDetails);
	document.getElementById('listJobsBtn')?.addEventListener('click', listAllJobs);

	document.getElementById('applyJobForm')?.addEventListener('submit', applyForJob);
	document.getElementById('hireForm')?.addEventListener('submit', hireApplicant);
	document.getElementById('completeJobForm')?.addEventListener('submit', markJobCompleted);
	document.getElementById('rateForm')?.addEventListener('submit', rateApplicant);
	document.getElementById('getApplicantRatingBtn')?.addEventListener('click', getApplicantRating);
}

// Error handler for transactions
async function handleTransaction(transactionPromise, statusElement, successMessage) {
	try {
		statusElement.innerHTML = '<div class="loading">Processing transaction...</div>';
		const result = await transactionPromise;
		console.log("Transaction result:", result);
		statusElement.innerHTML = `
            <div class="status success">
                ${successMessage} Transaction hash: ${result.transactionHash}
            </div>
        `;
		return true;
	} catch (error) {
		console.error("Transaction error:", error);
		let errorMessage = error.message || "Unknown error";

		// Check for specific MetaMask errors
		if (errorMessage.includes("User denied")) {
			errorMessage = "Transaction was rejected in your wallet";
		} else if (errorMessage.includes("insufficient funds")) {
			errorMessage = "Insufficient funds for transaction";
		}

		statusElement.innerHTML = `
            <div class="status error">
                Error: ${errorMessage}
            </div>
        `;
		return false;
	}
}

// Applicant Functions
async function addApplicant(event) {
	event.preventDefault();

	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const statusElement = document.getElementById('addApplicantStatus');

	try {
		const name = document.getElementById('applicantName').value;
		const contactInfo = document.getElementById('contactInfo').value;
		const skillsDescription = document.getElementById('skillsDescription').value;
		const applicantType = parseInt(document.getElementById('applicantType').value);
		const personalDetails = document.getElementById('personalDetails').value;
		const laborHistory = document.getElementById('laborHistory').value;

		const transactionPromise = jobPortalContract.methods.addApplicant(
			name, contactInfo, skillsDescription, applicantType, personalDetails, laborHistory
		).send({ from: accounts[0] });

		const success = await handleTransaction(
			transactionPromise,
			statusElement,
			"Applicant added successfully!"
		);

		if (success) {
			document.getElementById('addApplicantForm').reset();
		}
	} catch (error) {
		console.error("Error adding applicant:", error);
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

async function getApplicantDetails() {
	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const applicantId = document.getElementById('applicantId').value;
	const detailsElement = document.getElementById('applicantDetails');
	const statusElement = document.getElementById('getApplicantStatus');

	if (!applicantId) {
		statusElement.innerHTML = '<div class="status error">Please enter an Applicant ID</div>';
		return;
	}

	statusElement.innerHTML = '<div class="loading">Loading...</div>';

	try {
		const details = await jobPortalContract.methods.getApplicantDetails(applicantId).call();
		const type = await jobPortalContract.methods.getApplicantType(applicantId).call();
		const typeNames = ["Plumber", "Electrician", "Mason", "Carpenter", "Painter", "Other"];

		detailsElement.style.display = 'block';
		detailsElement.innerHTML = `
            <h3>Applicant #${details.id}</h3>
            <p><strong>Name:</strong> ${details.name}</p>
            <p><strong>Contact:</strong> ${details.contactInfo}</p>
            <p><strong>Skills:</strong> ${details.skillsDescription}</p>
            <p><strong>Type:</strong> ${typeNames[type]}</p>
            <p><strong>Available:</strong> ${details.isAvailable ? 'Yes' : 'No'}</p>
            <p><strong>Personal Details:</strong> ${details.personalDetails}</p>
            <p><strong>Labor History:</strong> ${details.laborHistory}</p>
        `;

		statusElement.innerHTML = '';

		// Also get the rating
		try {
			const rating = await jobPortalContract.methods.getApplicantRating(applicantId).call();
			const avgRating = rating.averageRating;
			const totalRatings = rating.totalRatings;

			let ratingHtml = '';
			if (totalRatings > 0) {
				ratingHtml = `
                    <div class="rating">
                        <p><strong>Average Rating:</strong> ${avgRating}/5 (${totalRatings} ratings)</p>
                        <p>${'★'.repeat(avgRating)}${'☆'.repeat(5 - avgRating)}</p>
                    </div>
                `;
			} else {
				ratingHtml = `<p><strong>No ratings yet</strong></p>`;
			}

			detailsElement.innerHTML += ratingHtml;
		} catch (error) {
			console.error("Error getting rating:", error);
		}

	} catch (error) {
		console.error("Error getting applicant details:", error);
		detailsElement.style.display = 'none';
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

async function listAllApplicants() {
	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const listElement = document.getElementById('applicantsList');
	const statusElement = document.getElementById('listApplicantsStatus');

	statusElement.innerHTML = '<div class="loading">Loading applicants...</div>';
	listElement.innerHTML = '';

	try {
		// Get the count of applicants
		const count = await jobPortalContract.methods.getApplicantCount().call();

		// Check if no applicants are present
		if (parseInt(count) === 0) {
			listElement.innerHTML = '<p>No applicants found.</p>';
			statusElement.innerHTML = '';
			return;
		}

		// Loop over the applicant IDs
		for (let i = 1; i <= count; i++) {
			try {
				// Get details of the applicant
				const details = await jobPortalContract.methods.getApplicantDetails(i).call();
				const type = await jobPortalContract.methods.getApplicantType(i).call();
				const typeNames = ["Plumber", "Electrician", "Mason", "Carpenter", "Painter", "Other"];

				// Skip if applicant data is invalid
				if (!details || !details.name || details.name === "") {
					console.warn(`Empty applicant data at ID ${i}`);
					continue;
				}

				const applicantType = typeNames[parseInt(type)] || "Unknown";

				// Create a card for displaying applicant details
				const card = document.createElement('div');
				card.className = 'card';
				card.innerHTML = `
					<h3>Applicant #${i}</h3>
					<p><strong>Name:</strong> ${details.name}</p>
					<p><strong>Type:</strong> ${applicantType}</p>
					<p><strong>Available:</strong> ${details.isAvailable ? 'Yes' : 'No'}</p>
					<button onclick="document.getElementById('applicantId').value='${i}'; document.getElementById('getApplicantBtn').click();">
						View Details
					</button>
				`;

				listElement.appendChild(card);
			} catch (err) {
				console.error(`Error loading applicant ${i}:`, err);
			}
		}

		statusElement.innerHTML = '';
	} catch (err) {
		console.error("Error listing applicants:", err);
		statusElement.innerHTML = `
			<div class="status error">
				Failed to load applicants: ${err.message}
			</div>
		`;
	}
}


// Job Functions
async function addJob(event) {
	event.preventDefault();

	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const statusElement = document.getElementById('addJobStatus');

	try {
		const title = document.getElementById('jobTitle').value;
		const description = document.getElementById('jobDescription').value;
		const salary = document.getElementById('jobSalary').value;
		const requiredType = parseInt(document.getElementById('requiredType').value);

		const transactionPromise = jobPortalContract.methods.addJob(
			title, description, salary, requiredType
		).send({ from: accounts[0] });

		const success = await handleTransaction(
			transactionPromise,
			statusElement,
			"Job added successfully!"
		);

		if (success) {
			document.getElementById('addJobForm').reset();
		}
	} catch (error) {
		console.error("Error adding job:", error);
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

async function getJobDetails() {
	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const jobId = document.getElementById('jobId').value;
	const detailsElement = document.getElementById('jobDetails');
	const statusElement = document.getElementById('getJobStatus');

	if (!jobId) {
		statusElement.innerHTML = '<div class="status error">Please enter a Job ID</div>';
		return;
	}

	statusElement.innerHTML = '<div class="loading">Loading...</div>';

	try {
		const details = await jobPortalContract.methods.getJobDetails(jobId).call();
		const typeNames = ["Plumber", "Electrician", "Mason", "Carpenter", "Painter", "Other"];

		detailsElement.style.display = 'block';
		detailsElement.innerHTML = `
            <h3>Job #${details.id}</h3>
            <p><strong>Title:</strong> ${details.title}</p>
            <p><strong>Description:</strong> ${details.description}</p>
            <p><strong>Salary:</strong> ${web3.utils.fromWei(details.salary, 'ether')} ETH</p>
            <p><strong>Employer:</strong> ${details.employer}</p>
            <p><strong>Status:</strong> ${details.isOpen ? 'Open' : 'Closed'}</p>
            <p><strong>Required Worker Type:</strong> ${typeNames[details.requiredType]}</p>
        `;

		statusElement.innerHTML = '';
	} catch (error) {
		console.error("Error getting job details:", error);
		detailsElement.style.display = 'none';
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

async function listAllJobs() {
	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const listElement = document.getElementById('jobsList');
	const statusElement = document.getElementById('listJobsStatus');

	statusElement.innerHTML = '<div class="loading">Loading...</div>';
	listElement.innerHTML = '';

	try {
		const count = await jobPortalContract.methods.getJobCount().call();

		if (count == 0) {
			listElement.innerHTML = '<p>No jobs found</p>';
			statusElement.innerHTML = '';
			return;
		}

		for (let i = 1; i <= count; i++) {
			try {
				const details = await jobPortalContract.methods.getJobDetails(i).call();
				const typeNames = ["Plumber", "Electrician", "Mason", "Carpenter", "Painter", "Other"];

				const card = document.createElement('div');
				card.className = 'card';
				card.innerHTML = `
                    <h3>Job #${details.id}</h3>
                    <p><strong>Title:</strong> ${details.title}</p>
                    <p><strong>Salary:</strong> ${web3.utils.fromWei(details.salary, 'ether')} ETH</p>
                    <p><strong>Status:</strong> ${details.isOpen ? 'Open' : 'Closed'}</p>
                    <p><strong>Type:</strong> ${typeNames[details.requiredType]}</p>
                    <button onclick="document.getElementById('jobId').value=${details.id}; document.getElementById('getJobBtn').click();">
                        View Details
                    </button>
                `;

				listElement.appendChild(card);
			} catch (error) {
				console.error(`Error getting job ${i}:`, error);
			}
		}

		statusElement.innerHTML = '';
	} catch (error) {
		console.error("Error listing jobs:", error);
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

// Application Functions
async function applyForJob(event) {
	event.preventDefault();

	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const statusElement = document.getElementById('applyJobStatus');

	try {
		const applicantId = document.getElementById('applyApplicantId').value;
		const jobId = document.getElementById('applyJobId').value;

		const transactionPromise = jobPortalContract.methods.applyForJob(applicantId, jobId)
			.send({ from: accounts[0] });

		const success = await handleTransaction(
			transactionPromise,
			statusElement,
			"Applied successfully!"
		);

		if (success) {
			document.getElementById('applyJobForm').reset();
		}
	} catch (error) {
		console.error("Error applying for job:", error);
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

async function hireApplicant(event) {
	event.preventDefault();

	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const statusElement = document.getElementById('hireStatus');

	try {
		const applicantId = document.getElementById('hireApplicantId').value;
		const jobId = document.getElementById('hireJobId').value;

		const transactionPromise = jobPortalContract.methods.hireApplicant(applicantId, jobId)
			.send({ from: accounts[0] });

		const success = await handleTransaction(
			transactionPromise,
			statusElement,
			"Applicant hired successfully!"
		);

		if (success) {
			document.getElementById('hireForm').reset();
		}
	} catch (error) {
		console.error("Error hiring applicant:", error);
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

async function markJobCompleted(event) {
	event.preventDefault();

	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const statusElement = document.getElementById('completeJobStatus');

	try {
		const applicantId = document.getElementById('completeApplicantId').value;
		const jobId = document.getElementById('completeJobId').value;

		const transactionPromise = jobPortalContract.methods.markJobCompleted(applicantId, jobId)
			.send({ from: accounts[0] });

		const success = await handleTransaction(
			transactionPromise,
			statusElement,
			"Job marked as completed successfully!"
		);

		if (success) {
			document.getElementById('completeJobForm').reset();
		}
	} catch (error) {
		console.error("Error marking job as completed:", error);
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

async function rateApplicant(event) {
	event.preventDefault();

	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const statusElement = document.getElementById('rateStatus');

	try {
		const applicantId = document.getElementById('rateApplicantId').value;
		const jobId = document.getElementById('rateJobId').value;
		const score = document.getElementById('rateScore').value;
		const comment = document.getElementById('rateComment').value;

		const transactionPromise = jobPortalContract.methods.rateApplicant(applicantId, jobId, score, comment)
			.send({ from: accounts[0] });

		const success = await handleTransaction(
			transactionPromise,
			statusElement,
			"Rating submitted successfully!"
		);

		if (success) {
			document.getElementById('rateForm').reset();
		}
	} catch (error) {
		console.error("Error rating applicant:", error);
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

async function getApplicantRating() {
	if (!web3 || !jobPortalContract) {
		alert("Web3 connection not established. Please check your wallet connection.");
		return;
	}

	const applicantId = document.getElementById('viewRatingApplicantId').value;
	const ratingElement = document.getElementById('applicantRating');
	const statusElement = document.getElementById('getApplicantRatingStatus');

	if (!applicantId) {
		statusElement.innerHTML = '<div class="status error">Please enter an Applicant ID</div>';
		return;
	}

	statusElement.innerHTML = '<div class="loading">Loading...</div>';

	try {
		const rating = await jobPortalContract.methods.getApplicantRating(applicantId).call();
		const avgRating = rating.averageRating;
		const totalRatings = rating.totalRatings;

		ratingElement.style.display = 'block';

		if (totalRatings > 0) {
			ratingElement.innerHTML = `
                <h3>Applicant #${applicantId} Rating</h3>
                <div class="rating">
                    <p><strong>Average Rating:</strong> ${avgRating}/5</p>
                    <p>${'★'.repeat(avgRating)}${'☆'.repeat(5 - avgRating)}</p>
                    <p><strong>Total Ratings:</strong> ${totalRatings}</p>
                </div>
            `;
		} else {
			ratingElement.innerHTML = `
                <h3>Applicant #${applicantId} Rating</h3>
                <p>This applicant has not been rated yet.</p>
            `;
		}

		statusElement.innerHTML = '';
	} catch (error) {
		console.error("Error getting applicant rating:", error);
		ratingElement.style.display = 'none';
		statusElement.innerHTML = `
            <div class="status error">
                Error: ${error.message}
            </div>
        `;
	}
}

// Connect to Web3 when page loads
window.addEventListener('load', connectWeb3);
// Initialize the app when the page loads
window.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded - Initializing application");
    connectWeb3();
});