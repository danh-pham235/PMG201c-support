import axiosInstance from "../config/axiosConfig";
import { API_EXAM, API_SUBMISSION } from "../constants/apiConstants";

export interface DepartmentSubmission {
  submissionId: string;
  studentCode: string;
  examId: string;
  examCode: string;
  aiScore: number | null; 
  finalScore: number | null;  
  status: string;
  assignedLecturer: string;
}

export interface DepartmentSubmissionResponse {
  total: number;
  data: DepartmentSubmission[];
}

export async function getDepartmentSubmissions(page: number, pageSize: number) {
  const res = await axiosInstance.get<DepartmentSubmissionResponse>(
    `${API_SUBMISSION.GET_SUBMISSION}?page=${page}&pageSize=${pageSize}`
  );
  return res.data;
}

export async function autoAssignLecturers(examId: string) {
  return axiosInstance.post(`${API_EXAM.AUTO_ASSIGN}/${examId}`);
}

export async function publishScores(examId: string) {
  return axiosInstance.post(`${API_EXAM.PUBLISH_SCORES}/${examId}`);
}