// pages/admin/create-notification.tsx

'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import axios from 'axios';

export default function CreateNotification() {
    const path = usePathname().split('/');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
const userId=getCookie("userId");
const getAdminData = async () => {
    const admin = path[path.length - 1];
    const res = await fetch('http://localhost:3001/users/fetch/' + admin, { credentials: 'include' });
    return res.json();
  };
  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!message) {
      setError('Please enter a message.');
      return;
    }
  
    try {
      const res = await axios.post(
        'http://localhost:3001/notifications/create-for-all',
        { message: message }, // Pass the object directly
        { withCredentials: true }
      );
  
      if (res.data.success) {
        // Notification successfully created
        router.push('/auth/dashboardA/admin'); // Redirect to admin dashboard after success
      } else {
        // If success is false, show error message
        setError(res.data.message || 'Failed to create notification.');
      }
    } catch (err) {
      console.error('Error sending notification:', err);
      setError('An error occurred while sending the notification.');
    }
  };
  
  

  return (
    <div className="container">
      <h1 className="text-3xl font-bold">Create Notification</h1>
      <form onSubmit={handleSubmit} className="mt-6">
        {error && <div className="text-red-500">{error}</div>}

        <textarea
          placeholder="Enter notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 border rounded"
          rows={4}
        ></textarea>

        <button
          type="submit"
          className="mt-4 py-2 px-6 bg-blue-600 text-white rounded"
        >
          Send Notification
        </button>
      </form>
    </div>
  );
}
