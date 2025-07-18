export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

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
