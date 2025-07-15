'use client';
import React, { useEffect, useState } from 'react';

type Department = {
  _id: string;
  name: string;
  description: string;
};

const DepartmentPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formData, setFormData] = useState<Omit<Department, '_id'>>({ name: '', description: '' });
  const [editId, setEditId] = useState<string | null>(null);

  const fetchDepartments = async () => {
    const res = await fetch('https://hmr.onrender.com/departments');
    const data = await res.json();
    setDepartments(data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async () => {
    const url = editId
      ? `https://hmr.onrender.com/departments/${editId}`
      : 'https://hmr.onrender.com/departments';
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      fetchDepartments();
      setFormData({ name: '', description: '' });
      setEditId(null);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`https://hmr.onrender.com/departments/${id}`, { method: 'DELETE' });
    fetchDepartments();
  };

  const handleEdit = (dept: Department) => {
    setEditId(dept._id);
    setFormData({ name: dept.name, description: dept.description });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Manage Departments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Department Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          {editId ? 'Update Department' : 'Add Department'}
        </button>
      </div>

      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept._id} className="border-t">
              <td className="p-3">{dept.name}</td>
              <td className="p-3">{dept.description}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEdit(dept)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dept._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentPage;
