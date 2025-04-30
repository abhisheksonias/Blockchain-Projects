// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRecord {

    // Structs
    struct Patient {
        uint id;
        string name;
        uint age;
        string[] diseases;
    }

    struct Doctor {
        uint id;
        string name;
        string qualification;
        string workPlace;
    }

    struct Medicine {
        uint id;
        string name;
        string expiryDate;
        string dose;
        uint price;
    }

    // Mappings
    mapping(address => Patient) public patients;
    mapping(address => Doctor) public doctors;
    mapping(uint => Medicine) public medicines;

    // State variables
    address public owner;
    uint public patientCount = 0;
    uint public doctorCount = 0;
    uint public medicineCount = 0;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Register a new doctor
    function registerDoctor(
        string memory _name,
        string memory _qualification,
        string memory _workPlace
    ) public {
        doctorCount++;
        doctors[msg.sender] = Doctor(doctorCount, _name, _qualification, _workPlace);
    }

  function registerPatient(
    string memory _name,
    uint _age
) public {
    require(bytes(patients[msg.sender].name).length == 0, "Patient already registered");

    patientCount++;
    patients[msg.sender] = Patient(patientCount, _name, _age, new string[](0));
}

    // Add a disease to the calling patient's record
    function addDisease(string memory _disease) public {
        require(bytes(patients[msg.sender].name).length > 0, "Patient not registered");
        patients[msg.sender].diseases.push(_disease);
    }

    // Only owner can add new medicines
    function addMedicine(
        uint _id,
        string memory _name,
        string memory _expiryDate,
        string memory _dose,
        uint _price
    ) public onlyOwner {
        medicines[_id] = Medicine(_id, _name, _expiryDate, _dose, _price);
        medicineCount++;
    }

    // Doctor prescribes a medicine to a patient (adds it to diseases list)
    function prescribeMedicine(uint _id, address _patient) public {
        require(bytes(doctors[msg.sender].name).length > 0, "Only doctors can prescribe");
        require(bytes(patients[_patient].name).length > 0, "Invalid patient");
        patients[_patient].diseases.push(medicines[_id].name);
    }

    // Update patient's age
    function updateAge(uint _age) public {
        require(bytes(patients[msg.sender].name).length > 0, "Patient not registered");
        patients[msg.sender].age = _age;
    }

    // View patient details
    function viewPatientData(address _patient)
        public
        view
        returns (uint, string memory, uint, string[] memory)
    {
        require(bytes(patients[_patient].name).length > 0, "Invalid patient");
        Patient memory p = patients[_patient];
        return (p.id, p.name, p.age, p.diseases);
    }

    // View doctor details
    function viewDoctorDetails(address _doctor)
        public
        view
        returns (uint, string memory, string memory, string memory)
    {
        require(bytes(doctors[_doctor].name).length > 0, "Invalid doctor");
        Doctor memory d = doctors[_doctor];
        return (d.id, d.name, d.qualification, d.workPlace);
    }
}
