'use client';

import React, { useEffect, useState } from 'react';

type Leave = {
  type: string;
  total: number;
  used: number;
};

const LeaveSummary = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem('employeeToken');
        const res = await fetch('https://hmr.onrender.com/leaves/me/leaves', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setLeaves(data);
      } catch (error) {
        console.error('Failed to fetch leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Leave Summary</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {leaves.map((leave, index) => {
          const remaining = leave.total - leave.used;

          return (
            <div
              key={index}
              className="bg-white shadow-md border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-bold text-green-600 mb-2">{leave.type}</h3>
              <div className="text-sm text-gray-600">
                <p>Total Days: <span className="font-medium">{leave.total}</span></p>
                <p>Used Days: <span className="font-medium">{leave.used}</span></p>
                <p>Remaining: <span className="font-medium">{remaining}</span></p>
              </div>
              <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${(leave.used / leave.total) * 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaveSummary;
