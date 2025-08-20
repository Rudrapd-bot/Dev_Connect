import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams(); // URL से user id
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/profile/user/${id}`);
        const data = await res.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10">Loading profile...</h2>;
  if (!profile) return <h2 className="text-center mt-10">Profile not found</h2>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-2xl">
      <h1 className="text-3xl font-bold mb-4">{profile.user.name}</h1>
      <p className="text-gray-700">{profile.bio}</p>

      <h2 className="mt-4 font-semibold">Skills:</h2>
      <ul className="list-disc list-inside">
        {profile.skills?.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>

      <div className="mt-4 flex gap-4">
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            className="text-blue-600 underline"
          >
            GitHub
          </a>
        )}
        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            className="text-blue-600 underline"
          >
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
};

export default Profile;
