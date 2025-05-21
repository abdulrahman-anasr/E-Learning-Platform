"use client"

import React, { useState } from 'react'

const ChatForm = ({onSendMessage, } : {onSendMessage: (message : string) => void}) => {
    const [message , setMessage] = useState("")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted");
        if(message.trim() !== "")
        {
            onSendMessage(message);
            setMessage("");
        }
    }
  return <form onSubmit={handleSubmit} className='flex gap-2 mt-4'>
    <input 
    type="text" 
    onChange={(e) => setMessage(e.target.value)}
    value={message}
    className='flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none' 
    placeholder="Type your message here" />
  </form>
}

export default ChatForm
