import type { Score } from "../types/score.type";

export async function getStudentScore(): Promise<Score> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        final: 7.5,
        regrade1: 8.0,
        regrade2: 7.0,
        status: "Passed",
        publishedAt: "2025-06-20",
      });
    }, 500);
  });
}
