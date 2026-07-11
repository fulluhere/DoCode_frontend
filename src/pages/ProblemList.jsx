// frontend/src/pages/ProblemList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProblems } from "../api/problems";

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllProblems()
      .then((res) => setProblems(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load problems"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading problems...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Problems</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p.slug} style={{ borderBottom: "1px solid #eee" }}>
              <td>
                <Link to={`/problems/${p.slug}`}>{p.title}</Link>
              </td>
              <td>{p.difficulty}</td>
              <td>{p.tags?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {problems.length === 0 && <p>No problems published yet.</p>}
    </div>
  );
}