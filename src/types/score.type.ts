export interface Score {
  final: number;
  regrade1?: number;
  regrade2?: number;
  status: "Passed" | "Failed";
  publishedAt: string;
}