type ScoreRow = {
  type: string;
  date: string;
  score: number;
  note?: string;
};

interface ScoreTableProps {
  scoreRows: ScoreRow[];
}

const ScoreTable: React.FC<ScoreTableProps> = ({ scoreRows }) => (
  <div className="bg-white text-gray-900 rounded-3xl p-8 min-w-[340px] shadow-2xl flex flex-col justify-center border border-gray-100 ml-7">
    <div className="text-2xl font-bold mb-6 text-center tracking-wide">
      Score Table
    </div>
    <table className="w-full text-left rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-blue-50 border-b border-blue-200">
          <th className="pb-3 pt-2 px-3 font-semibold text-blue-800 rounded-tl-xl">
            Type
          </th>
          <th className="pb-3 pt-2 px-3 font-semibold text-blue-800">Date</th>
          <th className="pb-3 pt-2 px-3 font-semibold text-blue-800 text-right">
            Score
          </th>
          <th className="pb-3 pt-2 px-3 font-semibold text-blue-800 rounded-tr-xl">
            Note
          </th>
        </tr>
      </thead>
      <tbody>
        {scoreRows.map((row, idx) => (
          <tr
            key={idx}
            className={`hover:bg-blue-50 transition ${
              idx !== scoreRows.length - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <td className="py-3 px-3 font-medium">{row.type}</td>
            <td className="py-3 px-3">{row.date}</td>
            <td
              className={`py-3 px-3 text-right font-bold ${
                Number(row.score) >= 5 ? "text-green-600" : "text-red-500"
              }`}
            >
              {typeof row.score === "number" ? row.score.toFixed(1) : row.score}
            </td>
            <td className="py-3 px-3 text-blue-700 text-sm max-w-[200px] break-words">
              {row.note || "--"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ScoreTable;
