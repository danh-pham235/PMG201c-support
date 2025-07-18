import axiosInstance from "../config/axiosConfig";
import { API_EXAM, API_GRADE_ROUND, API_SUBMISSION } from "../constants/apiConstants";
import type { GradeRound } from "../types/grade-round.type";
import type { DepartmentSubmissionResponse } from "../types/submission.type";


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

export async function getGradeRoundsBySubmissionId(submissionId: string) {
  return axiosInstance.get<GradeRound[]>(
    `${API_GRADE_ROUND.GET_ROUND_BY_SUBMISSIONID}/${submissionId}`
  ).then(res => res.data);
}