'use client'

import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function DashboardPortal() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch userId from cookies on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getCookie('userId');  // Ensure that userId is resolved as a string
      setUserId(userId as string | null);  // Update the state with the userId
    };

    fetchUserId();
  }, []);

  const handleViewDashboard = async (route: string) => {
    if (userId) {
      router.push(route.replace('[userid]', userId));  // Dynamically replace [userid] in the route
    } else {
      console.error('User ID is not available');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Portal</h1>
      <p className="mb-4">
        Enter your user ID in the URL query to access the dashboard.
      </p>

      {/* Ensure route is passed with the required [userid] placeholder */}
      <button
        onClick={() => handleViewDashboard('/dashboard/[userid]')}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Dashboard
      </button>

      {!userId && (
        <p className="mt-2 text-red-500">
          User ID is missing. Please provide a valid user ID in the URL query.
        </p>
      )}
    </div>
  );
}
