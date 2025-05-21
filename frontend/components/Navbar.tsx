"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Using next/navigation for Next.js 13+
import { getCookie } from "cookies-next";
import NotificationBell from "./NotificationBell";

const Navbar = ({ userId }: { userId: any }) => {
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: "",
  });
  const [url, setUrl] = useState("");

  const [isClient, setIsClient] = useState(false);
  const role = getCookie("role");
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    if (userId) {
      fetch("http://localhost:3001/users/fetchme", { credentials: "include" })
        .then((response) => response.json())
        .then((dataJson) => {
          setUserDetails(dataJson);
          if (role === "student") {
            setUrl("http://localhost:3000/auth/dashboardS/student");
          } else if(role=== "instructor") {
            setUrl("http://localhost:3000/auth/dashboardI/instructor");
          }
          else
          {
            setUrl("http://localhost:3000/auth/dashboardA/admin");
          }

        });

      fetch("http://localhost:3001/notifications/", { credentials: "include" })
        .then((response) => response.json())
        .then((dataJson) => {
          setData(dataJson);
        });
    }

    setUrl("http://localhost:3000/auth/login");
  }, []);

  const searchFunction = (e: any) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/logout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (response.status === 200) {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Clear the token cookie
        document.cookie =
          "RefreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Clear the RefreshToken cookie
        document.cookie =
          "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Clear the jwt cookie

        window.location.href = "/"; // Redirect to the homepage after successful logout
      } else {
        console.error("Logout failed. Response status:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gray-300 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="http://localhost:3000/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://www.svgrepo.com/show/115818/e-learning.svg"
            className="h-8"
            alt="E-Learning Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            E-Learners
          </span>
        </a>

        <div className="flex items-center md:order-3 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <NotificationBell data={data} />

          {userId ? (
            <>
              {role === "student" ? (
                <button
                  type="button"
                  className="pl-5"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <a
                    href={url}
                    className="text-white font-bold block py-2 px-3 text-white rounded md:bg-transparent md:text-gray-900 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    {userDetails.name}
                  </a>
                </button>
              ) : role === "instructor" ? (
                <button
                  type="button"
                  className="pl-5"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <a
                    href={url}
                    className="text-white font-bold block py-2 px-3 text-white rounded md:bg-transparent md:text-gray-900 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    {userDetails.name}
                  </a>
                </button>
              ) : role === "admin" ? (
                <button
                  type="button"
                  className="pl-5"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <a
                    href={url}
                    className="text-white font-bold block py-2 px-3 text-white rounded md:bg-transparent md:text-gray-900 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    {userDetails.name}
                  </a>
                </button>
              ) : null}

              {/* Logout link */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-300"
              >
                Logout
              </a>
            </>
          ) : (
            <a href={url} className="text-white font-bold py-2 px-4 rounded">
              Login
            </a>
          )}
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <form onSubmit={searchFunction}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  id="search-navbar"
                  className="block w-full p-1 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
