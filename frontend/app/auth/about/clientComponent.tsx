'use client'
import { getCookie, setCookie } from 'cookies-next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
export function MyClientComponent({
    initial,
}: {
    initial: { cookieClient?: string }
}) {
    const [cookieClient, setcookieClient] = useState(
        getCookie('CookieFromServer')?.toString() ?? initial.cookieClient ?? '',
    )
    useEffect(() => {
        setCookie('cookieClient', cookieClient,{maxAge:3600 * 1000})
    }, [cookieClient])
    return (<>
        <h1>Hi from About</h1>
            
        <h1>cookies{cookieClient}</h1>
        <Link href='/about/me'>Click To Me Page</Link>
        </>
    )
}