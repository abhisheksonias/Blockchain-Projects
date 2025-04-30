const contractAddress = "0x8768d0ebba03a4b0be434044377bf76baee41b22";
    const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "producerName",
				"type": "string"
			}
		],
		"name": "ProductAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "distributorName",
				"type": "string"
			}
		],
		"name": "TransferredToDistributor",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "retailerName",
				"type": "string"
			}
		],
		"name": "TransferredToRetailer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_productDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_producerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_producerAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_harvestDate",
				"type": "string"
			}
		],
		"name": "addNewProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_distributorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_distributorAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_prodToDistDate",
				"type": "string"
			}
		],
		"name": "transferToDistributor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_retailerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_retailerAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_distToRetaDate",
				"type": "string"
			}
		],
		"name": "transferToRetailer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productId",
				"type": "uint256"
			}
		],
		"name": "getProductDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "productId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "productDescription",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "producerName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "producerAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "harvestDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "distributorName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "distributorAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "prodToDistDate",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "retailerName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "retailerAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "distToRetaDate",
						"type": "string"
					}
				],
				"internalType": "struct FarmSupplyChain.FarmProduct",
				"name": "",
				"type": "tuple"
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
		"name": "products",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "productId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "productDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "producerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "producerAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "harvestDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "distributorName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "distributorAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prodToDistDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "retailerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "retailerAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "distToRetaDate",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let contract;
let accounts;
let web3;

// DOM elements
const walletStatus = document.getElementById('walletStatus');
const addProductForm = document.getElementById('addProductForm');
const distributorForm = document.getElementById('distributorForm');
const retailerForm = document.getElementById('retailerForm');
const trackForm = document.getElementById('trackForm');
const productDetails = document.getElementById('productDetails');
const productTimeline = document.getElementById('productTimeline');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');
const qrOverlay = document.getElementById('qrOverlay');
const closeModal = document.getElementById('closeModal');
const qrCode = document.getElementById('qrCode');

// Status messages
const addStatus = document.getElementById('addStatus');
const distStatus = document.getElementById('distStatus');
const retailStatus = document.getElementById('retailStatus');
const trackStatus = document.getElementById('trackStatus');

// Connect to Web3
async function connectWeb3() {
  if (window.ethereum) {
    try {
      web3 = new Web3(window.ethereum);
      accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      contract = new web3.eth.Contract(contractABI, contractAddress);
      
      // Update wallet status
      walletStatus.classList.remove('disconnected');
      walletStatus.innerHTML = `<i class="fas fa-wallet"></i><span>${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}</span>`;
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload();
      });
      
      return true;
    } catch (error) {
      console.error("User denied account access");
      return false;
    }
  } else {
    console.error("No ethereum browser detected");
    return false;
  }
}

// Connect wallet on click
walletStatus.addEventListener('click', async () => {
  await connectWeb3();
});

// Handle tab switching
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.getAttribute('data-tab');
    
    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Show the selected tab content
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

// Add new product
addProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!contract || !accounts) {
    const connected = await connectWeb3();
    if (!connected) {
      showStatus(addStatus, 'error', 'Please connect your wallet first');
      return;
    }
  }
  
  const id = document.getElementById("productId").value;
  const desc = document.getElementById("productDescription").value;
  const name = document.getElementById("producerName").value;
  const addr = document.getElementById("producerAddress").value;
  const date = document.getElementById("harvestDate").value;
  
  try {
    showStatus(addStatus, 'loading', 'Adding product to blockchain...');
    
    await contract.methods.addNewProduct(id, desc, name, addr, date)
      .send({ from: accounts[0] });
    
    showStatus(addStatus, 'success', 'Product added successfully!');
    addProductForm.reset();
    
    // Generate QR code for product
    generateQRCode(id);
  } catch (error) {
    console.error(error);
    showStatus(addStatus, 'error', `Error: ${getErrorMessage(error)}`);
  }
});

// Transfer to distributor
distributorForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!contract || !accounts) {
    const connected = await connectWeb3();
    if (!connected) {
      showStatus(distStatus, 'error', 'Please connect your wallet first');
      return;
    }
  }
  
  const id = document.getElementById("distProductId").value;
  const name = document.getElementById("distributorName").value;
  const addr = document.getElementById("distributorAddress").value;
  const date = document.getElementById("prodToDistDate").value;
  
  try {
    showStatus(distStatus, 'loading', 'Transferring to distributor...');
    
    await contract.methods.transferToDistributor(id, name, addr, date)
      .send({ from: accounts[0] });
    
    showStatus(distStatus, 'success', 'Transferred to distributor successfully!');
    distributorForm.reset();
  } catch (error) {
    console.error(error);
    showStatus(distStatus, 'error', `Error: ${getErrorMessage(error)}`);
  }
});

// Transfer to retailer
retailerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!contract || !accounts) {
    const connected = await connectWeb3();
    if (!connected) {
      showStatus(retailStatus, 'error', 'Please connect your wallet first');
      return;
    }
  }
  
  const id = document.getElementById("retaProductId").value;
  const name = document.getElementById("retailerName").value;
  const addr = document.getElementById("retailerAddress").value;
  const date = document.getElementById("distToRetaDate").value;
  
  try {
    showStatus(retailStatus, 'loading', 'Transferring to retailer...');
    
    await contract.methods.transferToRetailer(id, name, addr, date)
      .send({ from: accounts[0] });
    
    showStatus(retailStatus, 'success', 'Transferred to retailer successfully!');
    retailerForm.reset();
  } catch (error) {
    console.error(error);
    showStatus(retailStatus, 'error', `Error: ${getErrorMessage(error)}`);
  }
});

// Track product
trackForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!contract) {
    const connected = await connectWeb3();
    if (!connected) {
      showStatus(trackStatus, 'error', 'Please connect your wallet first');
      return;
    }
  }
  
  const id = document.getElementById("searchProductId").value;
  
  try {
    showStatus(trackStatus, 'loading', 'Fetching product details...');
    
    const product = await contract.methods.getProductDetails(id).call();
    
    // Display product details in JSON format
    productDetails.style.display = 'block';
    productDetails.innerText = JSON.stringify(product, null, 2);
    
    // Update timeline
    updateProductTimeline(product);
    
    showStatus(trackStatus, 'success', 'Product details retrieved!');
  } catch (error) {
    console.error(error);
    showStatus(trackStatus, 'error', `Error: ${getErrorMessage(error)}`);
    productDetails.style.display = 'none';
  }
});

// Format date string
function formatDate(dateString) {
  if (!dateString) return 'Not available';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    return dateString;
  }
}

// Update product timeline
function updateProductTimeline(product) {
  // Producer step
  const timelineSteps = productTimeline.querySelectorAll('.timeline-step');
  
  // Step 1: Producer
  if (product.producerName) {
    timelineSteps[0].classList.remove('timeline-empty');
    timelineSteps[0].querySelector('.timeline-content').innerHTML = `
      <div class="timeline-title">${product.producerName}</div>
      <div class="timeline-info">
        <strong>Product:</strong> ${product.productDescription}<br>
        <strong>Location:</strong> ${product.producerAddress}<br>
        <strong>Harvest Date:</strong> ${formatDate(product.harvestDate)}
      </div>
    `;
  } else {
    timelineSteps[0].classList.add('timeline-empty');
    timelineSteps[0].querySelector('.timeline-content').innerHTML = `
      <div class="timeline-title">Producer</div>
      <div class="timeline-info">No data available</div>
    `;
  }
  
  // Step 2: Distributor
  if (product.distributorName) {
    timelineSteps[1].classList.remove('timeline-empty');
    timelineSteps[1].querySelector('.timeline-content').innerHTML = `
      <div class="timeline-title">${product.distributorName}</div>
      <div class="timeline-info">
        <strong>Location:</strong> ${product.distributorAddress}<br>
        <strong>Transfer Date:</strong> ${formatDate(product.prodToDistDate)}
      </div>
    `;
  } else {
    timelineSteps[1].classList.add('timeline-empty');
    timelineSteps[1].querySelector('.timeline-content').innerHTML = `
      <div class="timeline-title">Distributor</div>
      <div class="timeline-info">Not yet transferred to distributor</div>
    `;
  }
  
  // Step 3: Retailer
  if (product.retailerName) {
    timelineSteps[2].classList.remove('timeline-empty');
    timelineSteps[2].querySelector('.timeline-content').innerHTML = `
      <div class="timeline-title">${product.retailerName}</div>
      <div class="timeline-info">
        <strong>Location:</strong> ${product.retailerAddress}<br>
        <strong>Transfer Date:</strong> ${formatDate(product.distToRetaDate)}
      </div>
    `;
  } else {
    timelineSteps[2].classList.add('timeline-empty');
    timelineSteps[2].querySelector('.timeline-content').innerHTML = `
      <div class="timeline-title">Retailer</div>
      <div class="timeline-info">Not yet transferred to retailer</div>
    `;
  }
}

// Show status message
function showStatus(element, type, message) {
  element.className = 'transaction-status';
  element.classList.add(type);
  
  if (type === 'loading') {
    element.innerHTML = `<i class="fas fa-circle-notch spinner"></i> ${message}`;
  } else if (type === 'success') {
    element.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  } else if (type === 'error') {
    element.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
  }
  
  // Hide success and error messages after a delay
  if (type !== 'loading') {
    setTimeout(() => {
      element.classList.remove(type);
    }, 5000);
  }
}

// Extract user-friendly error message
function getErrorMessage(error) {
  if (error.message && error.message.includes('User denied transaction')) {
    return 'Transaction was rejected';
  }
  
  if (error.message && error.message.includes('execution reverted:')) {
    const match = error.message.match(/execution reverted: (.*?)(?:$|")/);
    return match ? match[1] : 'Transaction failed';
  }
  
  return 'Transaction failed';
}

// Generate QR Code
function generateQRCode(productId) {
  qrCode.innerHTML = '';
  
  new QRCode(qrCode, {
    text: `${window.location.origin}?track=${productId}`,
    width: 200,
    height: 200,
    colorDark: "#2e7d32",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  
  qrOverlay.classList.add('active');
}

// Close modal
closeModal.addEventListener('click', () => {
  qrOverlay.classList.remove('active');
});

// Handle QR code sharing via URL parameters
window.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const trackParam = urlParams.get('track');
  
  if (trackParam) {
    // Switch to track tab
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector('[data-tab="track"]').classList.add('active');
    
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById('track-tab').classList.add('active');
    
    // Set product ID and trigger search
    document.getElementById('searchProductId').value = trackParam;
    
    // Wait a bit for Web3 to initialize
    setTimeout(async () => {
      await connectWeb3();
      trackForm.dispatchEvent(new Event('submit'));
    }, 1000);
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Try to connect to Web3 on page load
  await connectWeb3();
});