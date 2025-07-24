import axiosInstance from "../config/axiosConfig";
import { API_SUBMISSION, API_EXAM, API_REGRADE_REQUEST } from "../constants/apiConstants";

export const uploadSubmission = async (examId: string, file: File) => {
  const formData = new FormData();
  formData.append("DTOFile", file);

  const response = await axiosInstance.post(
    `${API_SUBMISSION.UPLOAD}/${examId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const getAllExam = async () => {
  const response = await axiosInstance.get(API_EXAM.EXAMS);
  return response.data;
};

export const getSubmissionTable = async (page = 1, pageSize = 10) => {
  const response = await axiosInstance.get(`${API_SUBMISSION.GET_SUBMISSION}?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const uploadExamPaper = async (formData: FormData) => {
  const response = await axiosInstance.post(API_EXAM.UPLOAD_EXAM_PAPER, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const uploadBarem = async (examId: string, file: File) => {
  const formData = new FormData();
  formData.append("DTOFile", file);
  const response = await axiosInstance.post(`${API_EXAM.UPLOAD_BAREM}/${examId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getAllRegradeRequests = async (page = 1, pageSize = 10) => {
  const response = await axiosInstance.get(`${API_REGRADE_REQUEST.GET_ALL_REQUESTS}?page=${page}&pageSize=${pageSize}`);
  return response.data;
}

export const updateRegradeRequestStatus = async (regradeRequestId: string, status: string) => {
  const response = await axiosInstance.post(`${API_REGRADE_REQUEST.UPDATE_STATUS}`, { regradeRequestId, status });
  return response.data;
};