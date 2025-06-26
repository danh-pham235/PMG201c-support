import React, { useEffect, useState } from "react";
import { getStudentScore } from "../../services/student.service";
import ScoreCircle from "../../components/StudentComponent/ScoreCircle";
import ScoreDetails from "../../components/StudentComponent/ScoreDetail";
import ScoreTable from "../../components/StudentComponent/ScoreTable";

const StudentPage: React.FC = () => {
  const [scoreRows, setScoreRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStudentScore()
      .then((data) => {
        setScoreRows(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching score:", err);
        setError("Failed to fetch score");
        setLoading(false);
      });
  }, []);

  const finalScore = scoreRows.length
    ? scoreRows[scoreRows.length - 1].score
    : 0;
  const isPassed = finalScore >= 4;

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Card chính bên trái */}
      <div className="w-full md:w-[50%] flex justify-start ml-5">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row items-center gap-10 w-full">
          <ScoreCircle finalScore={finalScore} isPassed={isPassed} />
          <ScoreDetails
            score={scoreRows[scoreRows.length - 1]}
            finalScore={finalScore}
            loading={loading}
            error={error}
          />
        </div>
      </div>
      {/* Bảng điểm bên phải */}
      <div className="w-full md:w-[50%] flex mt-6 md:mt-0">
        <ScoreTable scoreRows={scoreRows} />
      </div>
    </div>
  );
};

export default StudentPage;
