import "./Sidebar.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuid } from "uuid";

function Sidebar() {

    const { allThreads, setAllThreads, setNewChat, setPrompt, setReply, setPrevChat, threadID, setThreadID, prevChat } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("https://mygptchatgptclone.onrender.com/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({ threadID: thread.threadID, title: thread.title }));
            setAllThreads(filteredData);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();                //means, we want to get the thread info whenever ID changes. That is, if we create new chat then
    }, [threadID]);                     //ID will change

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setThreadID(uuid());
        setPrevChat([]);
    }

    const changeThread = async (newThreadID) => {

        setThreadID(newThreadID);

        try {
            const response = await fetch(`https://mygptchatgptclone.onrender.com/api/thread/${newThreadID}`);
            const res = await response.json();
            console.log(res);
            setPrevChat(res);
            setNewChat(false);
            //setReply(null);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteThread = async (threadID) => {
        try {
            const response = await fetch(`https://mygptchatgptclone.onrender.com/api/thread/${threadID}`, { method: "DELETE" });
            const res = await response.json();
            console.log(res);

            //updated threads re-render
            setAllThreads(prev => prev.filter(thread => thread.threadID !== threadID));

            //IMPORTANT
            if (threadID === thread.ThreadID) {
                createNewChat();
            }
        }
        catch (err) {
            console.log(err);

        }
    }

    return (
        <section className="sidebar">

            {/* //chatgpt logo */}
            <button onClick={createNewChat}>
                <img src="src/assets/chatgpt_logo.png" alt="logo" className="logo"></img>
                Create New Chat
                <i className="fa-light fa-pen-to-square"></i>
            </button>

            {/* //history */}
            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx} onClick={(e) => changeThread(thread.threadID)}
                            className={thread.threadID === threadID ? "highlighted" : " "}>{thread.title}
                            <i className="fa-regular fa-trash-can"
                                onClick={(e) => {
                                    e.stopPropagation();            //to stop event bubbling
                                    deleteThread(thread.threadID);
                                }}></i></li>
                    ))
                }
            </ul>


            {/* //more info */}
            < div className="sign" >
                <p>By Vaid &hearts;</p>
            </div>

        </section>
    )
};

export default Sidebar;