"use client";
import { useState } from "react";
import axios from "axios";
import { set } from "mongoose";
import { extname } from "path";
import { Dispatch , SetStateAction } from "react";

export const FileUpload = ({moduleId , setRefresh} : {moduleId : string , setRefresh : Dispatch<SetStateAction<boolean>>}) => {
  const [file, setFile] = useState<File>();
  const [fileEnter, setFileEnter] = useState(false);

  const uploadFile = () => {
    if(file){
        const formData = new FormData();
        formData.append("file", file);
        axios.post('http://localhost:3001/modules/upload/' + moduleId , formData , {withCredentials : true}).then(response => {
            setRefresh(true);
        });
    }
    }

  return (
    <div className="container px-5 max-w-5xl mx-auto ">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.items) {
              [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    setFile(file);
                  }
                }
              });
            } else {
              [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
              });
            }
          }}
          className={`${
            fileEnter ? "border-4" : "border-2"
          } mx-auto  bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
        >
          <label
            htmlFor="file"
            className="h-full flex flex-col justify-center text-center"
          >
            Click to upload or drag and drop
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              console.log(e.target.files);
              let files = e.target.files;
              if(files)
                setFile(files[0]);
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
            <h1>{file.name}</h1>
          <button
            onClick={() => uploadFile()}
            className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
          >
            Upload
          </button>
          <button
            onClick={() => setFile(undefined)}
            className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;