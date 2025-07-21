import axiosInstance from "../config/axiosConfig";
import { API_DISTRIBUTION, API_SUBMISSION, API_EXAM } from "../constants/apiConstants";


export const getAssignedDistributions = async (examId: string) => {
  const response = await axiosInstance.get(`${API_DISTRIBUTION.ASSIGNED}?examId=${examId}`);
  return response.data;
};

export const getSubmissionDetail = async (submissionId: string) => {
  const response = await axiosInstance.get(`${API_SUBMISSION.GET_SUBMISSION_DETAIL}/${submissionId}`);
  return response.data;
};

export const getBarem = async (examId: string) => {
  const response = await axiosInstance.get(`${API_EXAM.VIEW_BAREM}/${examId}`);
  return response.data;
};

export const aiGrade = async (submissionId: string) => {
  const response = await axiosInstance.get(`${API_SUBMISSION.AI_SCORE}/${submissionId}`);
  return response.data;
}