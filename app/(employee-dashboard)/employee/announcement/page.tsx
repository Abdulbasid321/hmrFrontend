"use client";
import { useState, useEffect } from "react";

// Announcement type (same as admin)
type Announcement = {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
};

export default function EmployeeAnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Load all announcements from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("announcements");
    if (stored) setAnnouncements(JSON.parse(stored));
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Announcements</h1>

      {announcements.length === 0 ? (
        <p>No announcements available</p>
      ) : (
        <ul className="space-y-3">
          {announcements.map((a) => (
            <li
              key={a._id}
              className="border p-3 rounded hover:bg-gray-50"
            >
              <strong className="block mb-1">{a.title}</strong>
              <p>{a.message}</p>
              <small className="text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
