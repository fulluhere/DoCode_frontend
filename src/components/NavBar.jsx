
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center gap-6 px-6 py-4 border-b border-orange-900 bg-black shadow-lg">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-orange-500 hover:text-orange-400 transition"
      >
        🐯 DoCode
      </Link>

      {user && (
        <Link
          to="/dashboard"
          className="text-orange-100 hover:text-orange-400 transition"
        >
          Dashboard
        </Link>
      )}

      {user && (
        <Link
          to="/problems"
          className="text-orange-100 hover:text-orange-400 transition"
        >
          Problems
        </Link>
      )}

      {user && (
        <Link
          to="/submissions"
          className="text-orange-100 hover:text-orange-400 transition"
        >
          Submissions
        </Link>
      )}

      {user && (
        <Link
          to="/leaderboard"
          className="text-orange-100 hover:text-orange-400 transition"
        >
          Leaderboard
        </Link>
      )}

      <div className="ml-auto flex items-center gap-4">
        {user ? (
          <>
            <span className="text-orange-200 text-sm">
              {user.username}{" "}
              <span className="text-orange-400">
                ({user.role})
              </span>
            </span>

            <button
              onClick={logout}
              className="px-3 py-1.5 text-sm bg-orange-500 text-black font-semibold rounded-md hover:bg-orange-400 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-orange-100 hover:text-orange-400 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-3 py-1.5 text-sm bg-orange-500 text-black font-semibold rounded-md hover:bg-orange-400 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}