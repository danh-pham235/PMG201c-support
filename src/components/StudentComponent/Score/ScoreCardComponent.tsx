import type { Score } from "../../../types/score.type";
import { useNavigate } from "react-router-dom";

interface Props {
  score: Score;
}

const ScoreCard: React.FC<Props> = ({score}: Props) => {
    const navigate = useNavigate();

    return ( 
        <div className="w-full md:w-1/2 border p-4 rounded shadow space-y-2">
        <p className="text-xl font-semibold">Average: {(score.regrade2 ?? score.regrade1 ?? score.final).toFixed(1)}</p>
        <p>Status: <span className="font-medium text-green-600">{score.status}</span></p>
        <p>Final Score: {score.final} / 10</p>
        {score.regrade1 !== undefined && <p>Regrade Round 1: {score.regrade1} / 10</p>}
        {score.regrade2 !== undefined && <p>Regrade Round 2: {score.regrade2} / 10</p>}
        <button
          onClick={() => navigate("/student/regrade")}
          className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Regrade
        </button>
    </div>
    );
}

export default ScoreCard;