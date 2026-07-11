// frontend/src/pages/Leaderboard.jsx
import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/leaderboard";

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLeaderboard()
      .then((res) => setEntries(res.data.leaderboard))
      .catch((err) => setError(err.response?.data?.message || "Failed to load leaderboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Leaderboard</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((user, i) => (
            <tr key={user._id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{i + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
              <td>{user.problemsSolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {entries.length === 0 && <p>No entries yet.</p>}
    </div>
  );
}