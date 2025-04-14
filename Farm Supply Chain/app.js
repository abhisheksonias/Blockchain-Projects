const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
  // Add your ABI JSON here (shortened version of the ABI)
  {
    "inputs": [
      { "internalType": "uint256", "name": "_productId", "type": "uint256" }
    ],
    "name": "getProductDetails",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "productId", "type": "uint256" },
          { "internalType": "string", "name": "productDescription", "type": "string" },
          { "internalType": "string", "name": "producerName", "type": "string" },
          { "internalType": "string", "name": "producerAddress", "type": "string" },
          { "internalType": "string", "name": "harvestDate", "type": "string" },
          { "internalType": "string", "name": "distributorName", "type": "string" },
          { "internalType": "string", "name": "distributorAddress", "type": "string" },
          { "internalType": "string", "name": "prodToDistDate", "type": "string" },
          { "internalType": "string", "name": "retailerName", "type": "string" },
          { "internalType": "string", "name": "retailerAddress", "type": "string" },
          { "internalType": "string", "name": "distToRetaDate", "type": "string" }
        ],
        "internalType": "struct FarmSupplyChain.FarmProduct",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // Add other functions like addNewProduct, transferToDistributor, transferToRetailer
];

let contract;
let accounts;

window.addEventListener("load", async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    accounts = await web3.eth.getAccounts();
    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Please install MetaMask!");
  }
});

async function addNewProduct() {
  const id = document.getElementById("productId").value;
  const desc = document.getElementById("productDescription").value;
  const name = document.getElementById("producerName").value;
  const addr = document.getElementById("producerAddress").value;
  const date = document.getElementById("harvestDate").value;

  await contract.methods.addNewProduct(id, desc, name, addr, date).send({ from: accounts[0] });
  alert("Product added!");
}

async function transferToDistributor() {
  const id = document.getElementById("distProductId").value;
  const name = document.getElementById("distributorName").value;
  const addr = document.getElementById("distributorAddress").value;
  const date = document.getElementById("prodToDistDate").value;

  await contract.methods.transferToDistributor(id, name, addr, date).send({ from: accounts[0] });
  alert("Transferred to distributor!");
}

async function transferToRetailer() {
  const id = document.getElementById("retaProductId").value;
  const name = document.getElementById("retailerName").value;
  const addr = document.getElementById("retailerAddress").value;
  const date = document.getElementById("distToRetaDate").value;

  await contract.methods.transferToRetailer(id, name, addr, date).send({ from: accounts[0] });
  alert("Transferred to retailer!");
}

async function getProductDetails() {
  const id = document.getElementById("searchProductId").value;
  const product = await contract.methods.getProductDetails(id).call();
  document.getElementById("productDetails").innerText = JSON.stringify(product, null, 2);
}
