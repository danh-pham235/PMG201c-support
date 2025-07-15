import React from "react";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  examCodeFilter: string;
  setExamCodeFilter: (v: string) => void;
  lecturerFilter: string;
  setLecturerFilter: (v: string) => void;
  examCodes: string[];
  lecturers: string[];
  onClear: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  examCodeFilter,
  setExamCodeFilter,
  lecturerFilter,
  setLecturerFilter,
  examCodes,
  lecturers,
  onClear,
}) => (
  <div className="flex flex-wrap gap-4 mb-8 items-end bg-blue-50 rounded-xl px-6 py-4 shadow-sm">
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-blue-700 mb-1 ml-1">
        Search
      </label>
      <input
        type="text"
        placeholder="Search ..."
        className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-lg min-w-[220px] bg-white transition"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-blue-700 mb-1 ml-1">
        Status
      </label>
      <select
        className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-lg bg-white transition"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Graded">Graded</option>
        <option value="Grading">Grading</option>
        <option value="Not assigned">Not assigned</option>
      </select>
    </div>
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-blue-700 mb-1 ml-1">
        Exam Code
      </label>
      <select
        className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-lg bg-white transition"
        value={examCodeFilter}
        onChange={(e) => setExamCodeFilter(e.target.value)}
      >
        <option value="">All Exam Codes</option>
        {examCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-blue-700 mb-1 ml-1">
        Lecturer
      </label>
      <select
        className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded-lg bg-white transition"
        value={lecturerFilter}
        onChange={(e) => setLecturerFilter(e.target.value)}
      >
        <option value="">All Lecturers</option>
        {lecturers.map((lect) => (
          <option key={lect} value={lect}>
            {lect}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col">
      <button
        type="button"
        className="h-10 px-5 mt-5 bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold rounded-lg shadow transition"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  </div>
);

export default FilterBar;
