// Initialize Web3 and the contract
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const contractABI = [/* ABI array from the compiled contract */];
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Request Letter of Credit function
async function requestLetterOfCredit(event) {
    event.preventDefault();
    document.getElementById("requestStatus").innerHTML = "Processing... Please wait.";

    const accounts = await web3.eth.getAccounts();
    const expiryDate = document.getElementById("expiryDate").value;
    const buyer = document.getElementById("buyer").value;
    const bank = document.getElementById("bank").value;
    const seller = document.getElementById("seller").value;
    const amount = document.getElementById("amount").value;

    try {
        const lcID = await contract.methods.requestLetterOfCredit(
            expiryDate, buyer, bank, seller, amount
        ).send({ from: accounts[0] });
        
        document.getElementById("requestStatus").innerHTML = `Letter of Credit Requested with ID: ${lcID}`;
    } catch (error) {
        document.getElementById("requestStatus").innerHTML = `Error: ${error.message}`;
    }
}

// Issue Letter of Credit function
async function issueLetterOfCredit() {
    document.getElementById("issueStatus").innerHTML = "Processing... Please wait.";

    const lcID = document.getElementById("lcIDToIssue").value;
    const accounts = await web3.eth.getAccounts();

    try {
        await contract.methods.issueLetterOfCredit(lcID).send({ from: accounts[0] });
        document.getElementById("issueStatus").innerHTML = `Letter of Credit ID ${lcID} Issued Successfully.`;
    } catch (error) {
        document.getElementById("issueStatus").innerHTML = `Error: ${error.message}`;
    }
}

// Accept Letter of Credit function
async function acceptLetterOfCredit() {
    document.getElementById("acceptStatus").innerHTML = "Processing... Please wait.";

    const lcID = document.getElementById("lcIDToAccept").value;
    const accounts = await web3.eth.getAccounts();

    try {
        await contract.methods.acceptLetterOfCredit(lcID).send({ from: accounts[0] });
        document.getElementById("acceptStatus").innerHTML = `Letter of Credit ID ${lcID} Accepted Successfully.`;
    } catch (error) {
        document.getElementById("acceptStatus").innerHTML = `Error: ${error.message}`;
    }
}

// View Letter of Credit function
async function viewLetterOfCredit() {
    const lcID = document.getElementById("lcIDToView").value;
    const details = await contract.methods.viewLetterOfCredit(lcID).call();

    document.getElementById("lcDetails").innerHTML = `
        <p><strong>ID:</strong> ${details.id}</p>
        <p><strong>Expiry Date:</strong> ${new Date(details.expiryDate * 1000).toLocaleString()}</p>
        <p><strong>Buyer:</strong> ${details.buyer}</p>
        <p><strong>Seller:</strong> ${details.seller}</p>
        <p><strong>Amount:</strong> ${details.amount}</p>
        <p><strong>Status:</strong> ${details.status}</p>
    `;
}

// Attach form submission to request LC
document.getElementById("requestLCForm").addEventListener("submit", requestLetterOfCredit);
