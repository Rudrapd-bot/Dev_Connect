import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Developers = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile"); // backend URL
        const data = await res.json();
        setProfiles(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <h2 className="text-center mt-10">Loading profiles...</h2>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Developers</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="bg-white shadow rounded-2xl p-4 border"
          >
            <h2 className="text-xl font-semibold">{profile.user.name}</h2>
            <p className="text-gray-600">{profile.bio}</p>
            <p className="mt-2">
              <strong>Skills:</strong> {profile.skills?.join(", ")}
            </p>

            <div className="flex gap-3 mt-3">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  GitHub
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  LinkedIn
                </a>
              )}
            </div>

            <Link
              to={`/profile/${profile.user._id}`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;
