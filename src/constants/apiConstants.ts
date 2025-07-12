export const API_BASE_URL = "https://localhost:7165/api";

export const API_USER = {
  GOOGLE_LOGIN: "/User/google-login",
  LOGOUT: "/User/logout",
  IMPORT_USERS: "/User/import-users",
};

export const API_SUBMISSION = {
  UPLOAD: "/Submission/upload-submission",
  SUBMISSION_TABLE: "/Submission/submission-table",
};

export const API_EXAM = {
  EXAM_EXAMINER: "/Exam/exams-examiner",
  UPLOAD_EXAM_PAPER: "/Exam/upload-exam-paper",
  UPLOAD_BAREM: "/Exam/upload-barem", // cần truyền examId phía sau
};