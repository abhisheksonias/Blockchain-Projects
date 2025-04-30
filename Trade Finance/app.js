let web3;
let letterOfCredit;
let accounts 
 
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
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "LetterAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "bank",
				"type": "address"
			}
		],
		"name": "LetterIssued",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "LetterRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "acceptLetterOfCredit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "issueLetterOfCredit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "letterCount",
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
		"name": "lettersOfCredit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiryDate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "bank",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "status",
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
				"name": "_expiryDate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_buyer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_bank",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "requestLetterOfCredit",
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
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "viewLetterOfCredit",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "expiryDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "bank",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct LetterOfCredit.Letter",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
let contractAddress = "0x80f850a3d69dac634b371b82314be645448d5f21"; // You will need to set this after deployment

// DOM elements
const connectWalletBtn = document.getElementById('connectWallet');
const accountInfoEl = document.getElementById('accountInfo');
const statusIndicator = document.getElementById('statusIndicator');
const connectionStatus = document.getElementById('connectionStatus');
const requestForm = document.getElementById('requestForm');
const viewLetterBtn = document.getElementById('viewLetter');
const issueLetterBtn = document.getElementById('issueLetter');
const acceptLetterBtn = document.getElementById('acceptLetter');
const loadLettersBtn = document.getElementById('loadLetters');

// Event listeners
document.addEventListener('DOMContentLoaded', initApp);
connectWalletBtn.addEventListener('click', connectWallet);
requestForm.addEventListener('submit', handleRequestFormSubmit);
viewLetterBtn.addEventListener('click', viewLetterDetails);
issueLetterBtn.addEventListener('click', issueLetterOfCredit);
acceptLetterBtn.addEventListener('click', acceptLetterOfCredit);
loadLettersBtn.addEventListener('click', loadLetterRegistry);

// Initialize the application
async function initApp() {
    checkConnection();
}

// Check if already connected to MetaMask
async function checkConnection() {
    if (window.ethereum) {
        try {
            // Request account access
            accounts = await window.ethereum.request({ method: 'eth_accounts' });
            
            if (accounts.length > 0) {
                initWeb3();
                updateConnectionStatus(true);
            } else {
                updateConnectionStatus(false);
            }
        } catch (error) {
            console.error("Error checking connection:", error);
            updateConnectionStatus(false);
        }
    } else {
        showNotification("Please install MetaMask to use this DApp", "error");
    }
}

// Connect to MetaMask wallet
async function connectWallet() {
    if (window.ethereum) {
        try {
            // Request account access
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            initWeb3();
            updateConnectionStatus(true);
            showNotification("Connected to wallet", "success");
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            showNotification("Failed to connect wallet", "error");
        }
    } else {
        showNotification("Please install MetaMask to use this DApp", "error");
    }
}

// Initialize Web3 and contract
function initWeb3() {
    web3 = new Web3(window.ethereum);
    
    // Initialize contract
    if (contractAddress) {
        letterOfCredit = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Contract initialized");
    } else {
        console.warn("Contract address not set");
    }
    
    // Listen for account changes
    window.ethereum.on('accountsChanged', (newAccounts) => {
        accounts = newAccounts;
        if (accounts.length > 0) {
            updateConnectionStatus(true);
        } else {
            updateConnectionStatus(false);
        }
    });
    
    // Listen for chain changes
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}

// Update connection status UI
function updateConnectionStatus(isConnected) {
    if (isConnected && accounts.length > 0) {
        statusIndicator.classList.remove('disconnected');
        statusIndicator.classList.add('connected');
        connectionStatus.textContent = 'Connected';
        accountInfoEl.textContent = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
    } else {
        statusIndicator.classList.remove('connected');
        statusIndicator.classList.add('disconnected');
        connectionStatus.textContent = 'Disconnected';
        accountInfoEl.textContent = '';
    }
}

// Handle request form submission
async function handleRequestFormSubmit(event) {
    event.preventDefault();
    
    if (!letterOfCredit) {
        showNotification("Contract not initialized", "error");
        return;
    }
    
    const expiryDate = document.getElementById('expiryDate').value;
    const buyer = document.getElementById('buyer').value;
    const bank = document.getElementById('bank').value;
    const seller = document.getElementById('seller').value;
    const amount = document.getElementById('amount').value;
    
    try {
        await letterOfCredit.methods.requestLetterOfCredit(
            expiryDate, buyer, bank, seller, amount
        ).send({ from: accounts[0] });
        
        showNotification("Letter of Credit requested successfully", "success");
        requestForm.reset();
    } catch (error) {
        console.error("Error requesting letter of credit:", error);
        showNotification("Failed to request letter of credit", "error");
    }
}

// View details of a specific letter of credit
async function viewLetterDetails() {
    if (!letterOfCredit) {
        showNotification("Contract not initialized", "error");
        return;
    }
    
    const letterId = document.getElementById('letterId').value;
    if (!letterId) {
        showNotification("Please enter a Letter ID", "error");
        return;
    }
    
    try {
        const letter = await letterOfCredit.methods.viewLetterOfCredit(letterId).call();
        
        // Populate details
        document.getElementById('detail-id').textContent = letter.id;
        document.getElementById('detail-expiry').textContent = new Date(letter.expiryDate * 1000).toLocaleString();
        document.getElementById('detail-buyer').textContent = letter.buyer;
        document.getElementById('detail-bank').textContent = letter.bank;
        document.getElementById('detail-seller').textContent = letter.seller;
        document.getElementById('detail-amount').textContent = web3.utils.fromWei(letter.amount, 'ether') + ' ETH';
        document.getElementById('detail-status').textContent = letter.status;
        
        // Show letter details section
        document.getElementById('letterDetails').style.display = 'block';
        
        // Enable/disable action buttons based on status and role
        updateActionButtons(letter);
        
    } catch (error) {
        console.error("Error viewing letter details:", error);
        showNotification("Failed to load letter details", "error");
    }
}

// Update action buttons based on letter status and user role
function updateActionButtons(letter) {
    const currentAccount = accounts[0].toLowerCase();
    const isBank = currentAccount === letter.bank.toLowerCase();
    const isSeller = currentAccount === letter.seller.toLowerCase();
    
    // Issue button - only visible to bank when status is "Requested"
    issueLetterBtn.style.display = (isBank && letter.status === "Requested") ? 'inline-block' : 'none';
    
    // Accept button - only visible to seller when status is "Issued"
    acceptLetterBtn.style.display = (isSeller && letter.status === "Issued") ? 'inline-block' : 'none';
}

// Issue a letter of credit (bank action)
async function issueLetterOfCredit() {
    if (!letterOfCredit) {
        showNotification("Contract not initialized", "error");
        return;
    }
    
    const letterId = document.getElementById('letterId').value;
    
    try {
        await letterOfCredit.methods.issueLetterOfCredit(letterId).send({ from: accounts[0] });
        showNotification("Letter of Credit issued successfully", "success");
        viewLetterDetails(); // Refresh details
    } catch (error) {
        console.error("Error issuing letter of credit:", error);
        showNotification("Failed to issue letter of credit", "error");
    }
}

// Accept a letter of credit (seller action)
async function acceptLetterOfCredit() {
    if (!letterOfCredit) {
        showNotification("Contract not initialized", "error");
        return;
    }
    
    const letterId = document.getElementById('letterId').value;
    
    try {
        await letterOfCredit.methods.acceptLetterOfCredit(letterId).send({ from: accounts[0] });
        showNotification("Letter of Credit accepted successfully", "success");
        viewLetterDetails(); // Refresh details
    } catch (error) {
        console.error("Error accepting letter of credit:", error);
        showNotification("Failed to accept letter of credit", "error");
    }
}

// Load all letters of credit
async function loadLetterRegistry() {
    if (!letterOfCredit) {
        showNotification("Contract not initialized", "error");
        return;
    }
    
    try {
        const letterCount = await letterOfCredit.methods.letterCount().call();
        const tableBody = document.getElementById('lettersTableBody');
        tableBody.innerHTML = '';
        
        // If no letters found
        if (letterCount == 0) {
            showNotification("No letters of credit found", "info");
            return;
        }
        
        // Loop through all letters
        for (let i = 1; i <= letterCount; i++) {
            const letter = await letterOfCredit.methods.viewLetterOfCredit(i).call();
            const row = document.createElement('tr');
            
            // Add letter data to row
            row.innerHTML = `
                <td>${letter.id}</td>
                <td>${letter.buyer.substring(0, 8)}...</td>
                <td>${letter.seller.substring(0, 8)}...</td>
                <td>${web3.utils.fromWei(letter.amount, 'ether')} ETH</td>
                <td class="status-${letter.status.toLowerCase()}">${letter.status}</td>
                <td>
                    <button class="view-btn" data-id="${letter.id}">View</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        }
        
        // Show table and add event listeners to view buttons
        document.getElementById('lettersTable').style.display = 'table';
        addViewButtonListeners();
        
    } catch (error) {
        console.error("Error loading letter registry:", error);
        showNotification("Failed to load letter registry", "error");
    }
}

// Add event listeners to view buttons in table
function addViewButtonListeners() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            document.getElementById('letterId').value = id;
            viewLetterDetails();
        });
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    if (type === 'success') {
        notification.style.backgroundColor = '#2ecc71';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else if (type === 'info') {
        notification.style.backgroundColor = '#3498db';
    }
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}