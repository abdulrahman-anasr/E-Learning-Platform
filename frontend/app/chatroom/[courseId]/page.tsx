'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams, usePathname, redirect } from 'next/navigation';
import ModuleSidebar from 'components/ModuleSidebar';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import CourseSidebar from 'components/CourseSidebar';
import CreateModule from 'components/CreateModule';
import { get } from 'http';
import Navbar from 'components/Navbar';
import CreateRoom from 'components/CreateRoom';

export default function ChatRoom() {
    axios.defaults.withCredentials = true
    const path = usePathname().split('/');

    const courseId = path[path.length - 1];

    const userId = getCookie('userId');
    const role = getCookie("role");
    const [course, setCourse] = useState<any>(null); // State to hold the course data
    const [forumId, setForumId] = useState('');
    const [chatrooms , setChatrooms] = useState([{
        "_id" : "",
        "name" : "sasa",
        "user_id" : [userId],
    }]);
    const [modules , setModules] = useState([]);
    const [enrolled , setEnrolled] = useState(false);
    const [refresh , setRefresh] = useState(true);

    const joinRoom = async (roomName : any) => {
        redirect("http://localhost:3000/chat/" + roomName);
    }

    useEffect(() => {

        if(refresh)
        {
            if(role === "student")
                {
                  const fetchUserDetails = async () => {
                    const response = await fetch('http://localhost:3001/users/fetchme' , {credentials : 'include'});
                    const dataJson = await response.json();
                    const userCourses = dataJson.courses;
                    if(userCourses.includes(courseId))
                    {
                        console.log("Student is Enrolled");
                      setEnrolled(true);
                    }
                    else
                    {
                        console.log("Student is not Enrolled");
                        setEnrolled(false);
                    }
                };
      
                fetchUserDetails();
                }
    
            const fetchForum = async () => {
                try {
                const response = await axios.get(`http://localhost:3001/courses/forum/${courseId}` , {withCredentials : true});
                console.log("Forum fetched!!");
                  setForumId(response.data);
                } catch (error) {
                  console.error(error);
                }
              };
    
              fetchForum();

              const fetchModules = async () => {
                try {
                const response = await fetch('http://localhost:3001/modules/getmodules/' + courseId , {credentials : 'include'});
                const dataJson = await response.json();
                setModules(dataJson);
                } catch (error) {
                  console.log(error);
                }
              }
  
              fetchModules();

            const fetchRooms = async () => {
                try {
                const response = await fetch('http://localhost:3001/courses/rooms/' + courseId , {credentials : 'include'});
                const dataJson = await response.json();
                console.log("Rooms fetched data:" + JSON.stringify(dataJson));
                setChatrooms(dataJson);
                } catch (error) {
                  console.log(error);
                }
              }
  
              fetchRooms();

              setRefresh(false);
        }
    }, [refresh]);
    console.log("User ID in chat is: " + userId);
    return(
        <>
        <div className="flex min-h-screen bg-gray-50">
        <CourseSidebar courseId={courseId} forumId={forumId} data={modules} enrolled={enrolled} />
        <div className="course-details-content">
            <p><strong className='text-gray-900 text-3xl'>Chatrooms</strong></p>
            <section className="">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Chatrooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                chatrooms? 
                <>
                {chatrooms.map((room) => (
                <div key={room._id} className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition transform hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
                  <button onClick={() => joinRoom(room.name)}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Join</button>
                </div>
              ))}
                </>:
                <></>
              }
            </div>
          </section>
            <CreateRoom courseId={courseId} userId={userId} setRefresh={setRefresh} />
        </div>
        
        <style jsx>{`
                .course-details-container {
                    display: flex;
                    justify-content: flex-start;
                    gap: 2rem;
                    padding: 2rem;
                    background-color: #f9f9f9;
                }

                .sidebar-container {
                    width: 300px;
                    background-color: #fff;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 1rem;
                    border-radius: 8px;
                }

                .course-details-content {
                    flex-grow: 1;
                    background-color: #fff;
                    padding: 2rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .course-details-content h1 {
                    font-size: 2.5rem;
                    color: #333;
                    margin-bottom: 1.5rem;
                }

                .course-details-content p {
                    font-size: 1.125rem;
                    line-height: 1.6;
                    color: #555;
                    margin-bottom: 1rem;
                }

                .course-details-content strong {
                    font-weight: 600;
                }

                @media (max-width: 768px) {
                    .course-details-container {
                        flex-direction: column;
                        padding: 1rem;
                    }

                    .sidebar-container {
                        width: 100%;
                        margin-bottom: 2rem;
                    }

                    .course-details-content {
                        width: 100%;
                    }
                }
            `}</style>
            </div>
        </>
    )
}