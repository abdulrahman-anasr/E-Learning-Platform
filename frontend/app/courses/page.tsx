"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import "./app.css";
import { toast, ToastContainer } from "react-toastify";
import StudentSidebar from "components/StudentSidebar";
import InstructorSidebar from "components/InstructorSidebar";
import CreateCourse from "components/CreateCourse";
import AdminSidebar from "components/AdminSideBar";
import { redirect } from "next/navigation";

const CoursePage = () => {
    axios.defaults.withCredentials = true;

    interface Course {
        _id: string;
        title: string;
        description: string;
        category: string;
        difficulty_level: "Beginner" | "Intermediate" | "Advanced";
        created_by: string;
        created_at: Date;
        available: boolean; // Track availability for soft delete
        versions?: any[]; // Versions array
        students?: any[]; // Students array
    }

    const [Courses, setCourses] = useState<Course[]>([]);
    const [isStudent, setIsStudent] = useState(false);
    const [isInstructor, setIsInstructor] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userId = getCookie("userId");
    const role = getCookie("role");

    const redirectToCourse = (courseId: string) => {
        redirect("http://localhost:3000/courses/" + courseId);
    };

    useEffect(() => {
        if (role === "student") {
            setIsStudent(true);
        } else if (role === "instructor") {
            setIsInstructor(true);
        } else if (role === "admin") {
            setIsAdmin(true);
        } else {
            setError("You are not authorized to view this page.");
        }

        const fetchUserSpecificCourses = async () => {
            try {
                if (role === "student") {
                    const response = await axios.get(
                        `http://localhost:3001/users/fetch/${userId}`,
                        { withCredentials: true }
                    );
                    const studentData = await response.data.courses;
                    const courses = await axios.get(
                        `http://localhost:3001/courses/getAll`,
                        { withCredentials: true }
                    );
                    const filteredCourses = courses.data.filter(
                        (course: any) =>
                            studentData.includes(course._id) && course.available
                    );
                    setCourses(filteredCourses);
                }

                if (role === "instructor") {
                    const courses = await axios.get(
                        `http://localhost:3001/courses/getAll`,
                        { withCredentials: true }
                    );
                    const filteredCourses = courses.data.filter(
                        (course: any) => course.created_by === userId
                    );
                    setCourses(filteredCourses);
                }

                if (role === "admin") {
                    const courses = await axios.get(
                        `http://localhost:3001/courses/getAll`,
                        { withCredentials: true }
                    );
                    setCourses(courses.data);
                }
            } catch (error) {
                console.error("Error fetching user-specific courses:", error);
            }
        };

        if (userId && refresh) {
            fetchUserSpecificCourses();
            setRefresh(false);
        }
    }, [userId, refresh, role]);

    const deleteCourse = async (courseId: string) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/courses/${courseId}`,
                { withCredentials: true }
            );
            toast.success("Course marked as unavailable successfully!");

            // Update the course availability in the frontend
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course._id === courseId ? { ...course, available: false } : course
                )
            );
        } catch (error) {
            console.error("Error marking course as unavailable:", error);
            toast.error("Failed to mark the course as unavailable.");
        }
    };

    return (
        <>
            {role === "student" ? (
                <div className="course-page-container flex">
                    <StudentSidebar />
                    <div className="course-content-container flex-grow p-6">
                        <h1 className="title" style={{ marginTop: "1rem", marginBottom: "1rem", fontSize: "2rem", fontWeight: "bold" }}>Courses</h1>
                        <div className="header-container"></div>
                        <div className="course-cards-container">
                            {Courses.map((course) => (
                                <button
                                    onClick={() => redirectToCourse(course._id)}
                                    key={course._id}
                                    className={`course-card ${!course.available ? "unavailable" : ""}`}
                                    style={{ opacity: course.available ? 1 : 0.5 }}
                                >
                                    <h3>{course.title}</h3>
                                    <p>
                                        <strong>Description:</strong> {course.description}
                                    </p>
                                    <p>
                                        <strong>Category:</strong> {course.category}
                                    </p>
                                    <p>
                                        <strong>Difficulty Level:</strong> {course.difficulty_level}
                                    </p>
                                    <p>
                                        <strong>Created By:</strong> {course.created_by}
                                    </p>
                                    <p>
                                        <strong>Created At:</strong>{" "}
                                        {new Date(course.created_at).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Available:</strong> {course.available ? "Yes" : "No"}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            ) : role === "instructor" ? (
                <div className="course-page-container flex">
                    <InstructorSidebar />
                    <div className="course-content-container flex-grow p-6">
                        <h1 className="title" style={{ marginTop: "1rem", marginBottom: "1rem", fontSize: "2rem", fontWeight: "bold" }}>My Courses</h1>
                        <div className="header-container"></div>
                        <div className="course-cards-container">
                            {Courses.map((course) => (
                                <button
                                onClick={() => redirectToCourse(course._id)}
                                key={course._id}
                                className={`course-card ${!course.available ? "unavailable" : ""}`}
                                style={{ opacity: course.available ? 1 : 0.5 }}
                            >
                                    <h3>{course.title}</h3>
                                    <p><strong>Description:</strong> {course.description}</p>
                                    <p><strong>Category:</strong> {course.category}</p>
                                    <p><strong>Difficulty Level:</strong> {course.difficulty_level}</p>
                                    <p><strong>Created At:</strong> {new Date(course.created_at).toLocaleDateString()}</p>
                                    <p><strong>Available:</strong> {course.available ? "Yes" : "No"}</p>
                                    <p><strong>Students:</strong> {course.students?.length ? course.students.join(", ") : "None"}</p>
                                    {course.available && (
                                        <button onClick={() => deleteCourse(course._id)} className="details-button py-2">
                                            Mark as Unavailable
                                        </button>
                                    )}
                                </button>
                            ))}
                        </div>
                        <CreateCourse userId={userId} setRefresh={setRefresh} />
                        <ToastContainer />
                    </div>
                </div>
            ) : role === "admin" ? (
                <div className="course-page-container flex">
                    <AdminSidebar />
                    <div className="course-content-container flex-grow p-6">
                        <h1 className="title" style={{ marginTop: "1rem", marginBottom: "1rem", fontSize: "2rem", fontWeight: "bold" }}>Admin - All Courses</h1>
                        <div className="header-container"></div>
                        <div className="course-cards-container">
                            {Courses.map((course) => (
                                <div key={course._id} className={`course-card ${!course.available ? "unavailable" : ""}`} style={{ opacity: course.available ? 1 : 0.5 }}>
                                    <h3>{course.title}</h3>
                                    <p><strong>Description:</strong> {course.description}</p>
                                    <p><strong>Category:</strong> {course.category}</p>
                                    <p><strong>Difficulty Level:</strong> {course.difficulty_level}</p>
                                    <p><strong>Created By:</strong> {course.created_by}</p>
                                    <p><strong>Created At:</strong> {new Date(course.created_at).toLocaleDateString()}</p>
                                    <p><strong>Available:</strong> {course.available ? "Yes" : "No"}</p>
                                    <p><strong>Students:</strong> {course.students?.length ? course.students.join(", ") : "None"}</p>
                                    {course.available && (
                                        <button onClick={() => deleteCourse(course._id)} className="details-button py-2">
                                            Mark as Unavailable
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default CoursePage;
