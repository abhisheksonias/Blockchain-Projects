// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Healthcare Appointment Booking Contract
/// @author 
/// @notice Allows patients to book appointments with doctors and make payments
contract HealthcareApp {
    address public owner;
    uint public appointmentIdCounter;

    struct Appointment {
        uint appointmentId;
        address patient;
        address doctor;
        uint timestamp;
        bool isPaid;
    }

    // Mapping from appointment ID to appointment details
    mapping(uint => Appointment) public appointments;

    // Mapping from patient address to a list of their appointment IDs
    mapping(address => uint[]) public patientAppointments;

    event AppointmentBooked(
        uint appointmentId,
        address indexed patient,
        address indexed doctor,
        uint timestamp
    );

    event PaymentMade(
        uint appointmentId,
        address indexed patient,
        address indexed doctor,
        uint amount
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can execute this.");
        _;
    }

    modifier onlyPatient(uint appointmentId) {
        require(
            msg.sender == appointments[appointmentId].patient,
            "Only the patient can perform this action."
        );
        _;
    }

    modifier onlyDoctor(uint appointmentId) {
        require(
            msg.sender == appointments[appointmentId].doctor,
            "Only the doctor can perform this action."
        );
        _;
    }

    modifier appointmentExists(uint appointmentId) {
        require(
            appointments[appointmentId].appointmentId != 0,
            "Appointment does not exist."
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        appointmentIdCounter = 1; // Start appointment IDs from 1
    }

    /// @notice Book a new appointment with a doctor
    /// @param doctor The address of the doctor
    function bookAppointment(address doctor) external payable {
        require(msg.value > 0, "Payment is required to book an appointment.");

        uint appointmentId = appointmentIdCounter;

        appointments[appointmentId] = Appointment({
            appointmentId: appointmentId,
            patient: msg.sender,
            doctor: doctor,
            timestamp: block.timestamp,
            isPaid: true
        });

        patientAppointments[msg.sender].push(appointmentId);
        appointmentIdCounter++;

        emit AppointmentBooked(appointmentId, msg.sender, doctor, block.timestamp);
    }

    /// @notice Make payment for an existing appointment
    /// @param appointmentId The ID of the appointment to pay for
    function makePayment(uint appointmentId)
        external
        payable
        onlyPatient(appointmentId)
        appointmentExists(appointmentId)
    {
        Appointment storage app = appointments[appointmentId];
        require(!app.isPaid, "Payment already made.");

        app.isPaid = true;
        payable(app.doctor).transfer(msg.value);

        emit PaymentMade(appointmentId, msg.sender, app.doctor, msg.value);
    }

    /// @notice Get details of a specific appointment
    /// @param appointmentId The ID of the appointment
    /// @return patient, doctor, timestamp, isPaid
    function getAppointmentDetails(uint appointmentId)
        external
        view
        returns (
            address patient,
            address doctor,
            uint timestamp,
            bool isPaid
        )
    {
        Appointment memory app = appointments[appointmentId];
        return (app.patient, app.doctor, app.timestamp, app.isPaid);
    }

    /// @notice Get all appointment IDs for a given patient
    /// @param patient The address of the patient
    /// @return An array of appointment IDs
    function getPatientAppointments(address patient)
        external
        view
        returns (uint[] memory)
    {
        return patientAppointments[patient];
    }
}
