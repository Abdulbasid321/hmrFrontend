// 'use client';
// import React, { useEffect, useState } from 'react';

// type Employee = {
//   name: string;
//   position: string;
//   department: string;
//   joinDate: string; // ISO string
// };

// const WelcomeSection = () => {
//   const [employee, setEmployee] = useState<Employee | null>(null);

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       const res = await fetch('http://localhost:5000/employees/me');
//       const data = await res.json();
//       setEmployee(data);
//     };

//     fetchEmployee();
//   }, []);

//   if (!employee) {
//     return <div className="text-center text-gray-500">Loading...</div>;
//   }

//   return (
//     <div className="bg-gradient-to-tr from-green-50 to-white border border-green-100 shadow-md rounded-xl p-6 md:p-8 mb-6 w-full">
//      <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-2">
//   Welcome back, {employee?.name?.split(' ')[0] || 'Employee'} 👋
// </h2>
//       <p className="text-gray-600 text-base md:text-lg">
//         Here’s your profile summary:
//       </p>

//       <div className="mt-4 grid gap-4 md:grid-cols-3 text-sm md:text-base text-gray-800">
//         <div className="flex flex-col">
//           <span className="text-gray-500">Position</span>
//           <span className="font-medium">{employee.position}</span>
//         </div>
//         <div className="flex flex-col">
//           <span className="text-gray-500">Department</span>
//           <span className="font-medium">{employee.department}</span>
//         </div>
//         <div className="flex flex-col">
//           <span className="text-gray-500">Joined On</span>
//           <span className="font-medium">
//             {new Date(employee.joinDate).toLocaleDateString(undefined, {
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             })}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;
'use client';

import React, { useEffect, useState } from 'react';

type Employee = {
  name: string;
  position?: string;
  department?: string;
  joinDate?: string; // ISO string
};

const WelcomeSection = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('employeeToken');
        if (!token) {
          setError('No authentication token found.');
          setLoading(false);
          return;
        }

        const res = await fetch('https://hmr.onrender.com/employees/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch employee data');
        }

        const data = await res.json();
        setEmployee(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center text-gray-500">
        No employee data found.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-tr from-green-50 to-white border border-green-100 shadow-md rounded-xl p-6 md:p-8 mb-6 w-full">
      <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-2">
        Welcome back, {employee?.name?.split(' ')[0] || 'Employee'} 👋
      </h2>
      <p className="text-gray-600 text-base md:text-lg">
        Here’s your profile summary:
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3 text-sm md:text-base text-gray-800">
        <div className="flex flex-col">
          <span className="text-gray-500">Position</span>
          <span className="font-medium">{employee.position || 'Not specified'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Department</span>
          <span className="font-medium">{employee.department || 'Not specified'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Joined On</span>
          <span className="font-medium">
            {employee.joinDate
              ? new Date(employee.joinDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
