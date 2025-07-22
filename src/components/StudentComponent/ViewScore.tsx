import React, { useEffect, useState } from "react";
import {
  getExamsByStudent,
  getGradeRoundsByStudent,
  getGradeByExamId,
} from "../../services/student.service";
import ScoreCircle from "../../components/StudentComponent/ScoreCircle";
import ScoreDetails from "../../components/StudentComponent/ScoreDetail";
import ScoreTable from "../../components/StudentComponent/ScoreTable";
import { FaListAlt } from "react-icons/fa";

const ViewScore: React.FC = () => {
  const [exams, setExams] = useState<any[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [gradeRounds, setGradeRounds] = useState<any[]>([]);
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getExamsByStudent().then((data) => {
      setExams(data);
      if (data.length > 0) setSelectedExamId(data[0].examId);
    });
  }, []);

  useEffect(() => {
    if (!selectedExamId) {
      setGradeRounds([]);
      setSubmission(null);
      return;
    }
    setLoading(true);
    Promise.all([
      getGradeRoundsByStudent(selectedExamId),
      getGradeByExamId(selectedExamId),
    ])
      .then(([rounds, submissionData]) => {
        setGradeRounds(rounds);
        setSubmission(submissionData);
        setError(null);
      })
      .catch(() => setError("No scoring data found."))
      .finally(() => setLoading(false));
  }, [selectedExamId]);

  const finalScore = submission?.finalScore ?? 0;
  const isPassed = finalScore >= 4;
  const scoreDetailData = submission
    ? {
        score: submission.finalScore,
        publishedAt: submission.publishedAt,
        status: submission.status,
      }
    : null;

  const scoreRows = gradeRounds.map((round: any) => ({
    type:
      round.roundNumber === 1
        ? "Original"
        : round.roundNumber === 2
        ? "Regrade 1"
        : "Regrade 2",
    date: round.gradeAt ? new Date(round.gradeAt).toLocaleString() : "--",
    score: round.score ?? "--",
    note: round.note ?? "",
  }));

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-start mt-8 mb-6 ml-5">
        <div className="flex items-center gap-3 bg-white shadow-lg rounded-xl px-6 py-4">
          <FaListAlt className="text-blue-600 text-2xl" />
          <label htmlFor="exam-select" className="mr-2 font-semibold text-lg">
            Exam:
          </label>
          <select
            id="exam-select"
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="border border-blue-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            {exams.map((exam) => (
              <option key={exam.examId} value={exam.examId}>
                {exam.semester}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-[50%] flex justify-start ml-5">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row items-center gap-10 w-full">
            <ScoreCircle finalScore={finalScore} isPassed={isPassed} />
            <ScoreDetails
              score={scoreDetailData}
              finalScore={finalScore}
              loading={loading}
              error={error}
            />
          </div>
        </div>
        <div className="w-full md:w-[50%] flex mt-6 md:mt-0">
          <ScoreTable scoreRows={scoreRows} />
        </div>
      </div>
    </div>
  );
};

export default ViewScore;