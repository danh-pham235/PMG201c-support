import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import { API_SUBMISSION, API_EXAM } from "../../constants/apiConstants";
import { FaUserGraduate, FaFilePdf } from "react-icons/fa";
import LoadingScreen from "../Common/LoadingScreen";
import { useLoadingStore } from "../../config/zustand";
import { submitGrade } from "../../services/lecturer.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { aiGrade } from "../../services/lecturer.service";


const GradeSubmission: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submissionId, examId } = location.state || {};
  const [studentText, setStudentText] = useState("");
  const [baremUrl, setBaremUrl] = useState("");
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const { setLoading: setGlobalLoading } = useLoadingStore();

  useEffect(() => {
    if (!submissionId || !examId) {
      navigate("/lecturer/assigned-submissions");
      return;
    }
    const fetchData = async () => {
      setGlobalLoading(true);
      const start = Date.now();
      try {
        const resSubmission = await axiosInstance.get(
          `${API_SUBMISSION.GET_SUBMISSION_DETAIL}/${submissionId}`
        );
        setStudentText(resSubmission.data.content || "");

        
        const resBarem = await axiosInstance.get(
          `${API_EXAM.VIEW_BAREM}/${examId}`,
          { responseType: "blob" }
        );
        const url = URL.createObjectURL(resBarem.data);
        setBaremUrl(url);
      } catch (err) {
        setStudentText("Failed to load student submission");
        setBaremUrl("");
      } finally {
        const elapsed = Date.now() - start;
        const minLoading = 600;
        if (elapsed < minLoading) {
          setTimeout(() => setGlobalLoading(false), minLoading - elapsed);
        } else {
          setGlobalLoading(false);
        }
      }
    };
    fetchData();
  }, [submissionId, examId, navigate, setGlobalLoading]);

  const handleAICheck = async () => {
    setLoading(true);
    try {
      const res = await aiGrade(submissionId);
      setAiScore(res.aiScore);
      toast.success("AI grading completed successfully!");
    } catch (err) {
      setAiScore(null);
      toast.error("AI grading failed!");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionId || finalScore === null) {
      toast.error("Missing submission ID or score!");
      return;
    }
    try {
      setGlobalLoading(true);
      await submitGrade(submissionId, finalScore, note);
      toast.success("Grading submitted successfully!");
      setTimeout(() => {
        navigate("/lecturer/assigned-submissions");
      }, 1200);
    } catch (error) {
      toast.error("Failed to submit grade!");
    } finally {
      setTimeout(() => setGlobalLoading(false), 800);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <LoadingScreen />
      <div
        style={{
          padding: 32,
          maxWidth: 1800,
          width: "100%",
          margin: "0 auto",
          background: "linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            textAlign: "center",
            marginBottom: 36,
            letterSpacing: 1,
            color: "#2d2d72",
            textShadow: "0 2px 12px #647dee33",
          }}
        >
          Grade Submission
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 2fr 0.8fr",
            alignItems: "center",
            gap: 28,
            maxWidth: 1200,
            margin: "0 auto 40px auto",
            background: "#fff",
            borderRadius: 24,
            boxShadow: "0 6px 32px #647dee22",
            padding: 36,
            minHeight: 220,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              minWidth: 200,
            }}
          >
            <div>
              <label
                style={{
                  fontWeight: 700,
                  marginBottom: 8,
                  display: "block",
                  color: "#2d2d72",
                  letterSpacing: 0.2,
                }}
              >
                AI Score:
              </label>
              <input
                type="number"
                value={aiScore ?? ""}
                readOnly
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 10,
                  border: "1.5px solid #bfc9e0",
                  fontSize: 18,
                  background: "#f5f7fa",
                  marginBottom: 0,
                  color: "#4b2479",
                  fontWeight: 600,
                  boxShadow: "0 1px 6px #647dee11",
                  transition: "border 0.2s",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontWeight: 700,
                  marginBottom: 8,
                  display: "block",
                  color: "#2d2d72",
                  letterSpacing: 0.2,
                }}
              >
                Final Score:
              </label>
              <input
                type="number"
                value={finalScore ?? ""}
                onChange={(e) => setFinalScore(Number(e.target.value))}
                required
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 10,
                  border: "1.5px solid #bfc9e0",
                  fontSize: 18,
                  background: "#f5f7fa",
                  marginBottom: 0,
                  color: "#2d2d72",
                  fontWeight: 600,
                  boxShadow: "0 1px 6px #647dee11",
                  transition: "border 0.2s",
                }}
              />
            </div>
          </div>
          <div
            style={{
              minWidth: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: 8,
            }}
          >
            <label
              style={{
                fontWeight: 700,
                marginBottom: 8,
                display: "block",
                color: "#2d2d72",
                letterSpacing: 0.2,
              }}
            >
              Note:
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your note here..."
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1.5px solid #bfc9e0",
                fontSize: 18,
                background: "#f5f7fa",
                height: 110,
                resize: "vertical",
                color: "#2d2d72",
                boxShadow: "0 1px 6px #647dee11",
                transition: "border 0.2s",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "stretch",
              minWidth: 140,
              justifySelf: "end",
            }}
          >
            <button
              type="button"
              onClick={handleAICheck}
              disabled={loading}
              style={{
                padding: "14px 0",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(90deg, #7f53ac 0%, #647dee 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                boxShadow: "0 4px 16px #7f53ac44",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s, box-shadow 0.2s, transform 0.1s",
                marginBottom: 6,
                letterSpacing: 1,
                textShadow: "0 1px 8px #7f53ac33",
                outline: "none",
                borderBottom: loading ? "3px solid #bfc9e0" : "none",
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'}
              onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              {loading ? "AI Grading..." : "AI Grading"}
            </button>
            <button
              type="submit"
              style={{
                padding: "14px 0",
                borderRadius: 10,
                border: "none",
                background: "#43a047",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer",
                transition: "background 0.2s, transform 0.1s",
                boxShadow: "0 2px 8px #43a04733",
                outline: "none",
              }}
              onMouseOver={e => e.currentTarget.style.background = '#388e3c'}
              onMouseOut={e => e.currentTarget.style.background = '#43a047'}
            >
              Submit
            </button>
          </div>
        </form>

        <div
          style={{
            display: "flex",
            gap: 40,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              flex: 1.3,
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 16px #647dee22",
              padding: 32,
              minWidth: 420,
              maxWidth: 750,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 800,
                fontSize: 24,
                marginBottom: 20,
                borderLeft: "5px solid #647dee",
                paddingLeft: 14,
                letterSpacing: 0.5,
                color: "#2d2d72",
              }}
            >
              <FaUserGraduate style={{ marginRight: 10, color: "#647dee" }} />
              Student Submission
            </div>
            <textarea
              value={studentText}
              readOnly
              rows={22}
              style={{
                width: "100%",
                border: "1.5px solid #bfc9e0",
                borderRadius: 10,
                padding: 18,
                background: "#f9f9f9",
                fontFamily: "inherit",
                fontSize: 19,
                minHeight: 600,
                resize: "vertical",
                color: "#2d2d72",
                fontWeight: 500,
                boxShadow: "0 1px 8px #647dee11",
              }}
            />
          </div>
          <div
            style={{
              flex: 1.7,
              background: "#fff",
              borderRadius: 18,
              boxShadow: "0 2px 16px #7f53ac22",
              padding: 32,
              minWidth: 500,
              maxWidth: 1100,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 800,
                fontSize: 24,
                marginBottom: 20,
                borderLeft: "5px solid #7f53ac",
                paddingLeft: 14,
                letterSpacing: 0.5,
                color: "#4b2479",
              }}
            >
              <FaFilePdf style={{ marginRight: 10, color: "#7f53ac" }} />
              Answer Key
            </div>
            {baremUrl ? (
              <iframe
                src={baremUrl + "#toolbar=0"}
                width="100%"
                height="850px"
                title="Barem PDF"
                style={{
                  border: "1.5px solid #bfc9e0",
                  borderRadius: 10,
                  background: "#fff",
                  boxShadow: "0 1px 8px #7f53ac11",
                }}
              />
            ) : (
              <div>Loading PDF file...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GradeSubmission;
