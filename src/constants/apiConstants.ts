export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  UPLOAD_EXAM_PAPER: "/Exam/upload-exam-paper",
  UPLOAD_BAREM: "/Exam/upload-barem", // cần truyền examId phía sau
  AUTO_ASSIGN: "/Exam/assign-lecturers",
};

export const API_REGRADE_REQUEST = {
  CREATE: "/Regrade/create-request",
};