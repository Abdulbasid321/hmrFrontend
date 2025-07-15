'use client';

import { useEffect, useState } from 'react';

const AdminProfileCard = () => {
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminById = async () => {
    const token = localStorage.getItem('adminToken');
    const adminId = localStorage.getItem('adminId'); // Get adminId from localStorage

    if (!adminId) {
      console.error('Admin ID not found in localStorage.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`https://hmr.onrender.com/admin/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch admin profile');
      }

      const data = await res.json();
      setAdmin(data);
    } catch (err) {
      console.error('Error fetching admin profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminById();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-sm w-full text-center">
        <div className="mb-4">
          <img
            src="/admin-avatar.png"
            alt="Admin Avatar"
            className="w-24 h-24 rounded-full mx-auto border-4 border-green-500"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{admin.name}</h2>
        <p className="text-gray-500">{admin.email}</p>
        <p className="text-sm text-green-600 mt-2">System Administrator</p>

        <div className="mt-6 space-y-3">
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Edit Profile
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition">
            Change Password
          </button>
          <button className="w-full bg-red-100 text-red-600 py-2 rounded hover:bg-red-200 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileCard;
