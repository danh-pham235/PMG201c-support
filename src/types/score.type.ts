export interface Score {
  score?: number;
  regrade1?: number;
  regrade2?: number;
  status?: "Passed" | "Not Passed";
  note?: string;
  publishedAt?: string;
}