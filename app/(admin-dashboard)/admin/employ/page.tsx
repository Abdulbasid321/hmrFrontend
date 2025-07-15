// 'use client';
// import React, { useEffect, useState } from 'react';

// type Employee = {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   position: string;
//   department: string;
// };

// const EmployeePage = () => {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [formData, setFormData] = useState<Omit<Employee, '_id'>>({
//     name: '',
//     email: '',
//     phone: '',
//     position: '',
//     department: '',
//   });
//   const [editId, setEditId] = useState<string | null>(null);

//   const fetchEmployees = async () => {
//     const res = await fetch('http://localhost:5000/employees');
//     const data = await res.json();
//     setEmployees(data);
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const handleSubmit = async () => {
//     const url = editId
//       ? `http://localhost:5000/api/employees/${editId}`
//       : 'http://localhost:5000/api/employees';
//     const method = editId ? 'PUT' : 'POST';

//     const res = await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       fetchEmployees();
//       setFormData({ name: '', email: '', phone: '', position: '', department: '' });
//       setEditId(null);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`http://localhost:5000/employees/${id}`, { method: 'DELETE' });
//     fetchEmployees();
//   };

//   const handleEdit = (emp: Employee) => {
//     setEditId(emp._id);
//     setFormData({ ...emp });
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-green-600">Manage Employees</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         {['name', 'email', 'phone', 'position', 'department'].map((field) => (
//           <input
//             key={field}
//             type="text"
//             placeholder={field[0].toUpperCase() + field.slice(1)}
//             value={formData[field as keyof typeof formData]}
//             onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
//             className="p-2 border border-gray-300 rounded-md"
//           />
//         ))}
//         <button
//           onClick={handleSubmit}
//           className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
//         >
//           {editId ? 'Update Employee' : 'Add Employee'}
//         </button>
//       </div>

//       <table className="w-full bg-white rounded-lg shadow">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="p-3">Name</th>
//             <th className="p-3">Email</th>
//             <th className="p-3">Phone</th>
//             <th className="p-3">Position</th>
//             <th className="p-3">Department</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp._id} className="border-t">
//               <td className="p-3">{emp.name}</td>
//               <td className="p-3">{emp.email}</td>
//               <td className="p-3">{emp.phone}</td>
//               <td className="p-3">{emp.position}</td>
//               <td className="p-3">{emp.department}</td>
//               <td className="p-3 flex gap-2">
//                 <button
//                   onClick={() => handleEdit(emp)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(emp._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmployeePage;

"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Employee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
}

const EmployeeManagementPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Omit<Employee, "_id">>({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchEmployees = async () => {
    const res = await axios.get<Employee[]>("https://hmr.onrender.com/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`https://hmr.onrender.com/employees/${editingId}`, form);
    } else {
      await axios.post("https://hmr.onrender.com/employees", form);
    }
    setForm({ name: "", email: "", phone: "", position: "", department: "" });
    setEditingId(null);
    fetchEmployees();
  };

  const handleEdit = (emp: Employee) => {
    setForm({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      position: emp.position,
      department: emp.department,
    });
    setEditingId(emp._id);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`https://hmr.onrender.com/employee/${id}`);
    fetchEmployees();
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Employee Management</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
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
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="p-3 border rounded"
          required
        />
        <input
          type="text"
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          className="p-3 border rounded"
          required
        />
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          className="p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="col-span-1 sm:col-span-2 lg:col-span-3 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {editingId ? "Update Employee" : "Create Employee"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-left text-sm">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Position</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-t">
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.email}</td>
                <td className="p-2 border">{emp.phone}</td>
                <td className="p-2 border">{emp.position}</td>
                <td className="p-2 border">{emp.department}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
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

export default EmployeeManagementPage;
