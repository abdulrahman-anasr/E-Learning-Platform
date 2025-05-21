'use client'

import React , {Dispatch , SetStateAction } from 'react'
import { useEffect, useState } from "react";
import Image from 'next/image';
import axios from 'axios';
import { set } from 'mongoose';

const CourseNotes = ({data , userId , courseId , setRefresh} : {data : any , userId : any , courseId? : any , setRefresh : Dispatch<SetStateAction<boolean>>}) => {

    axios.defaults.withCredentials = true;
    const [editMode, setEditMode] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [noteId, setNoteId] = useState('');
    const [newNote , setNewNote] = useState(false);

    const handleEditMode = (noteTitle : string , noteContent : string , noteId : string) => (e : any) => {
        e.preventDefault();
        setNoteTitle(noteTitle);
        setNoteContent(noteContent);
        setNoteId(noteId);
        setEditMode(true);
    }

    const handleEditNote = (e : React.FormEvent) => {
        e.preventDefault();
        axios.put('http://localhost:3001/notes/update/' + noteId , {title : noteTitle , content : noteContent , last_at : new Date()} , {withCredentials : true}); 
        setEditMode(false);
        setNoteTitle('');
        setNoteContent('');
        setNoteId(''); 
        setRefresh(true);
    }

    const handleSubmitNote = (e : React.FormEvent) => {
        e.preventDefault();
        axios.post('http://localhost:3001/notes/create' , {title : noteTitle , content : noteContent , user_id : userId , course_id : courseId , last_at : new Date()} , {withCredentials : true}).then(() =>{
            setEditMode(false);
            setNoteTitle('');
            setNoteContent('');
            setNoteId('');
            setNewNote(false);
            setRefresh(true);
        })

    }

    const handleDeleteNote = (noteDeleteId : any) => (e : React.FormEvent) => {
        e.preventDefault();
        axios.delete('http://localhost:3001/notes/delete/' + noteDeleteId , {withCredentials : true}).then(response => {
            setRefresh(true);
        });
    }

    return (
        <>
        {data ? 
        <>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
        {data.map((note : any) => (
            <>
            <div className="rounded">
            {editMode && note._id === noteId ? 
            <>
                        <div className="w-full h-64 flex flex-col justify-between bg-yellow-400 rounded-lg border border-yellow-400 mb-6 py-5 px-4">
                        <form onSubmit={handleEditNote}>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-yellow-400 focus:ring-yellow-400" placeholder="Title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
                            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-yellow-400 focus:ring-yellow-400" placeholder="Content" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
                            <button type="submit" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-yellow-400 focus:ring-yellow-400">Save</button>
                            
                        </form>
                    </div>
            </> : 
            <>
                            <div className="w-full h-64 flex flex-col justify-between bg-yellow-400 rounded-lg border border-yellow-400 mb-6 py-5 px-4">
                        <div>
                            <h4 className="text-gray-800 font-bold mb-3">{note.title}</h4>
                            <p className="text-gray-800 text-sm">{note.content}</p>
                        </div>
                        <div>
                            <div className="flex items-center pl-3 justify-between text-gray-800">
                                <p className="text-sm">{note.last_at.split("T")[0]}</p>
                                <button onClick={handleEditMode(note.title , note.content , note._id)} className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-yellow-400  focus:ring-black" aria-label="edit note" role="button">
                                ✏️
                                </button>
                                <button onClick={handleDeleteNote(note._id)} className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-yellow-400  focus:ring-black" aria-label="edit note" role="button">
                                🗑️
                                </button>
                            </div>
                        </div>
                    </div>
            </>
            }
            </div>
            </>
        ))}
        {newNote ?
         <> 
        <div className="w-full h-64 flex flex-col justify-between bg-blue-400 rounded-lg border border-blue-400 mb-6 py-5 px-4">
            <form onSubmit={handleSubmitNote}>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-yellow-400 focus:ring-yellow-400" placeholder="Title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
                <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-yellow-400 focus:ring-yellow-400" placeholder="Content" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
                <button type="submit" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-yellow-400 focus:ring-yellow-400">Save</button>                    
            </form>
        </div>
         </> 
         : 
         <>
        <div className="rounded">
        <div className="w-full h-64 flex flex-col justify-between bg-blue-400 rounded-lg border border-yellow-400 mb-6 py-5 px-4">
            <Image onClick={(e) => setNewNote(true)} src="/plus.png" alt="add note" width={120} height={100} style={{ alignSelf: 'center' }} />
        </div>
        </div>
         </> }
        </div>
        </> 
        : 
        <>
        </>} 
        </>

    )
}
export default CourseNotes;