"use client";
import { getCookie, setCookie } from "cookies-next";
import { useState, useEffect } from "react";
export default function MePage() {
  const [cookieClient, setcookieClient] = useState(
    getCookie("cookieClient")?.toString() ?? ""
  );
  return (
    <>
      <h1>Hi from meeeeeeeeeeeeeeee cookies is extract from @cookies-next@ which is client side</h1>
      <p>{cookieClient}</p>
      <>get</>
    </>
  );
}