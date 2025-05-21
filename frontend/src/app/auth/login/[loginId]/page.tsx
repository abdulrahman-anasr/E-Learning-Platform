/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from 'next/navigation';
import axios from "axios";
import Image from 'next/image';

const backend_url = "http://localhost:3001";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const redirectToSignUp = () => {
    redirect("/auth/register/signup");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Entered function");
      console.log("Email: " + email + " and password: " + password);
      const response = await axios.post(`${backend_url}/auth/login`, { email, password }, { withCredentials: true });
      console.log("Finished fetch data");
      console.log(response);

      const status = response.status;
      const userId = response.headers['userId'];
      const token = response.headers['token'];

      console.log("Axios headers:" + response.headers);

      console.log("Status: " + status);
      console.log("User ID: " + userId);
      console.log("Token: " + token);

      if (status === 201) {
        console.log("Login successful");
        // Redirect logic or additional actions here
      } else {
        console.log("Unexpected response:", response);
      }
    } catch (err: any) {
      console.error("Login error:", err.response?.data?.message || err.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="bg-sky-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <div className="relative w-full h-full">
            <Image
              className="object-cover"
              src="/detailed.jpg"
              alt="login"
              layout="fill" // Automatically fills the container
            />
          </div>
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-3xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleLogin}>

            <div className="mb-4 bg-sky-100">
              <label className="block text-gray-600">Username</label>
              <input
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
          </form>

          <div className="mt-6 text-green-500 text-center">
            <a className="hover:underline" onClick={redirectToSignUp}>Sign up Here</a>
          </div>
        </div>
      </div>
    </>
  );
}
