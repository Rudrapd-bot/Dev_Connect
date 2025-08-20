import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <h2 className="text-center mt-10">Please login</h2>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold">Welcome, {user.name} 👋</h2>
      <p className="mt-2 text-gray-600">{user.email}</p>

      {/* Link should be inside JSX */}
      <Link to="/profile" className="mt-4 text-blue-600 hover:underline">
        Go to Profile
      </Link>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
