import axiosInstance from "../config/axiosConfig";

export interface DepartmentSubmission {
  submissionId: string;
  studentCode: string;
  examId: string;
  examCode: string;
  status: string;
  assignedLecturer: string;
}

export interface DepartmentSubmissionResponse {
  total: number;
  data: DepartmentSubmission[];
}

export async function getDepartmentSubmissions(page: number, pageSize: number) {
  const res = await axiosInstance.get<DepartmentSubmissionResponse>(
    `/Submission/submission-table?page=${page}&pageSize=${pageSize}`
  );
  return res.data;
}

export async function autoAssignLecturers(examId: string) {
  return axiosInstance.post(`/Exam/assign-lecturers/${examId}`);
}