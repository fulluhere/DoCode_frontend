// frontend/src/pages/SubmissionDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubmission } from "../api/submissions";

export default function SubmissionDetail() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSubmission(id)
      .then((res) => setSubmission(res.data.submission))
      .catch((err) => setError(err.response?.data?.message || "Failed to load submission"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!submission) return null;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Submission Detail</h2>
      <p><strong>Verdict:</strong> {submission.verdict}</p>
      <p><strong>Language:</strong> {submission.language}</p>
      <p><strong>Runtime:</strong> {submission.runtime}ms</p>
      <p><strong>Test Cases Passed:</strong> {submission.testCasesPassed} / {submission.testCasesTotal}</p>
      {submission.errorMessage && (
        <div>
          <strong>Error:</strong>
          <pre style={{ color: "red", background: "#fee", padding: 10 }}>{submission.errorMessage}</pre>
        </div>
      )}
      <h3>Code</h3>
      <pre style={{ background: "#f5f5f5", padding: 15, overflowX: "auto" }}>{submission.code}</pre>
    </div>
  );
}