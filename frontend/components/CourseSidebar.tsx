import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CookieValueTypes, getCookie } from "cookies-next";
import { Dispatch , SetStateAction } from "react";
import axios from "axios";

const CourseSidebar = ({courseId , forumId , data , enrolled} : {courseId : any , forumId : any , data : any , enrolled : boolean}) => {
  const userId = getCookie("userId");
  const [courses, setCourses] = useState([]);
  const role = getCookie("role");

  const forumReference = "http://localhost:3000/forum/" + forumId;
  const chatRoomReference = "http://localhost:3000/chatroom/" + courseId;
  useEffect(() => {
  }, []);
  
  return (
    <aside className="w-64 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg">
    <div className="p-6 border-b border-gray-700 text-2xl font-bold">
        Course Sidebar
    </div>
    <nav className="mt-6">
        <ul className="space-y-4">
            <li>
            <Link
                href={role === "instructor" ? "http://localhost:3000/auth/dashboardI/"+userId : "http://localhost:3000/auth/dashboardS/"+userId} 
                className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
                {role === "instructor" ? "Instructor Dashboard" : "Student Dashboard"}
            </Link>

            </li>
           {enrolled? 
           <>
            {data.map((module : any) => (
                <>
                    <li>
                        <Link
                        href={"http://localhost:3000/modules/" + module._id}
                        className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105">
                        📝 {module.title}
                        </Link>
                    </li>
                </>
            ))}
            <li>
                <Link
                    href={forumReference} // Correctly reference the forum ID
                    className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    🌐 Forum
                </Link>
            </li>
            <li>
            <Link
                    href={chatRoomReference} // Correctly reference the forum ID
                    className="block py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    💬 Chatrooms
                </Link>
            </li>
           </>
           :
           <>
           </>}
        </ul>
    </nav>
</aside>
  )

}

export default CourseSidebar