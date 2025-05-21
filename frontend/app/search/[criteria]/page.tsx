"use client"
import React from 'react';
import { useEffect , useState } from "react";
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';
import Navbar from 'components/Navbar';



export default function Search() {
    const path = usePathname().split('/');

    const userId = getCookie("userId");
    const role = getCookie("role");
    const[loading , setLoading] = useState(true);

    const search = path[path.length - 1];
    const [data , setData] = useState([{
        _id : "",
        title : "Test Module",
        description : "Test Content",
    }]);

    const redirectToCourse = (courseId : string) => {
        redirect('http://localhost:3000/courses/' + courseId);
    }

    useEffect(() => {
        console.log("Search is: " + search);

        fetch('http://localhost:3001/courses/search?query=' + search , {credentials : 'include'}).then(response => response.json()).then(dataJson => {
            setData(dataJson);
            console.log("Data is: " + dataJson);
        }).finally(() => {
            setLoading(false);
        })
    }, [loading]);

    console.log("Path is: " + search);
    return (
        <>
        <Navbar userId={userId}/>
        <div className="flex flex-col items-center justify-center pt-5">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">Search Results</h1>
        </div>
        
        {/* Display Question Banks */}
        {loading? 
        <>
        <div className="flex flex-col items-center justify-center pt-5">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">Loading...</h1>
        </div>
        </> 
        : 
        <>
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((course) => (
             <button
             onClick={() => redirectToCourse(course._id)}
             key={course._id}
             className="border rounded-lg shadow-md p-4 bg-gray-800 text-white"
           >
             <h2 className="text-xl font-semibold mb-2">Course</h2>
             <p>
               <strong>Title:</strong> {course.title}
             </p>
             <p>
               <strong>Question:</strong> {course.description}
             </p>
           </button>

        ))}
        </div>
        </>}
        
        </>
    )
}