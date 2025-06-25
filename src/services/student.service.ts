export async function getStudentScore(): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          type: "Original Score",
          score: 7.5,
          date: "2025-06-22T23:30:00Z",
          note: "Bài làm tốt, trình bày rõ ràng."
        },
        {
          type: "Regrade 1",
          score: 8.0,
          date: "2025-06-23T23:30:00Z",
          note: "Đã cải thiện phần trình bày."
        }
      ]);
    }, 200);
  });
}
