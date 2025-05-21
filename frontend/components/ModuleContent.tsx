import { redirect } from "next/navigation";
import axios from "axios";
import React, { useState } from 'react'
import FileUpload from "./FileUpload";

const ModuleContent = ({moduleId , data , role , setRefresh} : {moduleId : string , data : any , role : any , setRefresh : any}) => {

    const downloadFile = (fileName: string) => {
        redirect("http://localhost:3001/modules/download/" + moduleId + "/" + fileName);
    }

    const deleteFile = (fileName: string) => {
        axios.delete("http://localhost:3001/modules/deletecontent/" + moduleId + "/" + fileName , {withCredentials : true}).then(response => response).then(() => {
            setRefresh(true);
        });
    }

    return (
        <>
        {role === "student" ? 
                <>
                {data? 
                <>
                <div key="moduleContent">
                {data.map((content : any) => (
                        <>
                        <div
                        className="block w-full p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 	hover:bg-gray-100 dark:border-gray-700 lg:mb-0">
                            <h3 className="mb-2 text-2xl font-italic tracking-tight text-gray-600 dark:text-white">{content.split("." , 2)[0]}</h3>
                        <button type="button" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-900 to-red-900 group-hover:from-gray-900 group-hover:to-red-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800" onClick={() => downloadFile(content)}>
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Download
                            </span>
                            </button>
                        </div>
        
                        <br />
                        </>
                ))}
                </div></> : 
                <> <p>No Data Found</p></>}
                </>
                 :
                 <>
                 {data? <div key={"moduleContent"}>
                 {data.map((content : any) => (
                         <>
                         <div
                         className="block w-full p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:hover:bg-gray-700 	hover:bg-gray-100 dark:border-gray-700 lg:mb-0">
                             <h3 className="mb-2 text-2xl font-italic tracking-tight text-gray-600 dark:text-white">{content.split("." , 2)[0]}</h3>
                         <button type="button" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-900 to-red-900 group-hover:from-gray-900 group-hover:to-red-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800" onClick={() => downloadFile(content)}>
                             <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Download
                             </span>
                             </button>
                             <button type="button" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-gray-900 to-red-900 group-hover:from-gray-900 group-hover:to-red-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800" onClick={() => deleteFile(content)}>
                             <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Delete
                             </span>
                             </button>
                         </div>
         
                         <br />
                         </>
                 ))}
                  <div
                         className="block w-full p-6 mb-6">
                            <FileUpload moduleId={moduleId} setRefresh={setRefresh} />
                         </div>
                 </div> : 
                 <> <p>No Data Found</p></>}
                 </>}
        </>
    )
}
export default ModuleContent;