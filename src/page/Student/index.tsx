import React, { useEffect, useState } from "react";
import type { Score } from "../../types/score.type";
import { getStudentScore } from "../../services/student.service";
import Sidebar from "../../components/StudentComponent/Sidebar";
import ScoreCircle from "../../components/StudentComponent/ScoreCircle";
import ScoreDetails from "../../components/StudentComponent/ScoreDetail";

const StudentPage: React.FC = () => {
  const [score, setScore] = useState<Score | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  useEffect(() => {
    getStudentScore()
      .then((data) => {
        setScore(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching score:", err);
        setError("Failed to fetch score");
        setLoading(false);
      });
  }, []);

  const finalScore =
    typeof score?.regrade2 === "number"
      ? score.regrade2
      : typeof score?.regrade1 === "number"
      ? score.regrade1
      : typeof score?.score === "number"
      ? score.score
      : 0;

  const isPassed = finalScore >= 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10">
      <div className="max-w-7xl mx-auto flex gap-4 items-start mt-12">
        <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <div className="flex-1 flex justify-start">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center gap-10 w-full max-w-3xl">
            <ScoreCircle finalScore={finalScore} isPassed={isPassed} />
            <ScoreDetails score={score} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;