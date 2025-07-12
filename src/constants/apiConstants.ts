export const API_BASE_URL = "https://localhost:7165/api";

export const API_USER = {
  GOOGLE_LOGIN: "/User/google-login",
  LOGOUT: "/User/logout",
  IMPORT_USERS: "/User/import-users",
};

export const API_SUBMISSION = {
  UPLOAD: "/Submission/upload-submission",
  GET_SUBMISSION: "/Submission/submission-table",
};

export const API_EXAM = {
  EXAM_EXAMINER: "/Exam/exams-examiner",
  AUTO_ASSIGN: "/Exam/assign-lecturers",
};

export const API_REGRADE_REQUEST = {
  CREATE: "/Regrade/create-request",
};