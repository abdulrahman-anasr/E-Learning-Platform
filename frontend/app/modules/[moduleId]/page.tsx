'use client'
import { Dispatch , SetStateAction } from "react";
import { redirect } from "next/navigation";
import { usePathname } from 'next/navigation'
import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next/client';
import { useEffect, useState } from "react";
import ModuleSidebar from "components/ModuleSidebar";
import ModuleContent from "components/ModuleContent";
import CourseNotes from "components/CourseNotes";
import NotificationBell from "components/NotificationBell";
import FileUpload from "components/FileUpload";
import Navbar from "components/Navbar";
import { set } from "mongoose";
import CreateQuestion from "components/QuestionBank";
import EditModule from "components/EditModule";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

export default function Home()
{
    const path = usePathname().split('/');

    const [data, setData] = useState({
        title: "Test Module",
        content: "Test Content",
        resources: ["test.pdf"],
        difficulty: "Easy",
        valid_content: true,
        course_id: "null",
        statusCode: 200,
    });

    const [foundData , setFoundData] = useState(false);

    const [refreshNotes , setRefreshNotes] = useState(true);

    const [refreshContent , setRefreshContent] = useState(true);

    const [notes, setNotes] = useState([]);

    const [course , setCourse] = useState({
        "_id" : "",
        "created_by" : "",
    });

    const [quizzes , setQuizzes] = useState([]);

    const [notifications, setNotifications] = useState([]);

    const [loading , setLoading] = useState(true);

    const [compatible , setCompatible] = useState(false);

    const [userDetails , setUserDetails] = useState({
        name : "",
        courses : ["" , ""],
        role : ""
    });
    
    let moduleId : string = path[path.length - 1];

    console.log("Module ID Outside UseEffect is: " + moduleId);

    let userId = getCookie("userId");
    let token = getCookie("token");
    let role = getCookie("role");

    console.log("User ID is: " + userId);
    console.log("Token is: " + token);

    
    useEffect(() => {
        console.log("Module ID is: " + moduleId);

        if(refreshContent)
        {
            async function getData() {
                try {
                    const response = await fetch('http://localhost:3001/modules/get/' + moduleId , {credentials : 'include'});
                    const dataJson = await response.json();
                    setData(dataJson);
                    setFoundData(true);
                } catch (error) {
                    console.log(error);
                }
                }
        
            getData();
            setRefreshContent(false);
        }


        if(refreshNotes)
        {
            setRefreshNotes(false);
            
            async function getNotes() {
                try {
                    const response = await fetch('http://localhost:3001/notes/getAll' , {credentials : 'include'});
                    const dataJson = await response.json();
                    setNotes(dataJson);
                } catch (error) {
                    console.log(error);
                }
            }

            getNotes();

            
        }
        

        if(foundData)
        {
            async function getCourse() {
                try {
                    const response = await fetch('http://localhost:3001/courses/' + data.course_id , {credentials : 'include'});
                    const dataJson = await response.json();
                    setCourse(dataJson);
                    setFoundData(true);
                } catch (error) {
                    console.log(error);
                }
            }
    
            getCourse();

            async function getUserDetails() {
                try {
                    const response = await fetch('http://localhost:3001/users/fetchme' , {credentials : 'include'});
                    const dataJson = await response.json();
                    setUserDetails(dataJson);
                } catch (error) {
                    console.log(error);
                }
            }
    
            getUserDetails();
            
            if(role === "student")
            {
                console.log("entering student");
                async function getCompatibility() {
                    try {
                        const response = await fetch('http://localhost:3001/modules/performancelevel/' + moduleId , {credentials : 'include'});
                        const dataJson = await response.json();
                        setCompatible(dataJson);
                    } catch (error) {
                        console.log(error);
                    }
                }
        
                getCompatibility();
            }

            async function getQuizzes() {
                try {
                    const response = await fetch('http://localhost:3001/quiz/getquizzesofmodule/' + moduleId , {credentials : 'include'});
                    const dataJson = await response.json();
                    setQuizzes(dataJson);
                } catch(error) {
                    console.log(error);
                }
            }

            getQuizzes();

            setRefreshContent(false);
        }

        setLoading(false);

    }, [foundData , refreshNotes , refreshContent]);

    const downloadFile = (fileName: string) => {
        redirect("http://localhost:3001/modules/download/" + moduleId + "/" + fileName);
    }

    console.log("Data is: " + JSON.stringify(data));
    console.log("User ID is: " + userId  + " and Course details is: " + JSON.stringify(course));
    console.log("User Details is: " + JSON.stringify(userDetails));
    console.log("Quizzes is: " + JSON.stringify(quizzes));
    console.log("Compatibility is: " + compatible);
    return (
        <>
        {!loading && !userId ? 
        <>
        <Navbar userId={userId}/>
        <main className="flex-1 p-8">
        <div className="flex flex-col items-center justify-center pt-5">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">Please Login to View this Module.</h1></div></main>
        </> 
        : 
        <>
        {loading ? <div className="flex min-h-screen bg-gray-50">
        <ModuleSidebar courseId={data.course_id} data={quizzes}  moduleId={moduleId} created_by={course.created_by} />
        <main className="flex-1 p-8">
        <div className="flex flex-col items-center justify-center pt-5">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">Loading...</h1></div></main>
        </div> :
                <>
                {role === "student" ? 
                        <>
                        <Navbar userId={userId} />
                        
                        {userDetails.courses.includes(course._id) ? 
                        <>
                        <div className="flex min-h-screen bg-gray-50">
                        <ModuleSidebar courseId={data.course_id} data={quizzes}  moduleId={moduleId} created_by={course.created_by} />
                        <main className="flex-1 p-8">
                         <div className="flex flex-col items-left justify-left pl-3 pt-3">
                        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
                        <h3 className="mb-4 text-2xl font text-gray-600">Description: </h3>
                        <p className="text-1xl font-italic text-gray-600">{data.content}</p>
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-500">
                            <strong>Module ID:</strong> {moduleId}
                        </p>
                        <div className="h-screen dark:bg-gray-800">
                
                        <div className="py-6 px-3 lg:grid lg:grid-cols-2 lg:gap-8">
                        {compatible? 
                        <>
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <span className="font-medium">You're Qualified to Complete This Module!</span>
                        </div>
                        </> 
                        : 
                        <>
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">You're Not Qualified to Complete this Module</span>
                        </div>
                        </>}
                        {
                            
                            data ? <ModuleContent moduleId={moduleId} data={data.resources} role={role} setRefresh={setRefreshNotes} /> : <p>No Data Found</p>
                        }
                        </div>
                        </div>
                        </main>
                        </div>
                        </> 
                        : 
                        <> <div className="flex flex-col items-center justify-center pt-5">
                        <h1 className="mb-4 text-3xl font-bold text-gray-800">Module does not exist or you are not authorized to view it</h1></div></>
                        }
                        </>
            :
                        <>
                        <Navbar userId={userId}/>
                        <div className="flex min-h-screen bg-gray-50">
                        <ModuleSidebar courseId={data.course_id} data={quizzes} moduleId={moduleId} created_by={course.created_by} />
                        <main className="flex-1 p-8">
                        {course.created_by !== userId ? 
                        <> <div className="flex flex-col items-center justify-center pt-5">
                        <h1 className="mb-4 text-3xl font-bold text-gray-800">You are not the Author of this Module</h1></div></> :
                        <>
                        <div className="flex flex-col items-left justify-left pl-3 pt-3">
                        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
                        <h3 className="mb-4 text-2xl font text-gray-600">Description: </h3>
                        <p className="text-1xl font-italic text-gray-600">{data.content}</p>
                        </div>
        
                        <div className="h-screen dark:bg-gray-800">
        
                        <div className="py-6 px-3 lg:grid lg:grid-cols-2 lg:gap-8">
                        {
                            
                            data ? <ModuleContent moduleId={moduleId} data={data.resources} role={role} setRefresh={setRefreshContent} /> : <p>No Data Found</p>
                        }

                        <EditModule title={data.title} content={data.content} difficulty={data.difficulty} course_id={data.course_id} module_id={moduleId} setRefresh={setRefreshContent} />
                        </div>
                        </div>
                        </> }
                        </main>
                        </div>
                        </>
            }
                </>}
        </>}
        </>
    );
}