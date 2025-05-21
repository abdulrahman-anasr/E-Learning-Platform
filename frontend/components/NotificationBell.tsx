'use client'

import React, { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

const NotificationBell = ({ data }: { data: any }) => {
  const [opened, setOpened] = useState(false);
  let dataModified: any[] = [];
  let totalReads: number = 0;

  // Check if `data` is an array, if not default to an empty array
  const notifications = Array.isArray(data) ? data : [];

  notifications.forEach((item: any) => {
    console.log("Item id: " + item._id + " and read status is: " + item.read);
    if (item.read === false) {
      dataModified.push(item);
      totalReads++;
    }
  });

  let finalIcon: string = "";
  if (totalReads === 0) {
    finalIcon = "●";
  } else if (totalReads > 3) {
    finalIcon = "3+";
  } else {
    finalIcon = totalReads.toString();
  }

  dataModified = dataModified.slice(0, 3);

  const markAsRead = (notificationId: string) => (e: any) => {
    e.preventDefault();
    axios.patch('http://localhost:3001/notifications/' + notificationId, { read: true }, { withCredentials: true });
  };

  const redirectToNotification = (notificationId: string) => (e: any) => {
    e.preventDefault();
    redirect('http://localhost:3000/Notification/' + notificationId);
  };

  console.log("Data passed to Notification is: " + JSON.stringify(data));
  console.log("Data Modified is: " + JSON.stringify(dataModified));

  return (
    <>
      {opened ? (
        <>
        <button onClick={() => setOpened(false)} className="relative bg-teal-100 p-2 rounded-lg">
        <svg className="w-8 h-8 text-teal-600 animate-wiggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
            d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17" />
        </svg>
        <div className="px-1 py-0.5 bg-teal-500 min-w-5 rounded-full text-center text-white text-xs absolute -top-2 -end-1 translate-x-1/4 text-nowrap">
        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></div>
        {finalIcon}
        </div>
        </button>
        <div id="dropdown" className="z-10 overflow-visible bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {dataModified.map((item: any) =>
                <li key={item._id}>
                  <a onClick={redirectToNotification(item._id)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    {item.message}
                  </a>
                </li>
              )}
              <li key={'seeAll'}>
                <a onClick={redirectToNotification('')} className="block font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">See All</a>
              </li>
            </ul>
          </div>
        </>
      ) :
        <>
        <button onClick={() => setOpened(true)} className="relative bg-teal-100 p-2 rounded-lg">
        <svg className="w-8 h-8 text-teal-600 animate-wiggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
            d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17" />
        </svg>
        <div className="px-1 py-0.5 bg-teal-500 min-w-5 rounded-full text-center text-white text-xs absolute -top-2 -end-1 translate-x-1/4 text-nowrap">
        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></div>
        {finalIcon}
        </div>
        </button>
        </>
      }
    </>
  );
}

export default NotificationBell;
