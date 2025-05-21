'use server'

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axiosInstance from "app/utils/axiosInstance";


let backend_url = "http://localhost:3001";

export default async function login(prevState: any, formData: FormData) {
    const cookieStore = await cookies(); // Access the cookie store
    console.log(formData.get('email'));

    try {
        const response = await axiosInstance.post(`${backend_url}/auth/login`, {
            email: formData.get('email'),
            password: formData.get('password')
        });

        if (response.status != 201) {
            console.log(response);
            return { 'message': 'error' };
        }

        // Extract the token
        let token = response.headers["set-cookie"]![0].split(';')[0].split('=')[1];
        let maxAge = parseInt(response.headers["set-cookie"]![0].split(';')[1].split('=')[1]);
        console.log('cookie',response.headers["set-cookie"]);

        // Set token in the client-side cookie store
        cookieStore.set('CookieFromServer', token, {
            secure: true,
            httpOnly: true,
            sameSite: true,
            maxAge
        });
        console.log(cookieStore)
        // Extract the role
        let role = response.headers["set-cookie"]!.find((cookie: string) =>
            cookie.startsWith("role")
        );
        if (role) {
            role = role.split(";")[0].split("=")[1]; // Extract the value after 'role='
        }
      
        // Set role in the client-side cookie store
        /*cookieStore.set('role', role, {
            secure: true,
            httpOnly: true,
            sameSite: true,
            maxAge
        });*/

        // Redirect after setting cookies
        redirect('/about');
    } catch (error: any) {
        console.log('hi', error.response.data.message);
        let m = error.response.data.message;
        return { message: m };
    }
}
