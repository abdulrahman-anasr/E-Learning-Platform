"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ChatMessage = ({ sender, message, isOwnMessage }) => {
    const isSystemMessage = sender === "System";
    return (<div className={`flex ${isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"} mb-3`}>
        <div className={`max-w-sx px-4 py-2 rounded-lg ${isSystemMessage ? "bg-gray-800 text-white" : isOwnMessage ? "bg-blue-500 text-white" : "bg-white text-black"}`}>
            {!isSystemMessage && <p className="text-sm font-bold text-white-500">{sender}</p>}
            <p>{message}</p>
        </div>
      
    </div>);
};
exports.default = ChatMessage;
