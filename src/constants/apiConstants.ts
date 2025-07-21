export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_USER = {
  GOOGLE_LOGIN: "/User/google-login",
  LOGOUT: "/User/logout",
  IMPORT_USERS: "/User/import-users",
  GET_USERS: "/User/get-users",
  UPDATE_USER: "/User/update-user", // cần truyền userId phía sau
};

export const API_SUBMISSION = {
  UPLOAD: "/Submission/upload-submission",
  GET_SUBMISSION: "/Submission/submission-table",
  GET_GRADE_BY_EXAMID: "/Submission/get-grades",
  GET_SUBMISSION_DETAIL: "/Submission/submission-detail",
  AI_SCORE: "/Submission/AI-Score",
};

export const API_EXAM = {
  EXAM_EXAMINER: "/Exam/exams-examiner",
  UPLOAD_EXAM_PAPER: "/Exam/upload-exam-paper",
  UPLOAD_BAREM: "/Exam/upload-barem", 
  VIEW_BAREM: "/Exam/view-barem",
  AUTO_ASSIGN: "/Exam/assign-lecturers",
  STUDENT_EXAMS: "/Exam/student-exams",
  PUBLISH_SCORES: "/Exam/publish-scores",
};

export const API_REGRADE_REQUEST = {
  CREATE: "/Regrade/create-request",
  GET_BY_STUDENT_ID: "/Regrade/view-request",
  GET_ALL_REQUESTS: "/Regrade/get-all",
  UPDATE_STATUS: "/Regrade/confirm-request",
};

export const API_GRADE_ROUND = {
  GET_ROUNDS_BY_STUDENT: "/GradeRound/student",
  GET_ROUND_BY_SUBMISSIONID: "/GradeRound/submission",
}

export const API_DISTRIBUTION = {
  ASSIGNED: "/Distribution/assigned",
};
  
