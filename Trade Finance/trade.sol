// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LetterOfCredit {
    struct Letter {
        uint id;
        uint expiryDate;
        address buyer;
        address bank;
        address seller;
        uint amount;
        string status; // "Requested", "Issued", "Accepted"
    }

    mapping(uint => Letter) public lettersOfCredit;
    uint public letterCount;

    event LetterRequested(uint indexed id, address indexed buyer, address indexed seller, uint amount);
    event LetterIssued(uint indexed id, address indexed bank);
    event LetterAccepted(uint indexed id, address indexed seller);

    modifier onlyBuyer(uint id) {
        require(msg.sender == lettersOfCredit[id].buyer, "Only the buyer can perform this action");
        _;
    }

    modifier onlyBank(uint id) {
        require(msg.sender == lettersOfCredit[id].bank, "Only the bank can perform this action");
        _;
    }

    modifier onlySeller(uint id) {
        require(msg.sender == lettersOfCredit[id].seller, "Only the seller can perform this action");
        _;
    }

    constructor() {
        letterCount = 0;
    }

    // Request a letter of credit
    function requestLetterOfCredit(uint _expiryDate, address _buyer, address _bank, address _seller, uint _amount) public returns (uint) {
        require(_buyer != address(0), "Invalid buyer address");
        require(_bank != address(0), "Invalid bank address");
        require(_seller != address(0), "Invalid seller address");
        
        // Increment the letter count and create a new Letter
        letterCount++;
        lettersOfCredit[letterCount] = Letter({
            id: letterCount,
            expiryDate: _expiryDate,
            buyer: _buyer,
            bank: _bank,
            seller: _seller,
            amount: _amount,
            status: "Requested"
        });

        emit LetterRequested(letterCount, _buyer, _seller, _amount);
        return letterCount;
    }

    // Issue the letter of credit (by the bank)
    function issueLetterOfCredit(uint _id) public onlyBank(_id) {
        require(keccak256(bytes(lettersOfCredit[_id].status)) == keccak256(bytes("Requested")), "Letter of Credit is not in 'Requested' state");
        lettersOfCredit[_id].status = "Issued";
        emit LetterIssued(_id, msg.sender);
    }

    // Accept the letter of credit (by the seller)
    function acceptLetterOfCredit(uint _id) public onlySeller(_id) {
        require(keccak256(bytes(lettersOfCredit[_id].status)) == keccak256(bytes("Issued")), "Letter of Credit is not in 'Issued' state");
        lettersOfCredit[_id].status = "Accepted";
        emit LetterAccepted(_id, msg.sender);
    }

    // View the details of a letter of credit
    function viewLetterOfCredit(uint _id) public view returns (Letter memory) {
        return lettersOfCredit[_id];
    }
}
