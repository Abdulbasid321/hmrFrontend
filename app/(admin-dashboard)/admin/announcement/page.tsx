"use client";
import { useState, useEffect } from "react";

// Announcement type
type Announcement = {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
};

export default function AdminAnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Load announcements from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("announcements");
    if (stored) setAnnouncements(JSON.parse(stored));
  }, []);

  // Save announcements to localStorage
  const saveToLocalStorage = (data: Announcement[]) => {
    localStorage.setItem("announcements", JSON.stringify(data));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !message) return alert("Fill both title and message");

    const newAnnouncement: Announcement = {
      _id: Date.now().toString(),
      title,
      message,
      createdAt: new Date().toISOString(),
    };

    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    saveToLocalStorage(updated);

    setTitle("");
    setMessage("");
    alert("✅ Announcement created!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Create Announcement</h1>

      <form onSubmit={handleSubmit} className="grid gap-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-sky-600 text-white py-2 rounded hover:bg-sky-700"
        >
          Create
        </button>
      </form>

      <h2 className="text-lg font-semibold mb-2">All Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements yet</p>
      ) : (
        <ul className="space-y-2">
          {announcements.map((a) => (
            <li
              key={a._id}
              className="border p-2 rounded hover:bg-gray-50"
            >
              <strong>{a.title}</strong>
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
