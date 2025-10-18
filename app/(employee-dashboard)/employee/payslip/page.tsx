"use client";
import { useState, useEffect } from "react";

// Payroll type
type Payroll = {
  _id: string;
  employee?: { _id: string; name: string };
  month: string;
  basicSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  paymentDate: string;
  remarks?: string;
};

export default function PayslipPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);

  useEffect(() => {
    // ✅ Load all payrolls from localStorage
    const stored = localStorage.getItem("payrolls");
    if (!stored) return;

    const allPayrolls: Payroll[] = JSON.parse(stored);
    setPayrolls(allPayrolls);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">All Payslips</h1>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Employee</th>
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Basic</th>
            <th className="p-2 border">Bonus</th>
            <th className="p-2 border">Deductions</th>
            <th className="p-2 border">Net Salary</th>
            <th className="p-2 border">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No payroll records found
              </td>
            </tr>
          ) : (
            payrolls.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{p.employee?.name || "—"}</td>
                <td className="p-2 border">{p.month}</td>
                <td className="p-2 border">₦{p.basicSalary}</td>
                <td className="p-2 border">₦{p.bonus}</td>
                <td className="p-2 border">₦{p.deductions}</td>
                <td className="p-2 border font-semibold text-green-700">
                  ₦{p.netSalary}
                </td>
                <td className="p-2 border">
                  {new Date(p.paymentDate).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
