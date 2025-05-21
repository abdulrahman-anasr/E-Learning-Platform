"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import axios from "axios";

const backend_url = "http://localhost:3001";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const redirectToSignUp = () => {
    redirect("/auth/login/");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    let status = 0;
    try {
      const response = await axios.post(
       ` ${backend_url}/auth/register`,
        { name: name, email: email, password_hash: password, role: role },
        { withCredentials: true }
      );
      status = response.status;
      console.log("Axios headers:" + response.headers);
      console.log("Status: " + status);
    } catch (err: any) {
      console.error("Register error:", err.response?.data?.message || err.message);
      alert("Register failed. Please check your credentials.");
    } finally {
      if (status === 201) {
        alert("Registered successfully. Please login.");
        redirectToSignUp();
      }
    }
  };

  return (
      <div className="bg-sky-100 flex justify-center items-center h-screen">
        {/* Fixed Image Section */}
        <div className="w-1/2 h-screen hidden lg:block relative">
          <Image
            src="/detailed.jpg"
            alt="login"
            fill
            style={{ objectFit: "cover" }} // Ensures the image covers the container
            priority // Prioritizes image loading
          />
        </div>

        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-3xl font-semibold mb-4">Register</h1>
          <form onSubmit={handleRegister}>
            <div className="mb-4 bg-sky-100">
              <label className="block text-gray-600">Username</label>
              <input
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                name="name"
                type="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800">Email</label>
              <input
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800">Password</label>
              <input
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-800">Role</label>
              <select
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Choose here</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Register
            </button>
          </form>
        </div>
      </div>
  );
}