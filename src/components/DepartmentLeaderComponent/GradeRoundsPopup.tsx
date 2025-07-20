import React, { useEffect, useState } from "react";
import { getGradeRoundsBySubmissionId } from "../../services/department-leader.service";
import { useLoadingStore } from "../../config/zustand";
import type { GradeRound } from "../../types/grade-round.type";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

interface Props {
  submissionId: string;
  onClose: () => void;
}

const statusMap: Record<
  string,
  {
    label: string;
    bg: string;
    text: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  Created: {
    label: "Created",
    bg: "bg-gray-100",
    text: "text-gray-700",
    Icon: FaCalendarAlt,
  },
  Scheduled: {
    label: "Scheduled",
    bg: "bg-blue-100",
    text: "text-blue-700",
    Icon: FaHourglassHalf,
  },
  InMeeting: {
    label: "In Meeting",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    Icon: FaUsers,
  },
  Graded: {
    label: "Graded",
    bg: "bg-green-100",
    text: "text-green-700",
    Icon: FaCheckCircle,
  },
};

const statusCell = (status: string) => {
  const s = statusMap[status];
  if (!s)
    return (
      <span className="inline-flex items-center justify-center px-4 py-1 bg-gray-100 text-gray-600 font-semibold rounded-full text-sm shadow-sm">
        <FaTimesCircle className="mr-1" /> Unknown
      </span>
    );
  return (
    <span
      className={`inline-flex items-center justify-center px-4 py-1 ${s.bg} ${s.text} font-semibold rounded-full text-sm shadow-sm`}
    >
      <s.Icon className="mr-1" /> {s.label}
    </span>
  );
};

const GradeRoundsPopup: React.FC<Props> = ({ submissionId, onClose }) => {
  const [rounds, setRounds] = useState<GradeRound[]>([]);
  const setGlobalLoading = useLoadingStore((state) => state.setLoading);

  const hasCoLecturer = rounds.some((r) => !!r.coLecturerName);
  const hasMeetingUrl = rounds.some((r) => !!r.meetingUrl);
  const hasNote = rounds.some((r) => !!r.note);

  useEffect(() => {
    setGlobalLoading(true);
    getGradeRoundsBySubmissionId(submissionId)
      .then(setRounds)
      .finally(() => {
        setTimeout(() => setGlobalLoading(false));
      });
  }, [submissionId]);

  return (
    <div
      className="fixed inset-0 bg-white/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl p-8 min-w-[600px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-blue-200 text-blue-900">
              <th className="px-3 py-2 text-center">Round</th>
              <th className="px-3 py-2 text-center">Score</th>
              <th className="px-3 py-2 text-center">Lecturer</th>
              {hasCoLecturer && (
                <th className="px-3 py-2 text-center">Co Lecturer</th>
              )}
              {hasNote && (
                <th className="px-3 py-2 text-center">Note</th>
              )}
              <th className="px-3 py-2 text-center">Grade At</th>
              {hasMeetingUrl && (
                <th className="px-3 py-2 text-center">Meeting URL</th>
              )}
              <th className="px-3 py-2 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((r) => (
              <tr key={r.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-3 py-2 text-center">{r.round}</td>
                <td className="px-3 py-2 text-center">{r.score ?? "-"}</td>
                <td className="px-3 py-2 text-center">{r.lecturerName}</td>
                {hasCoLecturer && (
                  <td className="px-3 py-2 text-center">
                    {r.coLecturerName || "-"}
                  </td>
                )}
                {hasNote && (
                  <td className="px-3 py-2">{r.note || "-"}</td>
                )}
                <td className="px-3 py-2 text-center">
                  {r.gradeAt ? new Date(r.gradeAt).toLocaleString() : "-"}
                </td>
                {hasMeetingUrl && (
                  <td className="px-3 py-2 text-center">
                    {r.meetingUrl ? (
                      <a
                        href={r.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Link
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                )}
                <td className="px-3 py-2 text-center">
                  {statusCell(r.status || "")}
                </td>
              </tr>
            ))}
            {rounds.length === 0 && (
              <tr>
                <td
                  colSpan={
                    6 + (hasCoLecturer ? 1 : 0) + (hasMeetingUrl ? 1 : 0)
                  }
                  className="text-center py-6 text-gray-400 bg-gray-50"
                >
                  No grade round found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeRoundsPopup;
