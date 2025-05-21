"use client"
import Image from "next/image"; 
import { useEffect , useState } from "react";
import { getCookie } from "cookies-next";
import Navbar from "components/Navbar";

export default function Home() {
  const userId = getCookie("userId");
  const role = getCookie("role");

  useEffect(() => {
  }, []);

  return (
    <>
    <Navbar userId={userId} />
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col justify-between p-8 pb-20">
        <header className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
            Welcome to eLearners Academy
          </h1>
          <p className="text-lg sm:text-xl font-medium mb-6 text-white opacity-80">
            Your gateway to learning, mastering, and achieving.
          </p>
        </header>
        <main className="flex flex-col gap-8 items-center sm:items-start text-center sm:text-left">
          <p className="text-sm sm:text-base text-white opacity-70 mb-8">
            Get started today!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-center sm:justify-start">
            <a
              className="rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 text-white text-lg font-semibold py-3 px-8 transition-all transform hover:scale-105 hover:shadow-xl shadow-md flex items-center justify-center"
              href="/auth/register"
            >
              Register
            </a>

            <a
              className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 text-white text-lg font-semibold py-3 px-8 transition-all transform hover:scale-105 hover:shadow-xl shadow-md flex items-center justify-center"
              href="/auth/login"
            >
              Login
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 mb-4 text-sm text-white opacity-70">
          <p>&copy; {new Date().getFullYear()} eLearners Academy. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
}
