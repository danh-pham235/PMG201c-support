import type { Score } from "../types/score.type";

export async function getStudentScore(): Promise<Score> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        score: 7.5,
        regrade1: 8.0,
        // regrade2: 8.0,
        status: "Passed",
        publishedAt: "11:30 PM 22-06-2025",
      });
    }, 200);
  });
}
