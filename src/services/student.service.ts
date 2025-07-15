import axiosInstance from "../config/axiosConfig";
import { API_EXAM, API_GRADE_ROUND, API_REGRADE_REQUEST, API_SUBMISSION } from "../constants/apiConstants";


export const createRegradeRequest = async (data: any) => {
  const response = await axiosInstance.post(API_REGRADE_REQUEST.CREATE, data);
  return response.data; 
};

export const getExamsByStudent = async () => {
  const response = await axiosInstance.get(API_EXAM.STUDENT_EXAMS);
  return response.data;
}

export const getGradeRoundsByStudent = async (examId: string) => {
  const response = await axiosInstance.get(`${API_GRADE_ROUND.GET_ROUNDS_BY_STUDENT}?examId=${examId}`);
  return response.data;
};

export const getGradeByExamId = async (examId: string) => {
  const response = await axiosInstance.get(`${API_SUBMISSION.GET_GRADE_BY_EXAMID}/${examId}`);
  return response.data;
};