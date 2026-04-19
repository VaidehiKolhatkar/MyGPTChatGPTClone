import './App.css'
import Sidebar from "./assets/Sidebar.jsx";
import ChatWindow from './assets/ChatWindow.jsx';
import { MyContext } from './assets/MyContext.jsx';
import { useState } from 'react';
import { v1 as uuidv1 } from "uuid";

function App() {

  const id = uuidv1();

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [threadID, setThreadID] = useState(id);
  const [prevChat, setPrevChat] = useState([]);        //array of all the chats in history
  const [newChat, setNewChat] = useState(true);        //true cuz, whenever we open chatgpt, we always have a new chat opened
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    threadID, setThreadID,
    newChat, setNewChat,
    prevChat, setPrevChat,
    allThreads, setAllThreads
  };



  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default App;
