'use client';

import { useEffect, useState } from 'react';

const PayrollPage = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [formData, setFormData] = useState({
    employee: '',
    basicSalary: '',
    bonus: '',
    deductions: ''
  });

  const fetchPayrolls = async () => {
    const res = await fetch('https://hmr.onrender.com/payroll');
    const data = await res.json();
    setPayrolls(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('https://hmr.onrender.com/payroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ employee: '', basicSalary: '', bonus: '', deductions: '' });
    fetchPayrolls();
  };

  const handleDelete = async (id: string) => {
    await fetch(`https://hmr.onrender.com/payroll/${id}`, { method: 'DELETE' });
    fetchPayrolls();
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Payroll Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6 space-y-4">
        <input
          type="text"
          placeholder="Employee ID"
          className="w-full border rounded p-2"
          value={formData.employee}
          onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
        />
        <input
          type="number"
          placeholder="Basic Salary"
          className="w-full border rounded p-2"
          value={formData.basicSalary}
          onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
        />
        <input
          type="number"
          placeholder="Bonus"
          className="w-full border rounded p-2"
          value={formData.bonus}
          onChange={(e) => setFormData({ ...formData, bonus: e.target.value })}
        />
        <input
          type="number"
          placeholder="Deductions"
          className="w-full border rounded p-2"
          value={formData.deductions}
          onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Payroll
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2">Employee</th>
              <th className="p-2">Basic Salary</th>
              <th className="p-2">Bonus</th>
              <th className="p-2">Deductions</th>
              <th className="p-2">Total Pay</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((pay: any) => (
              <tr key={pay._id} className="border-t">
                <td className="p-2">{pay.employee?.fullName || 'N/A'}</td>
                <td className="p-2">₦{pay.basicSalary}</td>
                <td className="p-2">₦{pay.bonus}</td>
                <td className="p-2">₦{pay.deductions}</td>
                <td className="p-2 font-semibold">₦{pay.totalPay}</td>
                <td className="p-2">{new Date(pay.payDate).toLocaleDateString()}</td>
                <td className="p-2">
                  <button onClick={() => handleDelete(pay._id)} className="text-red-600 hover:underline">
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

export default PayrollPage;
