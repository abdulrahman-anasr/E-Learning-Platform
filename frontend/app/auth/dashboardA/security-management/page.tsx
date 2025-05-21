'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from 'components/Navbar'; // Import Navbar component
import { getCookie } from 'cookies-next/client';

type FailedLoginAttempt = {
  id: number;
  email: string;
  reason: string;
  createdAt: string;
};

export default function SecurityManagement() {
  const [failedAttempts, setFailedAttempts] = useState<FailedLoginAttempt[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFailedAttempts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/failed-logins', {
          withCredentials: true,
        });

        // Transform the response data
        setFailedAttempts(
          response.data.map((log: any, index: number) => ({
            id: index + 1,
            email: log.email,
            reason: log.reason,
            createdAt: log.createdAt,
          }))
        );
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };

    fetchFailedAttempts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  const userId = getCookie('userId');

  return (
    <>
      {/* Navbar added here */}
      <Navbar userId={userId}/>

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg">
          <div className="p-6 border-b border-gray-700 text-2xl font-bold">Admin Dashboard</div>
          <nav className="mt-6">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/auth/dashboardA/admin"
                  className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  ⬅ Back to Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Security Management</h1>
            <p className="text-gray-600">View failed login attempts and unauthorized access attempts.</p>
          </header>

          {/* Failed Login Attempts Table */}
          <section className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Failed Login Attempts</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Email
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Reason
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {failedAttempts.map((attempt) => (
                    <tr key={attempt.id}>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{attempt.email}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{attempt.reason}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {new Date(attempt.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
