// 'use client';
// import React, { useEffect, useState } from 'react';

// type Leave = {
//   _id: string;
//   employeeId: { _id: string; fullName: string; email: string };
//   type: string;
//   startDate: string;
//   endDate: string;
//   reason: string;
//   status: string;
// };

// type Employee = { _id: string; fullName: string };

// const LeavePage = () => {
//   const [leaves, setLeaves] = useState<Leave[]>([]);
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [formData, setFormData] = useState({
//     employeeId: '',
//     type: '',
//     startDate: '',
//     endDate: '',
//     reason: '',
//   });
//   const [editId, setEditId] = useState<string | null>(null);

//   useEffect(() => {
//     fetchLeaves();
//     fetchEmployees();
//   }, []);

//   const fetchLeaves = async () => {
//     const res = await fetch('http://localhost:5000/api/leaves');
//     const data = await res.json();
//     setLeaves(data);
//   };

//   const fetchEmployees = async () => {
//     const res = await fetch('http://localhost:5000/api/employees');
//     const data = await res.json();
//     setEmployees(data);
//   };

//   const handleSubmit = async () => {
//     const url = editId
//       ? `http://localhost:5000/api/leaves/${editId}`
//       : 'http://localhost:5000/api/leaves';
//     const method = editId ? 'PUT' : 'POST';

//     const res = await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       fetchLeaves();
//       setFormData({ employeeId: '', type: '', startDate: '', endDate: '', reason: '' });
//       setEditId(null);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`http://localhost:5000/api/leaves/${id}`, { method: 'DELETE' });
//     fetchLeaves();
//   };

//   const handleEdit = (leave: Leave) => {
//     setEditId(leave._id);
//     setFormData({
//       employeeId: leave.employeeId._id,
//       type: leave.type,
//       startDate: leave.startDate.slice(0, 10),
//       endDate: leave.endDate.slice(0, 10),
//       reason: leave.reason,
//     });
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-green-600">Leave Management</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <select
//           value={formData.employeeId}
//           onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
//           className="p-2 border border-gray-300 rounded-md"
//         >
//           <option value="">Select Employee</option>
//           {employees.map(emp => (
//             <option key={emp._id} value={emp._id}>{emp.fullName}</option>
//           ))}
//         </select>
//         <select
//           value={formData.type}
//           onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//           className="p-2 border border-gray-300 rounded-md"
//         >
//           <option value="">Select Leave Type</option>
//           <option value="Sick">Sick</option>
//           <option value="Casual">Casual</option>
//           <option value="Maternity">Maternity</option>
//           <option value="Paternity">Paternity</option>
//           <option value="Annual">Annual</option>
//         </select>
//         <input
//           type="date"
//           value={formData.startDate}
//           onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
//           className="p-2 border border-gray-300 rounded-md"
//         />
//         <input
//           type="date"
//           value={formData.endDate}
//           onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
//           className="p-2 border border-gray-300 rounded-md"
//         />
//         <input
//           type="text"
//           placeholder="Reason"
//           value={formData.reason}
//           onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//           className="p-2 border border-gray-300 rounded-md col-span-1 md:col-span-2"
//         />
//         <button
//           onClick={handleSubmit}
//           className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 col-span-1 md:col-span-2"
//         >
//           {editId ? 'Update Leave' : 'Assign Leave'}
//         </button>
//       </div>

//       <table className="w-full bg-white rounded-lg shadow">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="p-3">Employee</th>
//             <th className="p-3">Type</th>
//             <th className="p-3">Period</th>
//             <th className="p-3">Status</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaves.map((leave) => (
//             <tr key={leave._id} className="border-t">
//               <td className="p-3">{leave.employeeId?.fullName}</td>
//               <td className="p-3">{leave.type}</td>
//               <td className="p-3">{leave.startDate.slice(0, 10)} - {leave.endDate.slice(0, 10)}</td>
//               <td className="p-3">{leave.status}</td>
//               <td className="p-3 flex gap-2">
//                 <button onClick={() => handleEdit(leave)} className="text-blue-600 hover:underline">
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(leave._id)} className="text-red-600 hover:underline">
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

// export default LeavePage;

'use client';
import React, { useEffect, useState } from 'react';

type Leave = {
  _id: string;
  employeeId: { _id: string; name: string; email: string };
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
};

type Employee = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
};

const LeavePage = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  const fetchLeaves = async () => {
    const res = await fetch('https://hmr.onrender.com/leaves');
    const data = await res.json();
    setLeaves(data);
  };

  const fetchEmployees = async () => {
    const res = await fetch('https://hmr.onrender.com/employees');
    const data = await res.json();
    setEmployees(data);
  };

  const handleSubmit = async () => {
    const url = editId
      ? `https://hmr.onrender.com/leaves/${editId}`
      : 'https://hmr.onrender.com/leaves';
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      fetchLeaves();
      setFormData({
        employeeId: '',
        type: '',
        startDate: '',
        endDate: '',
        reason: '',
      });
      setEditId(null);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`https://hmr.onrender.com/leaves/${id}`, { method: 'DELETE' });
    fetchLeaves();
  };

  const handleEdit = (leave: Leave) => {
    setEditId(leave._id);
    setFormData({
      employeeId: leave.employeeId._id,
      type: leave.type,
      startDate: leave.startDate.slice(0, 10),
      endDate: leave.endDate.slice(0, 10),
      reason: leave.reason,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Leave Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          value={formData.employeeId}
          onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>

        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Leave Type</option>
          <option value="Sick">Sick</option>
          <option value="Casual">Casual</option>
          <option value="Maternity">Maternity</option>
          <option value="Paternity">Paternity</option>
          <option value="Annual">Annual</option>
        </select>

        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="p-2 border border-gray-300 rounded-md col-span-1 md:col-span-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 col-span-1 md:col-span-2"
        >
          {editId ? 'Update Leave' : 'Assign Leave'}
        </button>
      </div>

      <table className="w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Employee</th>
            <th className="p-3">Type</th>
            <th className="p-3">Period</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className="border-t">
              <td className="p-3">{leave.employeeId?.name}</td>
              <td className="p-3">{leave.type}</td>
              <td className="p-3">{leave.startDate.slice(0, 10)} - {leave.endDate.slice(0, 10)}</td>
              <td className="p-3">{leave.status}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(leave)} className="text-blue-600 hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(leave._id)} className="text-red-600 hover:underline">
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

export default LeavePage;
