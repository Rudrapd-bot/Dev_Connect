import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ExperienceForm({ onAdded }) {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ title: "", company: "", from: "", to: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/profile/experience", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    onAdded(data); // callback to update parent
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mt-4">
      <h3 className="text-lg font-semibold mb-2">Add Experience</h3>
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        className="w-full mb-2 px-3 py-2 border rounded-lg"
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        className="w-full mb-2 px-3 py-2 border rounded-lg"
      />
      <input
        type="date"
        name="from"
        value={form.from}
        onChange={handleChange}
        className="w-full mb-2 px-3 py-2 border rounded-lg"
      />
      <input
        type="date"
        name="to"
        value={form.to}
        onChange={handleChange}
        className="w-full mb-2 px-3 py-2 border rounded-lg"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Add
      </button>
    </form>
  );
}
