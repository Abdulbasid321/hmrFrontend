// // 
// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const AdminDashboard = () => {
//   const [adminEmail, setAdminEmail] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (!token) {
//       router.push('/admin-login');
//     } else {
//       // In real apps, decode token to get user info
//       setAdminEmail('admin@example.com');
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-green-600">Admin Dashboard</h1>
//         <span className="text-gray-600 text-sm">Logged in as {adminEmail}</span>
//       </header>

//       {/* Main Content */}
//       <main className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
//           <h2 className="text-sm text-gray-500">Total Employees</h2>
//           <p className="text-3xl font-bold text-gray-800">34</p>
//         </div>

//         <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
//           <h2 className="text-sm text-gray-500">Departments</h2>
//           <p className="text-3xl font-bold text-gray-800">6</p>
//         </div>

//         <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
//           <h2 className="text-sm text-gray-500">Pending Leave Requests</h2>
//           <p className="text-3xl font-bold text-gray-800">2</p>
//         </div>
//       </main>

//       {/* Manage Employees Button */}
//       <div className="px-6 pb-10">
//         <button
//           onClick={() => router.push('/admin/employees')}
//           className="mt-6 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
//         >
//           Manage Employees
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({ totalEmployees: 0, totalDepartments: 0, pendingLeaves: 0 });
  const [adminEmail, setAdminEmail] = useState('');
  const router = useRouter();

useEffect(() => {
  const token = localStorage.getItem('adminToken');
  const email = localStorage.getItem('adminEmail');
  if (email) {
    setAdminEmail(email);
  }

  const fetchSummary = async () => {
    try {
      const res = await fetch('https://hmr.onrender.com/dashboard/summary', {
      // const res = await fetch('http://localhost:5000/dashboard/summary', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error('Failed to fetch dashboard summary');
    }
  };

  fetchSummary();
}, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">Admin Dashboard</h1>
        <span className="text-gray-600 text-sm">Logged in as {adminEmail}</span>
      </header>

      <main className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card title="Total Employees" value={summary.totalEmployees} borderColor="green" />
        <Card title="Departments" value={summary.totalDepartments} borderColor="blue" />
        <Card title="Pending Leave Requests" value={summary.pendingLeaves} borderColor="yellow" />
      </main>

      <div className="px-6 pb-10">
        <button
          onClick={() => router.push('/admin/employees')}
          className="mt-6 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
        >
          Manage Employees
        </button>
      </div>
    </div>
  );
};

const Card = ({ title, value, borderColor }: { title: string; value: number; borderColor: string }) => (
  <div className={`bg-white rounded-xl shadow p-5 border-l-4 border-${borderColor}-500`}>
    <h2 className="text-sm text-gray-500">{title}</h2>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default AdminDashboard;
