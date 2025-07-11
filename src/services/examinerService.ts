import axiosInstance from "../config/axiosConfig";
import { API_SUBMISSION, API_EXAM } from "../constants/apiConstants";

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

export const getAssignmentsExaminer = async () => {
  const response = await axiosInstance.get(API_EXAM.EXAM_EXAMINER);
  return response.data;
};