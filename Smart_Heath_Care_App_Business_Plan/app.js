let web3;
let contract;
const contractAddress = "0xDA0bab807633f07f013f94DD0E6A4F96F8742B53";
const abi = [/* Paste ABI JSON here */];

window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: 'eth_requestAccounts' });
    contract = new web3.eth.Contract(abi, contractAddress);
  } else {
    alert("Please install MetaMask.");
  }
});

async function bookAppointment() {
  const doctorAddress = document.getElementById("doctorAddress").value;
  const paymentAmount = web3.utils.toWei(document.getElementById("paymentAmount").value, 'ether');
  const accounts = await web3.eth.getAccounts();

  document.getElementById("bookStatus").innerText = "Booking appointment, please wait...";

  contract.methods.bookAppointment(doctorAddress).send({ from: accounts[0], value: paymentAmount })
    .on('transactionHash', (hash) => {
      document.getElementById("bookStatus").innerText = "Appointment booked! Transaction Hash: " + hash;
    })
    .on('error', (error) => {
      document.getElementById("bookStatus").innerText = "Error: " + error.message;
    });
}

async function makePayment() {
  const appointmentId = document.getElementById("appointmentId").value;
  const paymentAmount = web3.utils.toWei(document.getElementById("paymentAmount2").value, 'ether');
  const accounts = await web3.eth.getAccounts();

  document.getElementById("paymentStatus").innerText = "Processing payment...";

  contract.methods.makePayment(appointmentId).send({ from: accounts[0], value: paymentAmount })
    .on('transactionHash', (hash) => {
      document.getElementById("paymentStatus").innerText = "Payment successful! Transaction Hash: " + hash;
    })
    .on('error', (error) => {
      document.getElementById("paymentStatus").innerText = "Error: " + error.message;
    });
}

async function getAppointmentDetails() {
  const appointmentId = document.getElementById("appointmentIdDetails").value;
  const details = await contract.methods.getAppointmentDetails(appointmentId).call();
  const patient = details[0];
  const doctor = details[1];
  const timestamp = new Date(details[2] * 1000).toLocaleString();
  const isPaid = details[3] ? "Yes" : "No";

  const appointmentInfoDiv = document.getElementById("appointmentInfo");
  appointmentInfoDiv.innerHTML = `
    <p><strong>Patient:</strong> ${patient}</p>
    <p><strong>Doctor:</strong> ${doctor}</p>
    <p><strong>Timestamp:</strong> ${timestamp}</p>
    <p><strong>Paid:</strong> ${isPaid}</p>
  `;
}