export interface Submission {
  id: string;
  status: "Pending" | "Approved" | "Rejected" | "In Review"
  submittedAt: string;
  assignedTo?: string;
    filePath: string;
  examId: number;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface SubmissionListResponse {
  submissions: Submission[];
  pagination: PaginationData;
}

export interface SubmissionFilters {
  status?: string;
  type?: string;
  priority?: string;
  course?: string;
  searchTerm?: string;
}
