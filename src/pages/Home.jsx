// frontend/src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: 800, margin: "60px auto", textAlign: "center" }}>
      <h1>Welcome to DoCode</h1>
      <p>Sharpen your problem-solving skills. Solve coding challenges, compete on the leaderboard, and get AI-powered hints along the way.</p>

      {user ? (
        <div style={{ marginTop: 30 }}>
          <p>Welcome back, {user.username}!</p>
          <Link to="/dashboard">
            <button style={{ marginRight: 10 }}>Go to Dashboard</button>
          </Link>
          <Link to="/problems">
            <button>Browse Problems</button>
          </Link>
        </div>
      ) : (
        <div style={{ marginTop: 30 }}>
          <Link to="/login">
            <button style={{ marginRight: 10 }}>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      )}

      <div style={{ marginTop: 50, display: "flex", justifyContent: "center", gap: 40 }}>
        <div>
          <h3>Solve Problems</h3>
          <p>Practice with a growing library of coding challenges across difficulty levels.</p>
        </div>
        <div>
          <h3>Compete</h3>
          <p>Climb the leaderboard as you solve more problems.</p>
        </div>
        <div>
          <h3>AI-Powered Hints</h3>
          <p>Get step-by-step guidance when you're stuck, without spoiling the solution.</p>
        </div>
      </div>
    </div>
  );
}