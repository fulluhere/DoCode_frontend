// frontend/src/pages/SubmissionHistory.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMySubmissions } from "../api/submissions";

export default function SubmissionHistory() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMySubmissions()
      .then((res) => setSubmissions(res.data.submissions))
      .catch((err) => setError(err.response?.data?.message || "Failed to load submissions"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading submissions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>My Submissions</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
            <th>Date</th>
            <th>Language</th>
            <th>Verdict</th>
            <th>Runtime</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s._id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
              <td>{s.language}</td>
              <td>
                <Link to={`/submissions/${s._id}`}>{s.verdict}</Link>
              </td>
              <td>{s.runtime}ms</td>
            </tr>
          ))}
        </tbody>
      </table>
      {submissions.length === 0 && <p>No submissions yet.</p>}
    </div>
  );
}