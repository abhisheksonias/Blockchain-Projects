// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobPortal {
    address public admin;
    
    enum ApplicantType { Plumber, Electrician, Mason, Carpenter, Painter, Other }
    
    struct Applicant {
        uint id;
        string name;
        string contactInfo;
        string skillsDescription;
        bool isAvailable;
        ApplicantType applicantType;
        bool exists;
        string personalDetails;
        string laborHistory;
    }
    
    struct Job {
        uint id;
        string title;
        string description;
        uint salary;
        address employer;
        bool isOpen;
        ApplicantType requiredType;
    }
    
    struct Application {
        uint applicantId;
        uint jobId;
        bool hired;
        bool completed;
    }
    
    struct Rating {
        uint applicantId;
        uint jobId;
        uint8 score; // 1-5 score
        string comment;
    }
    
    uint private nextApplicantId = 1;
    uint private nextJobId = 1;
    
    mapping(uint => Applicant) public applicants;
    mapping(uint => Job) public jobs;
    mapping(uint => mapping(uint => bool)) public applications; // applicantId => jobId => applied
    mapping(uint => mapping(uint => Rating)) public ratings; // applicantId => jobId => rating
    mapping(uint => uint) public applicantTotalRatings; // applicantId => total score
    mapping(uint => uint) public applicantRatingCount; // applicantId => count of ratings
    
    event ApplicantAdded(uint id, string name, ApplicantType applicantType);
    event JobAdded(uint id, string title, uint salary);
    event JobApplied(uint applicantId, uint jobId);
    event RatingProvided(uint applicantId, uint jobId, uint8 score);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier onlyEmployer(uint jobId) {
        require(jobs[jobId].employer == msg.sender, "Only job employer can perform this action");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }
    
    // 1. Add a new applicant
    function addApplicant(
        string memory _name,
        string memory _contactInfo,
        string memory _skillsDescription,
        ApplicantType _applicantType,
        string memory _personalDetails,
        string memory _laborHistory
    ) public onlyAdmin returns (uint) {
        uint applicantId = nextApplicantId++;
        
        applicants[applicantId] = Applicant({
            id: applicantId,
            name: _name,
            contactInfo: _contactInfo,
            skillsDescription: _skillsDescription,
            isAvailable: true,
            applicantType: _applicantType,
            exists: true,
            personalDetails: _personalDetails,
            laborHistory: _laborHistory
        });
        
        emit ApplicantAdded(applicantId, _name, _applicantType);
        return applicantId;
    }
    
    // 2. Get applicant details
    function getApplicantDetails(uint _applicantId) public view returns (
        uint id,
        string memory name,
        string memory contactInfo,
        string memory skillsDescription,
        bool isAvailable,
        string memory personalDetails,
        string memory laborHistory
    ) {
        require(applicants[_applicantId].exists, "Applicant does not exist");
        Applicant memory applicant = applicants[_applicantId];
        
        return (
            applicant.id,
            applicant.name,
            applicant.contactInfo,
            applicant.skillsDescription,
            applicant.isAvailable,
            applicant.personalDetails,
            applicant.laborHistory
        );
    }
    
    // 3. Get applicant type
    function getApplicantType(uint _applicantId) public view returns (ApplicantType) {
        require(applicants[_applicantId].exists, "Applicant does not exist");
        return applicants[_applicantId].applicantType;
    }
    
    // 4. Add a new Job to the portal
    function addJob(
        string memory _title,
        string memory _description,
        uint _salary,
        ApplicantType _requiredType
    ) public returns (uint) {
        uint jobId = nextJobId++;
        
        jobs[jobId] = Job({
            id: jobId,
            title: _title,
            description: _description,
            salary: _salary,
            employer: msg.sender,
            isOpen: true,
            requiredType: _requiredType
        });
        
        emit JobAdded(jobId, _title, _salary);
        return jobId;
    }
    
    // 5. Get job details
    function getJobDetails(uint _jobId) public view returns (
        uint id,
        string memory title,
        string memory description,
        uint salary,
        address employer,
        bool isOpen,
        ApplicantType requiredType
    ) {
        require(_jobId < nextJobId, "Job does not exist");
        Job memory job = jobs[_jobId];
        
        return (
            job.id,
            job.title,
            job.description,
            job.salary,
            job.employer,
            job.isOpen,
            job.requiredType
        );
    }
    
    // 6. Applicants apply for a job
    function applyForJob(uint _applicantId, uint _jobId) public {
        require(applicants[_applicantId].exists, "Applicant does not exist");
        require(_jobId < nextJobId, "Job does not exist");
        require(jobs[_jobId].isOpen, "Job is not open");
        require(!applications[_applicantId][_jobId], "Already applied for this job");
        require(applicants[_applicantId].applicantType == jobs[_jobId].requiredType || 
                jobs[_jobId].requiredType == ApplicantType.Other, 
                "Applicant type does not match the job requirement");
        
        applications[_applicantId][_jobId] = true;
        
        emit JobApplied(_applicantId, _jobId);
    }
    
    // Helper function: Hire an applicant
    function hireApplicant(uint _applicantId, uint _jobId) public onlyEmployer(_jobId) {
        require(applicants[_applicantId].exists, "Applicant does not exist");
        require(applications[_applicantId][_jobId], "Applicant did not apply for this job");
        require(jobs[_jobId].isOpen, "Job is not open");
        
        // Mark job as closed when hiring
        jobs[_jobId].isOpen = false;
        
        // Update applicant availability status
        applicants[_applicantId].isAvailable = false;
    }
    
    // Helper function: Mark job as completed
    function markJobCompleted(uint _applicantId, uint _jobId) public onlyEmployer(_jobId) {
        require(applicants[_applicantId].exists, "Applicant does not exist");
        require(!jobs[_jobId].isOpen, "Job is still open, not hired yet");
        
        // Update applicant availability status back to available
        applicants[_applicantId].isAvailable = true;
    }
    
    // 7. Provide a rating to an applicant
    function rateApplicant(uint _applicantId, uint _jobId, uint8 _score, string memory _comment) public onlyEmployer(_jobId) {
        require(applicants[_applicantId].exists, "Applicant does not exist");
        require(_score >= 1 && _score <= 5, "Rating must be between 1 and 5");
        require(!jobs[_jobId].isOpen, "Job is still open, can't rate yet");
        
        // Create the rating
        ratings[_applicantId][_jobId] = Rating({
            applicantId: _applicantId,
            jobId: _jobId,
            score: _score,
            comment: _comment
        });
        
        // Update the overall rating
        applicantTotalRatings[_applicantId] += _score;
        applicantRatingCount[_applicantId] += 1;
        
        emit RatingProvided(_applicantId, _jobId, _score);
    }
    
    // 8. Fetch applicant rating
    function getApplicantRating(uint _applicantId) public view returns (uint8 averageRating, uint totalRatings) {
        require(applicants[_applicantId].exists, "Applicant does not exist");
        
        if (applicantRatingCount[_applicantId] == 0) {
            return (0, 0);
        }
        
        uint average = applicantTotalRatings[_applicantId] * 10 / applicantRatingCount[_applicantId];
        return (uint8(average / 10), applicantRatingCount[_applicantId]);
    }
    
    // Additional helper function to get job rating details
    function getJobRatingDetails(uint _applicantId, uint _jobId) public view returns (uint8 score, string memory comment) {
        Rating memory rating = ratings[_applicantId][_jobId];
        return (rating.score, rating.comment);
    }
    
    // Function to get all available jobs
    function getJobCount() public view returns (uint) {
        return nextJobId - 1;
    }
    
    // Function to get all applicants count
    function getApplicantCount() public view returns (uint) {
        return nextApplicantId - 1;
    }
}