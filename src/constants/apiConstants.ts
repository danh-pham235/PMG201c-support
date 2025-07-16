export const API_BASE_URL = "https://localhost:7165/api";

export const API_USER = {
  GOOGLE_LOGIN: "/User/google-login",
  LOGOUT: "/User/logout",
  IMPORT_USERS: "/User/import-users",
};

export const API_SUBMISSION = {
  UPLOAD: "/Submission/upload-submission",
  GET_SUBMISSION: "/Submission/submission-table",
  GET_GRADE_BY_EXAMID: "/Submission/get-grades",
};

export const API_EXAM = {
  EXAM_EXAMINER: "/Exam/exams-examiner",
  UPLOAD_EXAM_PAPER: "/Exam/upload-exam-paper",
  UPLOAD_BAREM: "/Exam/upload-barem", // cần truyền examId phía sau
  AUTO_ASSIGN: "/Exam/assign-lecturers",
  STUDENT_EXAMS: "/Exam/student-exams",
};

export const API_REGRADE_REQUEST = {
  CREATE: "/Regrade/create-request",
  GET_BY_STUDENT_ID: "/Regrade/view-request",
};

export const API_GRADE_ROUND = {
  GET_ROUNDS_BY_STUDENT: "/GradeRound/student",
}