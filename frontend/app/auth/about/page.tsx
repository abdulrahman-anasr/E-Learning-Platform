import { cookies } from 'next/headers'
import { MyClientComponent } from './clientComponent'
export default async function About() {
    // Server-side: based on HTTP resquest cookie only
    const cookieFromServer = (await cookies()).get('CookieFromServer')?.value
    console.log((await cookies()).get('CookieFromServer'))
    return <MyClientComponent initial={{ cookieClient:cookieFromServer }} />
}