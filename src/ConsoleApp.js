const readline = require('readline');
const path = require("path");
const { StudentDataReader, TeacherDataReader } = require("./DataLayer");
const { StudentService } = require("./Services");
const { Student, Teacher } = require("./Models");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question) {
    let answer;

    return new Promise((resolve, reject) => {
        rl.question(question, (ans) => {
            resolve(ans);
        })
    });
}


async function Program() {
    const baseFilePath = path.join(__dirname, "../", "JSONData");
    const _studentDataReader = new StudentDataReader(path.join(baseFilePath, "Students.json"));
    const _teacherDataReader = new TeacherDataReader(path.join(baseFilePath, "Teachers.json"));
    const _studentService = new StudentService(_studentDataReader, _teacherDataReader);

    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Students");
        console.log("[2] Teachers");
        console.log("[3] Exit");
        let userInput = await askQuestion("Select an option from above: ");
        switch (userInput) {
            case "1":
                console.log("[1] Add Student");
                console.log("[2] Search Students by name");
                console.log("[3] Search For Student by Student Id");
                console.log("[4] Update Student");
                console.log("[5] Delete Student");
                console.log("[6] Go Back");
                let userInputStudent = await askQuestion("Select an option from above: ");
                switch (userInputStudent) {
                    case "1":
                        let studentFirstName = await askQuestion("Enter Student First Name: ");
                        let studentLastName = await askQuestion("Enter Student Last Name: ");
                        let studentAge = await askQuestion("Enter Student Age: ");
                        let parsedStudentAge = parseInt(studentAge);
                        let grades = await askQuestion("Enter Student Grades (Space-Separated): ");
                        let teacherId = await askQuestion("Enter Teacher's ID: ");
                        let parsedGrades = grades.split(" ").map(num => parseInt(num));
                        let newStudent = new Student(
                            studentFirstName,
                            studentLastName,
                            parsedStudentAge,
                            parsedGrades,
                            teacherId
                        );
                        _studentService.addStudent(newStudent);
                        console.log("Going back to main menu");
                        break;
                    case "2":
                        let searchTerm = await askQuestion("Please enter Studets name: ");
                        let matchingStudents = _studentService.searchByName(searchTerm);
                        console.log(matchingStudents);
                        break;
                    default:
                        console.log("Going back to main menu");
                        break;
                    case "3":
                        let Id = await askQuestion("Please enter the Student unique identification number: ");
                        let matchingStudentsId = _studentService.getStudent(Id);
                        console.log(matchingStudentsId);
                        console.log("Going back to main menu");
                        break;
                    case "4": 
                        let update = await askQuestion("Please enter the Student unique identificaiton number: ");
                        let matchingStudentsId2 = _studentService.getStudent(Id);
                        return matchingStudentsId2 
                        break;
                    
                    case "5":
                        let deleteTerm = await askQuestion("Please enter the Student unique identification number:");
                        let matchingResults = _studentService.deleteStudent(deleteTerm);
                        console.log(matchingResults);
                        console.log("Student has been deleted");
                    case "6":
                        break;
                }
            default:
                console.log("Input has been actioned. Please enter a number from 1 to 3");
        
    }
    }
        switch (userInput) {
            case "2":
                console.log("[1] Add Teacher");
                console.log("[2] Search Teacher");
                console.log("[3] Search For Teacher");
                console.log("[4] Update Teacher");
                console.log("[5] Delete Teacher");
                console.log("[6] Go Back");
                let userInputTeacher = await askQuestion("Select an option from above: ");
                switch (userInputTeacher) {
                    case "1":
                        let teacherFirstName = await askQuestion("Enter Teachers First Name: ");
                        let teacherLastName = await askQuestion("Enter Teachers Last Name: ");
                        let teacherAge = await askQuestion("Enter Teachers Age: ");
                        let parsedTeacherAge = parseInt(teacherAge);
                        let teacherId = await askQuestion("Enter Teacher's ID: ");
                        let newTeacher = new Teacher(
                            teacherFirstName,
                            teacherLastName,
                            parsedTeacherAge,
                            teacherId
                        );
                         _teacherService.addTeacher(newTeacher);
                        break;
                        case "2":
                            let searchTerm = await askQuestion("Please enter Teachers name: ");
                            let matchingStudents = _teacherService.searchByName(searchTerm);
                            console.log(matchingStudents);
                            break;
                        default:
                            console.log("Going back to main menu");
                            break;
                        case "3":
                            let Id = await askQuestion("Please enter the Student unique identification number: ");
                            let matchingStudentsId = _studentService.getStudent(Id);
                            console.log(matchingStudentsId);
                            console.log("Going back to main menu");
                            break;
                        case "4": 
                            let update = await askQuestion("Please enter the Student unique identificaiton number: ");
                            let matchingStudentsId2 = _studentService.getStudent(Id);
                            return matchingStudentsId2 
                            break;
                        
                        case "5":
                            let deleteTerm = await askQuestion("Please enter the Student unique identification number:");
                            let matchingResults = _studentService.deleteStudent(deleteTerm);
                            console.log(matchingResults);
                            console.log("Student has been deleted");
                        case "6":
                            break;
                    }
                default:
                    console.log("Input has been actioned. Please enter a number from 1 to 3");
        }
    }


Program().then(() => {
    process.exit(0);
});