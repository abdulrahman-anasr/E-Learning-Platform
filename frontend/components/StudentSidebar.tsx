import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";

const StudentSidebar = () => {
  const userId = getCookie("userId");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  }, []);

  return (
    <aside className="w-64 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg">
    <div className="p-6 border-b border-gray-700 text-2xl font-bold">
      Student Dashboard
    </div>
    <nav className="mt-6">
      <ul className="space-y-4">
        <li>
          <Link
            href="#"
            className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            🏫 My Courses
          </Link>
        </li>
        <li>
          <button
            className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            ✏ Edit Profile
          </button>
        </li>
      </ul>
    </nav>
  </aside>
  )
}

export default StudentSidebar;