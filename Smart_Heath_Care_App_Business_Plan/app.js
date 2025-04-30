window.contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "appointmentId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "AppointmentBooked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "appointmentId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "PaymentMade",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			}
		],
		"name": "bookAppointment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "appointmentId",
				"type": "uint256"
			}
		],
		"name": "makePayment",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "appointmentIdCounter",
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
		"name": "appointments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "appointmentId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isPaid",
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
				"name": "appointmentId",
				"type": "uint256"
			}
		],
		"name": "getAppointmentDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "doctor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isPaid",
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
				"name": "patient",
				"type": "address"
			}
		],
		"name": "getPatientAppointments",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "patientAppointments",
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

document.addEventListener('DOMContentLoaded', function() {
    // Application State
    const appState = {
        web3: null,
        contract: null,
        accounts: [],
        contractAddress: '0x83b3c8289dbf5736bd8e25a9a5fe6447a6f0aed3', // Replace with your deployed contract address
        

    };

    // DOM Elements
    const elements = {
        connectWalletBtn: document.getElementById('connect-wallet'),
        walletAddress: document.getElementById('wallet-address'),
        contractAddressElem: document.getElementById('contract-address'),
        
        // Booking section
        doctorAddressInput: document.getElementById('doctor-address'),
        appointmentPaymentInput: document.getElementById('appointment-payment'),
        bookBtn: document.getElementById('book-btn'),
        bookingStatus: document.getElementById('booking-status'),
        
        // Appointments section
        appointmentsList: document.getElementById('appointments-list'),
        refreshAppointmentsBtn: document.getElementById('refresh-appointments'),
        
        // Details section
        appointmentIdInput: document.getElementById('appointment-id'),
        fetchDetailsBtn: document.getElementById('fetch-details-btn'),
        appointmentInfo: document.getElementById('appointment-info'),
        detailPatient: document.getElementById('detail-patient'),
        detailDoctor: document.getElementById('detail-doctor'),
        detailTimestamp: document.getElementById('detail-timestamp'),
        detailPaid: document.getElementById('detail-paid'),
        paymentSection: document.getElementById('payment-section'),
        paymentAmountInput: document.getElementById('payment-amount'),
        makePaymentBtn: document.getElementById('make-payment-btn'),
        detailStatus: document.getElementById('detail-status'),
        
        // Transactions section
        transactionsList: document.getElementById('transactions-list')
    };

    // Initialize the application
    async function init() {
        // Set contract address in the UI
        elements.contractAddressElem.textContent = truncateAddress(appState.contractAddress);
        
        // Setup event listeners
        setupEventListeners();
        
        // Check if Web3 is already injected
        if (window.ethereum) {
            try {
                // Request account access
                await connectWallet();
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            showStatus(elements.bookingStatus, "Please install MetaMask to use this DApp", "error");
        }
    }

    // Setup all event listeners
    function setupEventListeners() {
        elements.connectWalletBtn.addEventListener('click', connectWallet);
        elements.bookBtn.addEventListener('click', bookAppointment);
        elements.refreshAppointmentsBtn.addEventListener('click', loadPatientAppointments);
        elements.fetchDetailsBtn.addEventListener('click', fetchAppointmentDetails);
        elements.makePaymentBtn.addEventListener('click', makePayment);
        
        // Add event listeners for real-time updates when using MetaMask
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
        }
    }

    // Connect to MetaMask wallet
    async function connectWallet() {
        try {
            if (window.ethereum) {
                appState.web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                handleAccountsChanged(accounts);
                initContract();
                return true;
            } else {
                showStatus(elements.bookingStatus, "Please install MetaMask to use this DApp", "error");
                return false;
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            showStatus(elements.bookingStatus, "Failed to connect wallet", "error");
            return false;
        }
    }

    // Handle account changes in MetaMask
    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            elements.walletAddress.textContent = "Not connected";
            elements.connectWalletBtn.textContent = "Connect Wallet";
            appState.accounts = [];
        } else {
            appState.accounts = accounts;
            elements.walletAddress.textContent = truncateAddress(accounts[0]);
            elements.connectWalletBtn.textContent = "Connected";
            
            // Load patient's appointments
            loadPatientAppointments();
        }
    }

    // Initialize contract
    function initContract() {
        try {
            // Note: ABI will be defined externally
            appState.contract = new appState.web3.eth.Contract(
                window.contractABI, 
                appState.contractAddress
            );
            
            // Set up event listeners for contract events
            setupContractEventListeners();
        } catch (error) {
            console.error("Error initializing contract:", error);
        }
    }

    // Setup contract event listeners
    function setupContractEventListeners() {
        if (!appState.contract) return;
        
        // Listen for AppointmentBooked events
        appState.contract.events.AppointmentBooked({})
            .on('data', (event) => {
                const eventData = event.returnValues;
                if (eventData.patient.toLowerCase() === appState.accounts[0].toLowerCase()) {
                    addTransaction('Appointment Booked', `Appointment ID: ${eventData.appointmentId} with Doctor: ${truncateAddress(eventData.doctor)}`);
                    loadPatientAppointments();
                }
            })
            .on('error', console.error);
        
        // Listen for PaymentMade events
        appState.contract.events.PaymentMade({})
            .on('data', (event) => {
                const eventData = event.returnValues;
                if (eventData.patient.toLowerCase() === appState.accounts[0].toLowerCase()) {
                    addTransaction('Payment Made', `Paid ${appState.web3.utils.fromWei(eventData.amount, 'ether')} ETH for Appointment ID: ${eventData.appointmentId}`);
                }
            })
            .on('error', console.error);
    }

    // Book an appointment
    async function bookAppointment() {
        if (!isConnected()) return;
        
        const doctorAddress = elements.doctorAddressInput.value;
        const payment = elements.appointmentPaymentInput.value;
        
        if (!appState.web3.utils.isAddress(doctorAddress)) {
            showStatus(elements.bookingStatus, "Please enter a valid doctor address", "error");
            return;
        }
        
        if (parseFloat(payment) <= 0) {
            showStatus(elements.bookingStatus, "Payment amount must be greater than 0", "error");
            return;
        }
        
        try {
            showStatus(elements.bookingStatus, "Processing... Please confirm in MetaMask", "info");
            
            await appState.contract.methods.bookAppointment(doctorAddress).send({
                from: appState.accounts[0],
                value: appState.web3.utils.toWei(payment, 'ether')
            });
            
            showStatus(elements.bookingStatus, "Appointment booked successfully!", "success");
            elements.doctorAddressInput.value = '';
            loadPatientAppointments();
        } catch (error) {
            console.error("Error booking appointment:", error);
            showStatus(elements.bookingStatus, "Failed to book appointment: " + getErrorMessage(error), "error");
        }
    }

    // Load patient's appointments
    async function loadPatientAppointments() {
        if (!isConnected()) return;
        
        try {
            // Clear the current list
            elements.appointmentsList.innerHTML = '';
            
            // Show loading message
            elements.appointmentsList.innerHTML = '<p class="no-data">Loading appointments...</p>';
            
            // Get appointment IDs for the current patient
            const appointmentIds = await appState.contract.methods.getPatientAppointments(appState.accounts[0]).call();
            
            if (appointmentIds.length === 0) {
                elements.appointmentsList.innerHTML = '<p class="no-data">No appointments found.</p>';
                return;
            }
            
            elements.appointmentsList.innerHTML = '';
            
            // Get details for each appointment
            for (let id of appointmentIds) {
                const details = await appState.contract.methods.getAppointmentDetails(id).call();
                
                const appointmentDate = new Date(details.timestamp * 1000);
                const formattedDate = appointmentDate.toLocaleString();
                
                const appointmentItem = document.createElement('div');
                appointmentItem.className = 'appointment-item';
                appointmentItem.innerHTML = `
                    <div class="appointment-id">Appointment #${id}</div>
                    <div class="appointment-doctor">
                        <strong>Doctor:</strong> ${truncateAddress(details.doctor)}
                    </div>
                    <div class="appointment-time">
                        <strong>Date:</strong> ${formattedDate}
                    </div>
                    <div>
                        <strong>Status:</strong> ${details.isPaid ? 'Paid' : 'Payment Required'}
                    </div>
                `;
                
                // Add click event to view details
                appointmentItem.addEventListener('click', () => {
                    elements.appointmentIdInput.value = id;
                    fetchAppointmentDetails();
                });
                
                elements.appointmentsList.appendChild(appointmentItem);
            }
        } catch (error) {
            console.error("Error loading appointments:", error);
            elements.appointmentsList.innerHTML = '<p class="no-data error">Error loading appointments. Please try again.</p>';
        }
    }

    // Fetch appointment details
    async function fetchAppointmentDetails() {
        if (!isConnected()) return;
        
        const appointmentId = elements.appointmentIdInput.value;
        
        if (!appointmentId || appointmentId <= 0) {
            showStatus(elements.detailStatus, "Please enter a valid appointment ID", "error");
            return;
        }
        
        try {
            showStatus(elements.detailStatus, "Fetching details...", "info");
            
            const details = await appState.contract.methods.getAppointmentDetails(appointmentId).call();
            
            // Check if appointment exists
            if (details.patient === '0x0000000000000000000000000000000000000000') {
                showStatus(elements.detailStatus, "Appointment not found", "error");
                elements.appointmentInfo.classList.add('hidden');
                return;
            }
            
            // Update UI with appointment details
            elements.detailPatient.textContent = truncateAddress(details.patient);
            elements.detailDoctor.textContent = truncateAddress(details.doctor);
            
            const appointmentDate = new Date(details.timestamp * 1000);
            elements.detailTimestamp.textContent = appointmentDate.toLocaleString();
            
            elements.detailPaid.textContent = details.isPaid ? 'Paid' : 'Not Paid';
            elements.detailPaid.className = details.isPaid ? 'success' : 'error';
            
            // Show/hide payment section based on payment status
            if (!details.isPaid && details.patient.toLowerCase() === appState.accounts[0].toLowerCase()) {
                elements.paymentSection.classList.remove('hidden');
            } else {
                elements.paymentSection.classList.add('hidden');
            }
            
            // Show appointment info
            elements.appointmentInfo.classList.remove('hidden');
            showStatus(elements.detailStatus, "Details fetched successfully", "success");
        } catch (error) {
            console.error("Error fetching appointment details:", error);
            showStatus(elements.detailStatus, "Error fetching details: " + getErrorMessage(error), "error");
            elements.appointmentInfo.classList.add('hidden');
        }
    }

    // Make payment for an appointment
    async function makePayment() {
        if (!isConnected()) return;
        
        const appointmentId = elements.appointmentIdInput.value;
        const payment = elements.paymentAmountInput.value;
        
        if (!appointmentId || appointmentId <= 0) {
            showStatus(elements.detailStatus, "Please enter a valid appointment ID", "error");
            return;
        }
        
        if (parseFloat(payment) <= 0) {
            showStatus(elements.detailStatus, "Payment amount must be greater than 0", "error");
            return;
        }
        
        try {
            showStatus(elements.detailStatus, "Processing payment... Please confirm in MetaMask", "info");
            
            await appState.contract.methods.makePayment(appointmentId).send({
                from: appState.accounts[0],
                value: appState.web3.utils.toWei(payment, 'ether')
            });
            
            showStatus(elements.detailStatus, "Payment made successfully!", "success");
            fetchAppointmentDetails();
            loadPatientAppointments();
        } catch (error) {
            console.error("Error making payment:", error);
            showStatus(elements.detailStatus, "Failed to make payment: " + getErrorMessage(error), "error");
        }
    }

    // Add transaction to the transaction history
    function addTransaction(type, description) {
        const transaction = document.createElement('div');
        transaction.className = 'transaction-item';
        
        const timestamp = new Date().toLocaleString();
        
        transaction.innerHTML = `
            <div><strong>${type}</strong> - ${timestamp}</div>
            <div>${description}</div>
        `;
        
        // Remove "no transactions" message if it exists
        const noDataMsg = elements.transactionsList.querySelector('.no-data');
        if (noDataMsg) {
            elements.transactionsList.removeChild(noDataMsg);
        }
        
        // Add new transaction at the top
        elements.transactionsList.insertBefore(transaction, elements.transactionsList.firstChild);
    }

    // Helper function to check if wallet is connected
    function isConnected() {
        if (!appState.web3 || !appState.contract || appState.accounts.length === 0) {
            showStatus(elements.bookingStatus, "Please connect your wallet first", "error");
            return false;
        }
        return true;
    }

    // Helper function to truncate Ethereum addresses
    function truncateAddress(address) {
        if (!address) return '';
        return address.substring(0, 6) + '...' + address.substring(address.length - 4);
    }

    // Helper function to show status messages
    function showStatus(element, message, type = 'info') {
        element.textContent = message;
        element.className = 'status-message ' + type;
        
        // Clear status after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                element.textContent = '';
                element.className = 'status-message';
            }, 5000);
        }
    }

    // Helper function to extract error message from Web3 errors
    function getErrorMessage(error) {
        if (error.message) {
            // Try to extract the revert reason if exists
            const revertReason = error.message.match(/reason string: '(.*)'/);
            if (revertReason && revertReason[1]) {
                return revertReason[1];
            }
            return error.message.split('\n')[0];
        }
        return 'Unknown error';
    }

    // Start the application
    init();
});