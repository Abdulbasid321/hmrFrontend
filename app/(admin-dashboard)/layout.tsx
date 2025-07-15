
// "use client";
// import React, { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30
//           transform transition-transform duration-300 ease-in-out
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:static
//         `}
//       >
//         <Sidebar closeSidebar={() => setSidebarOpen(false)} />
//       </aside>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <div className="sticky top-0 z-20 bg-white shadow-sm">
//           <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
//         </div>

//         {/* Scrollable page content */}
//         <div className="flex-1 overflow-y-auto">
//           <main className="p-4 sm:p-6 max-w-full w-full">
//             {children}
//           </main>
//         </div>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {isSidebarOpen && (
//         <div
//           aria-hidden="true"
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-10"
//         />
//       )}
//     </div>
//   );
// }


'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      router.push('/adminLogin');
    } else {
      setLoading(false); // allow rendering once auth passes
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Scrollable page content */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-4 sm:p-6 max-w-full w-full">
            {children}
          </main>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-10"
        />
      )}
    </div>
  );
}
