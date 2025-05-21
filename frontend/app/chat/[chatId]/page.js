"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const ChatForm_1 = __importDefault(require("@/components/ChatForm"));
const ChatMessage_1 = __importDefault(require("@/components/ChatMessage"));
const navigation_1 = require("next/navigation");
const React = __importStar(require("react"));
const client_1 = require("cookies-next/client");
const react_1 = require("react");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const socket = (0, socket_io_client_1.default)('http://localhost:3001');
function Home() {
    const path = (0, navigation_1.usePathname)().split('/');
    const [room, setRoom] = (0, react_1.useState)("");
    const [joined, setJoined] = (0, react_1.useState)(true);
    const [messages, setMessages] = (0, react_1.useState)([]);
    let userId = (0, client_1.getCookie)("userId");
    let userName = (0, client_1.getCookie)("username");
    let chatId = path[path.length - 1];
    let dataEmit = { roomId: chatId, user: userName, userId: userId, message: "" };
    (0, react_1.useEffect)(() => {
        if (userId) {
            socket.emit("join_room", { roomId: chatId, user: userName, userId: userId });
            socket.emit("get_chat_history", { roomName: chatId });
            socket.on("get_chat_history", (data) => {
                const dataAppend = [];
                data.forEach(function (value) {
                    console.log("Sender is: " + value.sender + " And message is: " + value.message);
                    dataAppend.push({ sender: value.sender, message: value.message });
                });
                setMessages((prev) => [...prev, ...dataAppend]);
            });
            socket.on("sendMessage", (data) => {
                setMessages((prev) => [...prev, { sender: data.user, message: data.message }]);
            });
            socket.on("join_room", (message) => {
                setMessages((prev) => [...prev, { sender: "System", message: message }]);
            });
            console.log("User ID : " + userId);
        }
    }, []);
    const handleSendMessage = (message) => {
        dataEmit.message = message;
        socket.emit("sendMessage", dataEmit);
        console.log(message);
        console.log(messages);
        console.log("ID sending is: " + userId);
    };
    return (<div className="flex mt-24 justify-center w-full">
      {!userId ? (<div className="flex flex-col items-center justify-center"> Please login to continue</div>) : (<div className="w-full max-w-3xl mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Room: {chatId}</h1>
        <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg">
          {messages.map((msg, index) => (<ChatMessage_1.default key={index} sender={msg.sender} message={msg.message} isOwnMessage={msg.sender === userName}/>))}</div>
        <ChatForm_1.default onSendMessage={handleSendMessage}/>
      </div>)}

    </div>);
}
