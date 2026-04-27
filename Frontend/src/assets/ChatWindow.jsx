import "./ChatWindow.css";
import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { DotLoader } from "react-spinners";

function ChatWindow() {

    const { prompt, setPrompt, reply, setReply, threadID, prevChat, setPrevChat, newChat, setNewChat } = useContext(MyContext);

    const [loading, setLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {

        setLoading(true);
        setNewChat(false);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: prompt,
                threadID: threadID,
            })
        };


        try {
            const response = await fetch("https://mygptchatgptclone.onrender.com/api/chat", options);
            const res = await response.json();

            console.log(res.reply);

            setReply(res.reply);
        } catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }


    //append new chats to previous chats
    useEffect(() => {
        if (prompt && reply) {
            setPrevChat(prevChat => (
                [...prevChat, {
                    role: "user",
                    content: prompt
                }, {

                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);




    // Modify your existing useEffect in ChatWindow.jsx
    // useEffect(() => {
    //     // Only append if this is a new message, not when loading old chat
    //     if (prompt && reply && !newChat) {
    //         setPrevChat(prevChat => (
    //             [...prevChat, {
    //                 role: "user",
    //                 content: prompt
    //             }, {
    //                 role: "assistant",
    //                 content: reply
    //             }]
    //         ));
    //         setPrompt("");
    //     } else if (prompt && reply && newChat) {
    //         // For new chat
    //         setPrevChat([{
    //             role: "user",
    //             content: prompt
    //         }, {
    //             role: "assistant",
    //             content: reply
    //         }]);
    //         setPrompt("");
    //         setNewChat(false);
    //     }
    // }, [reply]);





    // Add this new useEffect to debug and handle thread changes
    // useEffect(() => {
    //     console.log("Thread ID changed to:", threadID);
    //     console.log("Current prevChat in ChatWindow:", prevChat);
    // }, [threadID, prevChat]);


    const accDropdown = () => {
        setIsOpen(!isOpen);
    }


    return (
        <div className="chatwindow" >
            <div className="navbar">
                <span>SparkAI  <i className="fa-solid fa-chevron-down"></i></span>
                <div className="user_acc_icon" onClick={accDropdown}>
                    <span className="usericon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>



            {
                isOpen &&
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i>Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-up-long"></i>Upgrade plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Log out</div>
                </div>
            }









            {/* <Chat key={threadID}>
            </Chat> */}

            <Chat key={threadID} />  {/* This forces Chat to re-render when threadID changes */}

            {loading && (
                <div className="loader">
                    <DotLoader color="#fff" />
                </div>
            )}

            {/* <DotLoader color="#ffffff" loading={loading}>

            </DotLoader> */}

            <div className="chat_input">
                <div className="input_box">
                    <input placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}>
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-duotone fa-solid fa-circle-up"></i></div>
                </div>

                <div className="footer">
                    <p>MyGPT can make mistakes. Check important info. See Cookie Preferences.</p>
                </div>
            </div>
        </div >
    )
};

export default ChatWindow;