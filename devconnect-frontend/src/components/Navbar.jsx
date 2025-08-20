import { Link } from "react-router-dom";



export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">DevConnect</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/developers" className="hover:text-blue-600">Developers</Link>
      </div>
    </nav>
  );
}
