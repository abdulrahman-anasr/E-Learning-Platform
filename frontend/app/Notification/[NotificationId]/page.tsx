'use client'

import React, { useEffect, useState } from "react";
import NotificationSidebar from "components/NotificationSidebar";
import { getCookie } from 'cookies-next/client';
import { usePathname } from "next/navigation";
import axios from 'axios';

export default function Home() {
    const path = usePathname().split('/');

    const [data, setData] = useState([]);
    const [currentNotification, setCurrentNotification] = useState({
        "message": "",
        "createdAt": "",
        "Error": ""
    });

    const userId = getCookie("userId");
    const token = getCookie("token");

    const notificationId: string = path[path.length - 1];

    useEffect(() => {
        fetch('http://localhost:3001/notifications/', { credentials: 'include' })
            .then(response => response.json())
            .then(dataJson => {
                setData(dataJson);
                console.log("Data is: " + dataJson);
            });

        fetch('http://localhost:3001/notifications/getNotification/' + notificationId, { credentials: 'include' })
            .then(response => response.json())
            .then(dataJson => {
                setCurrentNotification(dataJson);
            });
    }, [notificationId]);

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                <NotificationSidebar data={data} />
                <main className="flex-1 p-8">
                    <div className="flex flex-col items-left justify-left pl-3 pt-3">
                        <h1 className="text-3xl font-bold text-gray-800">{currentNotification.message}</h1>
                        <h3 className="mb-4 text-2xl font text-gray-600">Notification Date: </h3>
                        {/* Check if currentNotification.createdAt exists and is valid */}
                        <p className="text-1xl font-italic text-gray-600">
                            {currentNotification.createdAt ? currentNotification.createdAt.split("T")[0] : "Date not available"}
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
