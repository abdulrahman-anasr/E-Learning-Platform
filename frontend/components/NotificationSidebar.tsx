"use client"

import React, { useState } from 'react'
import Link from "next/link";

const NotificationSidebar = ({ data }: { data: any }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    }

    // Ensure `data` is always an array, default to an empty array if not
    const notifications = Array.isArray(data) ? data : [];

    const reference = 'http://localhost:3000/Notification';
    return (
        <aside className="w-64 bg-gradient-to-br from-blue-900 to-gray-900 text-white shadow-lg">  
            <div className="p-6 border-b border-gray-700 text-2xl font-bold">
                Your Notifications
            </div>
            <nav className="mt-6">
                <ul className="space-y-4">
                    {notifications.map((item: any) => (
                        <li key={item._id}>
                            {item.read === true ? (
                                <Link
                                    href={reference + "/" + item._id}
                                    className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    {item.message.split(" ").slice(0, 4).join(" ")}
                                </Link>
                            ) : (
                                <Link
                                    href={reference + "/" + item._id}
                                    className="block py-3 px-4 bg-gray-700 text-red-300 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    {item.message.split(" ").slice(0, 4).join(" ")} ●
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default NotificationSidebar;
