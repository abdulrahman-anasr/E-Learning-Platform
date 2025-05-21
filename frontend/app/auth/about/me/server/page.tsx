import { cookies } from 'next/headers'
export default async function Server() {
    // Server-side: based on HTTP resquest cookie only
    const cookieFromServer = (await cookies()).get('CookieFromServer')?.value
    console.log((await cookies()).get('CookieFromServer'))
    return(<><h1> hi from server component</h1>
    <p> cookies is extracted from next headers {cookieFromServer} </p></>)
}