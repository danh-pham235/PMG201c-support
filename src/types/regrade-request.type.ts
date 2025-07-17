export interface RegradeRequest {
  regradeRequestId: string;
  submissionId: string;
  studentId: string;
  requestRound: number;
  status: string;
  requestAt: string;
  updatedBy: string;
  examinerId: string;
  reason: string;
}