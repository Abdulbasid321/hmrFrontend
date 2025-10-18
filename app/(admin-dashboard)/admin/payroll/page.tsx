// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// // ✅ Define types for payroll data
// type Payroll = {
//   _id: string;
//   employee?: {
//     _id: string;
//     name: string;
//   };
//   month: string;
//   basicSalary: number;
//   bonus: number;
//   deductions: number;
//   netSalary: number;
//   paymentDate: string;
//   remarks?: string;
// };

// // ✅ Define types for form data
// type PayrollForm = {
//   employeeId: string;
//   month: string;
//   basicSalary: number;
//   bonus: number;
//   deductions: number;
//   remarks: string;
// };

// export default function AdminPayrollPage() {
//   const [payrolls, setPayrolls] = useState<Payroll[]>([]);
//   const [form, setForm] = useState<PayrollForm>({
//     employeeId: "",
//     month: "",
//     basicSalary: 0,
//     bonus: 0,
//     deductions: 0,
//     remarks: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch payroll records
//   useEffect(() => {
//     const fetchPayrolls = async () => {
//       try {
//         const res = await axios.get<{ payrolls: Payroll[] }>(
//           "http://localhost:5000/api/payrolls",
//           { withCredentials: true }
//         );
//         setPayrolls(res.data.payrolls);
//       } catch (err) {
//         console.error("Error fetching payrolls:", err);
//       }
//     };

//     fetchPayrolls();
//   }, []);

//   // ✅ Handle form submit
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5000/api/payrolls", form, {
//         withCredentials: true,
//       });
//       alert("✅ Payroll created successfully!");

//       // refresh list
//       const res = await axios.get<{ payrolls: Payroll[] }>(
//         "http://localhost:5000/api/payrolls",
//         { withCredentials: true }
//       );
//       setPayrolls(res.data.payrolls);

//       // reset form
//       setForm({
//         employeeId: "",
//         month: "",
//         basicSalary: 0,
//         bonus: 0,
//         deductions: 0,
//         remarks: "",
//       });
//     } catch (err) {
//       console.error("Error creating payroll:", err);
//       alert("❌ Failed to create payroll");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle input change with typing
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]:
//         e.target.type === "number" ? Number(value) : value,
//     });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-semibold mb-4">Payroll Management</h1>

//       {/* ✅ Payroll Form */}
//       <form onSubmit={handleSubmit} className="grid gap-3 mb-6 max-w-lg">
//         <input
//           name="employeeId"
//           placeholder="Employee ID"
//           value={form.employeeId}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           name="month"
//           placeholder="Month (e.g. September 2025)"
//           value={form.month}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           name="basicSalary"
//           placeholder="Basic Salary"
//           type="number"
//           value={form.basicSalary}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           name="bonus"
//           placeholder="Bonus"
//           type="number"
//           value={form.bonus}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <input
//           name="deductions"
//           placeholder="Deductions"
//           type="number"
//           value={form.deductions}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <textarea
//           name="remarks"
//           placeholder="Remarks"
//           value={form.remarks}
//           onChange={handleChange}
//           className="border p-2 rounded"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-sky-600 text-white py-2 rounded hover:bg-sky-700 disabled:bg-gray-400"
//         >
//           {loading ? "Saving..." : "Add Payroll"}
//         </button>
//       </form>

//       {/* ✅ Payroll Table */}
//       <table className="w-full text-sm border">
//         <thead className="bg-sky-100">
//           <tr>
//             <th className="p-2 border">Employee</th>
//             <th className="p-2 border">Month</th>
//             <th className="p-2 border">Basic</th>
//             <th className="p-2 border">Bonus</th>
//             <th className="p-2 border">Deductions</th>
//             <th className="p-2 border">Net Salary</th>
//             <th className="p-2 border">Payment Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {payrolls.length === 0 ? (
//             <tr>
//               <td colSpan={7} className="text-center py-4">
//                 No payroll records found
//               </td>
//             </tr>
//           ) : (
//             payrolls.map((p) => (
//               <tr key={p._id} className="border-t hover:bg-gray-50">
//                 <td className="p-2 border">{p.employee?.name || "—"}</td>
//                 <td className="p-2 border">{p.month}</td>
//                 <td className="p-2 border">₦{p.basicSalary}</td>
//                 <td className="p-2 border">₦{p.bonus}</td>
//                 <td className="p-2 border">₦{p.deductions}</td>
//                 <td className="p-2 border font-semibold text-green-700">
//                   ₦{p.netSalary}
//                 </td>
//                 <td className="p-2 border">
//                   {new Date(p.paymentDate).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";

// ✅ Types for payroll
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

type PayrollForm = {
  employeeId: string;
  employeeName: string; // optional to display
  month: string;
  basicSalary: number;
  bonus: number;
  deductions: number;
  remarks: string;
};

export default function AdminPayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [form, setForm] = useState<PayrollForm>({
    employeeId: "",
    employeeName: "",
    month: "",
    basicSalary: 0,
    bonus: 0,
    deductions: 0,
    remarks: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Load payrolls from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("payrolls");
    if (stored) setPayrolls(JSON.parse(stored));
  }, []);

  // ✅ Save payrolls to localStorage whenever they change
  const saveToLocalStorage = (data: Payroll[]) => {
    localStorage.setItem("payrolls", JSON.stringify(data));
  };

  // ✅ Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newPayroll: Payroll = {
      _id: Date.now().toString(),
      employee: {
        _id: form.employeeId,
        name: form.employeeName || "Employee " + form.employeeId,
      },
      month: form.month,
      basicSalary: form.basicSalary,
      bonus: form.bonus,
      deductions: form.deductions,
      netSalary: form.basicSalary + form.bonus - form.deductions,
      paymentDate: new Date().toISOString(),
      remarks: form.remarks,
    };

    const updatedPayrolls = [newPayroll, ...payrolls];
    setPayrolls(updatedPayrolls);
    saveToLocalStorage(updatedPayrolls);

    alert("✅ Payroll saved!");
    setForm({
      employeeId: "",
      employeeName: "",
      month: "",
      basicSalary: 0,
      bonus: 0,
      deductions: 0,
      remarks: "",
    });

    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: e.target.type === "number" ? Number(value) : value,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Payroll Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-3 mb-6 max-w-lg">
        <input
          name="employeeId"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="employeeName"
          placeholder="Employee Name"
          value={form.employeeName}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="month"
          placeholder="Month (e.g. October 2025)"
          value={form.month}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="basicSalary"
          placeholder="Basic Salary"
          type="number"
          value={form.basicSalary}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="bonus"
          placeholder="Bonus"
          type="number"
          value={form.bonus}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="deductions"
          placeholder="Deductions"
          type="number"
          value={form.deductions}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-600 text-white py-2 rounded hover:bg-sky-700 disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Add Payroll"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full text-sm border">
        <thead className="bg-sky-100">
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
                No payroll records
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
