'use client';
import React, { useEffect, useState } from 'react';

type Employee = {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
};

const ProfileCard = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Employee | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('employeeToken');
      const res = await fetch('https://hmr.onrender.com/employees/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setEmployee(data);
      setFormData(data);
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('employeeToken');
    const res = await fetch('https://hmr.onrender.com/employees/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const updated = await res.json();
    setEmployee(updated);
    setFormData(updated);
    setIsEditing(false);
  };

  if (!employee || !formData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-3xl overflow-hidden">
      <div className="p-6 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-700">Employee Profile</h2>
          <p className="text-gray-500">{isEditing ? 'Edit your details' : 'Profile Overview'}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {['name', 'email', 'phone', 'department', 'position'].map((field) => (
            <div key={field}>
              <label className="block text-sm text-gray-600 capitalize mb-1">{field}</label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <div className="text-gray-800 font-medium bg-gray-50 p-2 px-4 rounded-lg">{(employee as any)[field]}</div>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm text-gray-600 mb-1">Join Date</label>
            {isEditing ? (
             <input
  type="date"
  name="joinDate"
  value={formData.joinDate ? formData.joinDate.slice(0, 10) : ''}
  onChange={handleChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
/>

            ) : (
              <div className="text-gray-800 font-medium bg-gray-50 p-2 px-4 rounded-lg">
                {new Date(employee.joinDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8 space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(employee);
                }}
                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
