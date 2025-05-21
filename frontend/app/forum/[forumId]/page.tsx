"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";

type User = {
  name: string;
  email: string;
  _id: string;
};

type Reply = {
  _id: string;
  content: string;
  createdBy: User; // Updated to include user details with name and email
  createdAt: string;
};

type Thread = {
  _id: string;
  threadTitle: string;
  content: string;
  username: string;
  email: string;
  createdBy: User;
  createdAt: string;
  replies: Reply[];
};

type Forum = {
  id: string;
  forumTitle: string;
};

const backend_url = "http://localhost:3001";

export default function ForumPage() {
  const { forumId } = useParams();
  const [forum, setForum] = useState<Forum | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [refresh , setRefresh] = useState(true);
  const [courseId , setCourseId] = useState("");
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [newThread, setNewThread] = useState({ title: "", content: "" });
  const [newReply, setNewReply] = useState({ threadId: "", content: "" });

  const userId = getCookie('userId'); // Get userId from cookies
  const role = getCookie('role'); // Get role from cookies

   // Assuming the username is stored in the cookie
    
      useEffect(() => {
        const fetchForumData = async () => {
          if (forumId) {
            try {
              const forumRes = await axios.get(`${backend_url}/forums/getForum/${forumId}`, {
                withCredentials: true,
              });
              setForum({
                id: forumRes.data._id,
                forumTitle: forumRes.data.forumTitle,
              });
              setCourseId(forumRes.data.course_id);
      
              const threadsRes = await axios.get(`${backend_url}/threads/by-forum/${forumId}`, {
                withCredentials: true,
              });
      
              const threadsWithReplies = await Promise.all(
                threadsRes.data.map(async (thread: any) => {
                  const username = thread.createdBy?.name || "Unknown User";
                  const email = thread.createdBy?.email || "No Email Provided";
                  try {
                    const repliesRes = await axios.get(
                      `${backend_url}/threads/getReplies?id=${thread._id}`,
                      { withCredentials: true }
                    );
                    return { ...thread, replies: repliesRes.data, username, email };
                  } catch (err) {
                    console.error(`Error fetching replies for thread ${thread._id}:`, err);
                    return { ...thread, replies: [], username, email };
                  }
                })
              );
      
              setThreads(threadsWithReplies);
              setFilteredThreads(threadsWithReplies);
            } catch (err) {
              console.error("Error fetching forum or threads:", err);
              setError("Failed to load forum or threads data.");
            }
          }
        };
      
        // Fetch user role and username from the backend
        
        if(refresh)
        {
          fetchForumData();
          setRefresh(false);
        }
      
      }, [forumId , refresh]);
      
  
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setError("");
  };

  const searchByTitle = () => {
    const result = threads.filter((thread) =>
      thread.threadTitle.toLowerCase().includes(search.toLowerCase())
    );

    if (result.length > 0) {
      setFilteredThreads(result);
    } else {
      setError("No threads found matching the title.");
    }
  };

  const handleCreateThread = async () => {
    if (!newThread.title || !newThread.content) {
      setError("Thread title and content are required.");
      return;
    }

    try {
      const res = await axios.post(
        `${backend_url}/threads/create`,
        {
          forum_id: forumId,
          threadTitle: newThread.title,
          content: newThread.content,
        },
        { withCredentials: true }
      );

      const createdThread = {
        ...res.data,
        replies: [],
        username: res.data.createdBy?.name || "Unknown User",
        email: res.data.createdBy?.email || "No Email Provided",
      };

      const newThreads = [...threads, createdThread];
      setThreads(newThreads);
      setFilteredThreads(newThreads);
      setNewThread({ title: "", content: "" });
      setRefresh(true);
    } catch (err) {
      console.error("Error creating thread:", err);
      setError("Failed to create thread.");
    }
  };
  const handleReply = async (threadId: string) => {
    if (!newReply.content) {
      setError("Reply content is required.");
      return;
    }

    try {
      const res = await axios.post(
        `${backend_url}/Reply/create`,
        { thread_id: threadId, content: newReply.content },
        { withCredentials: true }
      );

      const updatedThreads = threads.map((thread) =>
        thread._id === threadId ? { ...thread, replies: [...thread.replies, res.data] } : thread
      );

      setThreads(updatedThreads);
      setFilteredThreads(updatedThreads);
      setNewReply({ threadId: "", content: "" });
      setRefresh(true);
    } catch (err) {
      console.error("Error adding reply:", err);
      setError("Failed to add reply.");
    }
  };
  const handleEditReply = async (replyId: string) => {
    const newContent = prompt("Edit your reply content:");

    if (!newContent) {
      alert("You must provide content to update the reply.");
      return;
    }

    try {
      // Send the PUT request to update the reply
      await axios.put(
        `${backend_url}/Reply/update`,
        { reply_id: replyId, content: newContent },
        { withCredentials: true }
      );

      const updatedThreads = threads.map((thread) => ({
        ...thread,
        replies: thread.replies.map((reply) =>
          reply._id === replyId ? { ...reply, content: newContent } : reply
        ),
      }));

      setThreads(updatedThreads);
      setFilteredThreads(updatedThreads);
      setRefresh(true);

      alert("Reply updated successfully.");
    } catch (err) {
      console.error("Error editing reply:", err);
      alert("Failed to update reply. Please try again.");
    }
  };
  const handleEditThread = async (threadId: string) => {
    const newTitle = prompt("Edit your thread title:");
    const newContent = prompt("Edit your thread content:");

    if (!newTitle && !newContent) {
      alert("You must provide at least a title or content to update.");
      return;
    }

    try {
      await axios.put(
        `${backend_url}/threads/update/${threadId}`,
        {
          thread_id: threadId,
          threadTitle: newTitle || undefined,
          content: newContent || undefined,
        },
        { withCredentials: true }
      );

      setThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread._id === threadId
            ? { ...thread, threadTitle: newTitle || thread.threadTitle, content: newContent || thread.content }
            : thread
        )
      );
      setFilteredThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread._id === threadId
            ? { ...thread, threadTitle: newTitle || thread.threadTitle, content: newContent || thread.content }
            : thread
        )
      );
      setRefresh(true);
    } catch (err) {
      console.error("Error editing thread:", err);
      alert("Failed to update the thread. Please try again.");
    }
  };

  
  const handleDeleteThread = async (threadId: string) => {
    try {
      await axios.delete(`${backend_url}/threads/delete?id=${threadId}`, {
        withCredentials: true, // Ensure credentials (cookies) are sent with the request
      });
      setThreads((prevThreads) => prevThreads.filter((thread) => thread._id !== threadId));
      setFilteredThreads((prevThreads) => prevThreads.filter((thread) => thread._id !== threadId));
      setRefresh(true);
    } catch (err) {
      console.error("Error deleting thread:", err);
      alert("Failed to delete thread. Please try again.");
    }
  };
  

  
  
  

  
    const handleDeleteReply = async (replyId: string) => {
      try {
        await axios.delete(`${backend_url}/Reply/delete?id=${replyId}`, {
          withCredentials: true,
        });
        setThreads((prevThreads) =>
          prevThreads.map((thread) => ({
            ...thread,
            replies: thread.replies.filter((reply) => reply._id !== replyId),
          }))
        );
        setRefresh(true);
      } catch (err) {
        console.error("Error deleting reply:", err);
      }
    };

    if (!forum) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <p className="text-gray-600">{error || "Loading forum..."}</p>
        </div>
      );
    }
  
    return (
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-64 h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg fixed">
          <div className="p-6">
            <div className="border-b border-gray-700 text-2xl font-bold mb-4">Forum Navigation</div>
            <ul className="space-y-2">
              <li><a href={"http://localhost:3000/courses/" + courseId} className="text-gray-300 hover:text-white">Return to Course</a></li>
            </ul>
          </div>
        </aside>
  
        <main className="flex-1 ml-64 p-8 space-y-8">
          <header className="bg-white shadow p-6 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800">Forum: {forum?.forumTitle}</h1>
            <p className="text-gray-600">Browse threads or search for specific discussions below.</p>
          </header>
  
          {/* Search & Create Thread */}
          <section className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search & Create Threads</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Search threads"
                className="w-full px-4 py-2 border rounded-lg"
                value={search}
                onChange={handleSearch}
              />
              <button
                onClick={searchByTitle}
                className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Search
              </button>
              <input
                type="text"
                placeholder="Thread Title"
                className="w-full px-4 py-2 border rounded-lg"
                value={newThread.title}
                onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
              />
              <textarea
                placeholder="Thread Content"
                className="w-full px-4 py-2 border rounded-lg mt-2"
                rows={4}
                value={newThread.content}
                onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
              />
              <button
                onClick={handleCreateThread}
                className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Create Thread
              </button>
            </div>
          </section>
  
        {/* Threads List */}
<section className="bg-white shadow p-6 rounded-lg">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Threads</h2>
  <ul>
    {filteredThreads.map((thread) => (
      <li key={thread._id} className="border-b last:border-none pb-4 mb-4">
        <h3 className="text-lg font-bold text-blue-800">{thread.threadTitle}</h3>
        <p className="text-sm text-gray-600">
          Created by: {thread.username} ({thread.email}) • {new Date(thread.createdAt).toLocaleDateString()}
        </p>
        <p>{thread.content}</p>
        <div className="flex space-x-2 mt-2">
          {}
          {( thread.createdBy._id=== userId) && (
            <button onClick={() => handleEditThread(thread._id)} className="px-3 py-1 bg-blue-500 text-white rounded">
              Edit Thread
            </button>
          )}

          {/* Only show delete button if the user is the instructor */}
          {(role === "instructor" || thread.createdBy._id === userId )&&(
            <button onClick={() => handleDeleteThread(thread._id)} className="px-3 py-1 bg-red-500 text-white rounded">
              Delete Thread
            </button>
          )}
      

                  </div>
                  <ul className="mt-4 pl-4 border-l-2 border-gray-300">
                    {thread.replies.map((reply) => (
                      <li key={reply._id} className="mb-2">
                        <p className="text-sm text-gray-600">
                          {reply.createdBy.name} ({reply.createdBy.email}) • {new Date(reply.createdAt).toLocaleDateString()}
                        </p>
                        <p>{reply.content}</p>
                        <div className="flex space-x-2 mt-2">
                          
                          {( reply.createdBy._id === userId) && (
                            <button onClick={() => handleEditReply(reply._id)} className="px-3 py-1 bg-blue-500 text-white rounded">
                              Edit Reply
                            </button>
                          )}

                          {/* Only show delete button if the user is the instructor */}
                          {(role === "instructor" || reply.createdBy._id === userId) && (
                            <button onClick={() => handleDeleteReply(reply._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                              Delete Reply
                            </button>
                          )}
                        </div>

                      </li>
                    ))}
                  </ul>
                  <textarea
                    placeholder="Write a reply..."
                    className="w-full px-4 py-2 border rounded-lg mt-4"
                    value={newReply.threadId === thread._id ? newReply.content : ""}
                    onChange={(e) => setNewReply({ threadId: thread._id, content: e.target.value })}
                  />
                  <button
                    onClick={() => handleReply(thread._id)}
                    className="px-4 py-2 mt-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                  >
                    Reply
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    );
}    
