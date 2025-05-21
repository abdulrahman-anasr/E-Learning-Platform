import React from 'react';
import Link from 'next/link';

const AdminSidebar = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="p-6 border-b border-gray-700 text-2xl font-bold">Admin Dashboard</div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <Link
                href="/courses"
                className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                📚 Manage Courses
              </Link>
            </li>
            <li>
              <Link
                href="/auth/dashboardA/manage-users"
                className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                🧑 Manage Users
              </Link>
            </li>
            <li>
              <Link
                href="/auth/dashboardA/security-management"
                className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                🔐 Security Management
              </Link>
            </li>
            <li>
              <Link
                href="/auth/dashboardA/create-notification"
                className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                📢 Send Notifications
              </Link>
            </li>
            <li>
              <Link
                href="/progress/rate"
                className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                ⭐ View Ratings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default AdminSidebar;
