import "./Chat.css";
import { useContext, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const { newChat, prevChat } = useContext(MyContext);

    return (
        <>
            {newChat && <h1>Start a New Chat!</h1>}

            <div className="chats">
                {
                    prevChat?.map((chat, idx) =>
                        <div
                            className={chat.role === "user" ? "userDiv" : "gptDiv"}
                            key={idx}
                        >
                            {
                                chat.role === "user"
                                    ? <p className="userMessage">{chat.content}</p>
                                    : (
                                        <div className="gptMessage">
                                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                {chat.content || ""}
                                            </ReactMarkdown>
                                        </div>
                                    )
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Chat;