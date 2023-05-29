// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Attendance {
    struct AttendanceData {
        address instructor;
        mapping(uint64 => string) classData;
    }
    mapping(string => AttendanceData) private attendance;
    
    event AttendanceSet(string courseCode, uint64 classIndex, uint64 rollNo, bool attendanceStatus);
    event AttendanceEdited(string courseCode, uint64 classIndex, bool newAttendanceStatus);
    event InstructorSet(string courseCode, address instructor);

    function setAttendance(
        string memory courseCode,
        uint64 classIndex,
        string memory attendanceData
    ) public {
        require(
            attendance[courseCode].instructor == msg.sender,
            "Only the instructor can edit attendance data."
        );

        attendance[courseCode].classData[classIndex-1] = attendanceData;
        emit AttendanceSet(courseCode, classIndex-1, 0, true);
    }

    function getAttendanceData(
        string memory courseCode,
        uint64 classIndex,
        uint64 rollNo
    ) public view returns (bool) {
        string memory attendanceData = attendance[courseCode].classData[
            classIndex-1
        ];
        require(
            rollNo > 0 && rollNo <= bytes(attendanceData).length,
            "Invalid roll number"
        );

        bytes memory attendanceBytes = bytes(attendanceData);
        uint8 attendanceChar = uint8(attendanceBytes[rollNo - 1]);

        return attendanceChar == 49;
    }

    function editAttendance(
        string memory courseCode,
        uint64 classIndex,
        string memory attendanceData
    ) public {
        require(
            attendance[courseCode].instructor == msg.sender,
            "Only the instructor can edit attendance data."
        );

        attendance[courseCode].classData[classIndex-1] = attendanceData;
        emit AttendanceEdited(courseCode, classIndex-1, true);
    }

    function setInstructor(string memory courseCode) public {
        require(
            attendance[courseCode].instructor == address(0),
            "Instructor has already been set."
        );
        attendance[courseCode].instructor = msg.sender;
        emit InstructorSet(courseCode, msg.sender);
    }

    function getInstructor(string memory courseCode)
        public
        view
        returns (address)
    {
        return attendance[courseCode].instructor;
    }
}