import { FaBookOpen, FaCheckCircle } from "react-icons/fa";
import type React from "react";
import { useEffect, useState } from "react";
import type { Score } from "../../types/score.type";
import { getStudentScore } from "../../services/student.service";
import ScoreCard from "../../components/StudentComponent/Score/ScoreCardComponent";

const StudentPage: React.FC = () => {
  const [score, setScore] = useState<Score | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    getStudentScore()
      .then((data) => {
        setScore(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch score");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center py-10">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl justify-center items-start">
        {/* Subject Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 w-full md:w-[420px] flex flex-col items-start">
          <div className="flex items-center gap-3 mb-2">
            <FaBookOpen className="text-blue-600 text-3xl" />
            <h2 className="text-2xl font-bold text-gray-800">
              PMG201c – Software Project Management
            </h2>
          </div>
          <div className="mt-2 text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Status:</span>
              <span className="font-semibold text-green-600 flex items-center gap-1">
                <FaCheckCircle /> Score Published
              </span>
            </div>
            <div>
              <span className="font-semibold">Published At:</span>{" "}
              {score?.publishedAt ?? "..."}
            </div>
          </div>
          <button
            onClick={() => setShowScore(!showScore)}
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-2 rounded-lg shadow"
          >
            {showScore ? "Ẩn điểm" : "Xem điểm"}
          </button>
        </div>

        {/* Result Card */}
        {loading ? (
          <div className="text-gray-500 mt-4">Đang tải điểm...</div>
        ) : error ? (
          <div className="text-red-500 mt-4">{error}</div>
        ) : (
          showScore &&
          score && (
            <div className="w-full md:w-[350px]">
              <ScoreCard score={score} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentPage;