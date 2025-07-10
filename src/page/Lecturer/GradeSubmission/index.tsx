import React, { useEffect, useState } from "react";

// Mock data
const mockSubmission = {
  id: 1,
  filePath: "/mock/student.txt",
  examId: 101,
};

const mockExam = {
  id: 101,
  filePath: "/mock/answer.txt",
};

const mockStudentText = "Đây là bài làm của sinh viên...";
const mockAnswerText = "Đây là đáp án chuẩn của đề...";
const mockAIScore = 8.5;

interface Submission {
  id: number;
  filePath: string;
  examId: number;
}

interface Exam {
  id: number;
  filePath: string;
}

const GradeSubmissionPage: React.FC = () => {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [studentText, setStudentText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // Giả sử lấy submissionId từ URL hoặc props
  const submissionId = 1;

  useEffect(() => {
    // Mock lấy thông tin submission và exam
    new Promise<{ data: Submission }>((resolve) =>
      setTimeout(() => resolve({ data: mockSubmission }), 300)
    ).then((res) => {
      setSubmission(res.data);
      new Promise<{ data: Exam }>((resolve) =>
        setTimeout(() => resolve({ data: mockExam }), 300)
      ).then((examRes) => {
        setExam(examRes.data);
      });
    });
  }, [submissionId]);

  useEffect(() => {
    // Mock đọc file bài làm sinh viên
    if (submission?.filePath) {
      new Promise<{ data: string }>((resolve) =>
        setTimeout(() => resolve({ data: mockStudentText }), 300)
      ).then((res) => setStudentText(res.data));
    }
    // Mock đọc file đáp án
    if (exam?.filePath) {
      new Promise<{ data: string }>((resolve) =>
        setTimeout(() => resolve({ data: mockAnswerText }), 300)
      ).then((res) => setAnswerText(res.data));
    }
  }, [submission, exam]);

  const handleAICheck = async () => {
    setLoading(true);
    // Mock gọi API grading AI
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAiScore(mockAIScore);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert("Chấm điểm thành công!");
  };

  return (
    <div style={{ padding: 32, maxWidth: 1600, width: "100%", margin: "0 auto" }}>

<form
  onSubmit={handleSubmit}
  style={{
    display: "flex",
    alignItems: "flex-start",
    gap: 24,
    maxWidth: 1200,
    margin: "0 auto 32px auto",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px #0002",
    padding: 32,
    minHeight: 220,
  }}
>
  <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, minWidth: 180, height: 140 }}>
    <div>
      <label style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>AI Score:</label>
      <input
        type="number"
        value={aiScore ?? ""}
        readOnly
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ddd",
          fontSize: 16,
          background: "#f5f7fa",
          marginBottom: 0,
        }}
      />
    </div>
    <div>
      <label style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>Final Score:</label>
      <input
        type="number"
        value={finalScore ?? ""}
        onChange={(e) => setFinalScore(Number(e.target.value))}
        required
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ddd",
          fontSize: 16,
          background: "#f5f7fa",
          marginBottom: 0,
        }}
      />
    </div>
  </div>
  <div style={{ flex: 2, minWidth: 220, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
    <label style={{ fontWeight: 600, marginBottom: 6, display: "block" }}>Note:</label>
    <textarea
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder="Enter your note here..."
      style={{
        width: "100%",
        padding: 10,
        borderRadius: 8,
        border: "1px solid #ddd",
        fontSize: 16,
        background: "#f5f7fa",
        height: 140,
        resize: "vertical",
      }}
    />
  </div>
  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 12,
    justifyContent: "flex-end",
    minWidth: 140,
    height: 140,
  }}>
    <button
      type="button"
      onClick={handleAICheck}
      disabled={loading}
      style={{
        padding: "12px 0",
        borderRadius: 8,
        border: "none",
        background: "linear-gradient(90deg, #7f53ac 0%, #647dee 100%)",
        color: "#fff",
        fontWeight: 600,
        fontSize: 16,
        boxShadow: "0 4px 16px #7f53ac44",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "background 0.2s, box-shadow 0.2s",
        marginBottom: 4,
        letterSpacing: 1,
        textShadow: "0 1px 8px #7f53ac33",
      }}
    >
      {loading ? "AI Grading..." : "AI Grading"}
    </button>
    <button
      type="submit"
      style={{
        padding: "12px 0",
        borderRadius: 8,
        border: "none",
        background: "#43a047",
        color: "#fff",
        fontWeight: 600,
        fontSize: 16,
        cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      Submit
    </button>
  </div>
</form>

<div
  style={{
    display: "flex",
    gap: 32,
    justifyContent: "center",
    alignItems: "flex-start",
  }}
>
  <div
    style={{
      flex: 1,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px #0001",
      padding: 24,
      minWidth: 300,
    }}
  >
    <div style={{
      fontWeight: 700,
      fontSize: 22,
      marginBottom: 18,
      borderLeft: "4px solid #647dee",
      paddingLeft: 12,
      letterSpacing: 0.5,
      color: "#2d2d72"
    }}>
      Student Submission
    </div>
    <textarea
      value={studentText}
      readOnly
      rows={18}
      style={{
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: 12,
        background: "#f9f9f9",
        fontFamily: "inherit",
      }}
    />
  </div>
  <div
    style={{
      flex: 1,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px #0001",
      padding: 24,
      minWidth: 300,
    }}
  >
    <div style={{
      fontWeight: 700,
      fontSize: 22,
      marginBottom: 18,
      borderLeft: "4px solid #7f53ac",
      paddingLeft: 12,
      letterSpacing: 0.5,
      color: "#4b2479"
    }}>
      Answer Key
    </div>
    <textarea
      value={answerText}
      readOnly
      rows={18}
      style={{
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: 12,
        background: "#f9f9f9",
        fontFamily: "inherit",
      }}
    />
  </div>
</div>

    </div>
  );
};

export default GradeSubmissionPage;