// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMe } from "../api/user";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMe()
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2>Welcome, {user?.username}</h2>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <div style={{ padding: 20, background: "#f5f5f5", flex: 1, textAlign: "center" }}>
          <h3>{stats?.score ?? 0}</h3>
          <p>Total Score</p>
        </div>
        <div style={{ padding: 20, background: "#f5f5f5", flex: 1, textAlign: "center" }}>
          <h3>{stats?.problemsSolved ?? 0}</h3>
          <p>Problems Solved</p>
        </div>
        <div style={{ padding: 20, background: "#f5f5f5", flex: 1, textAlign: "center" }}>
          <h3>{stats?.role ?? "user"}</h3>
          <p>Role</p>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <Link to="/problems"><button style={{ marginRight: 10 }}>Browse Problems</button></Link>
        <Link to="/leaderboard"><button>View Leaderboard</button></Link>
      </div>
    </div>
  );
}