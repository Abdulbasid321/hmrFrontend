"use client"
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Admin {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
}

const AdminManagementPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [form, setForm] = useState<Omit<Admin, '_id' | 'role'>>({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchAdmins = async () => {
    const res = await axios.get<Admin[]>('https://hmr.onrender.com/admin');
    setAdmins(res.data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`https://hmr.onrender.com/admin/${editingId}`, form);
    } else {
      await axios.post('https://hmr.onrender.com/admin', form);
    }
    setForm({ name: '', email: '', password: '', avatar: '' });
    setEditingId(null);
    fetchAdmins();
  };

  const handleEdit = (admin: Admin) => {
    setForm({
      name: admin.name,
      email: admin.email,
      password: '',
      avatar: admin.avatar || '',
    });
    setEditingId(admin._id);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`https://hmr.onrender.com/admin/${id}`);
    fetchAdmins();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Admin Management</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-3 border rounded"
          required
        />
        {!editingId && (
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 border rounded"
            required
          />
        )}
        <input
          type="text"
          name="avatar"
          value={form.avatar}
          onChange={handleChange}
          placeholder="Avatar URL (optional)"
          className="p-3 border rounded"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {editingId ? 'Update Admin' : 'Create Admin'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Avatar</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-t">
                <td className="p-2 border">{admin.name}</td>
                <td className="p-2 border">{admin.email}</td>
                <td className="p-2 border">
                  {admin.avatar ? (
                    <img
                      src={admin.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(admin)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManagementPage;
