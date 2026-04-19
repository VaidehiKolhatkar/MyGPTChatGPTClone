import express from "express";
import Thread from "../models/thread.js";
import { Threads } from "openai/resources/beta.js";
import thread from "../models/thread.js";
import getOpenAIResponse from "../utils/openai.js";

const router = express.Router();

//test router
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadID: "pqr123",
            title: "testing new thread2"
        });

        const response = await thread.save();
        res.send(response);
    }
    catch (err) {
        console.log("error occured. ", err);
        //res.status(500).json(error, "failed to save  in db");
    }
});

//thread route GET
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });          //sort the threads based on time and -1 means descending order
        res.json(threads);
    }
    catch (err) {
        console.log("Failed to fetch threads. ", err);
    }
});

//thread/threadID route Get
router.get("/thread/:threadID", async (req, res) => {
    const { threadID } = req.params;

    try {
        const thread_id = await Thread.findOne({ threadID });

        if (!thread_id) {
            res.status(404).json({ error: "Failed to fetch chat" });
        }

        res.send(thread_id.messages);
    }
    catch (err) {
        console.log("Failed to get thread ids. ", err);
    }
});

//thread/:threadID DELETE
router.delete("/thread/:threadID", async (req, res) => {
    const { threadID } = req.params;

    try {
        const deleted_thread = await Thread.findOneAndDelete({ threadID });

        if (!deleted_thread) {
            return res.status(404).json({ error: "Failed to delete chat" });
        }

        res.status(200).json({ success: "thread deleted successfully" });

    } catch (err) {
        console.log("Failed to delete chat. ", err);
        res.status(500).send("Error");
    }
});

//POST /chat
router.post("/chat", async (req, res) => {
    const { threadID, messages } = req.body;

    if (!threadID || !messages) {
        return res.status(400).json({ error: "Could not get required info" });
    }

    try {
        let thread_id = await Thread.findOne({ threadID });

        if (!thread_id) {
            thread_id = new Thread({
                threadID,
                title: messages,
                messages: [{ role: "user", content: messages }],
            });
        } else {
            thread_id.messages.push({ role: "user", content: messages });
        }

        const assistant_reply = await getOpenAIResponse(messages);

        if (!assistant_reply) {
            return res.status(500).json({ error: "No response from AI" });
        }

        thread_id.messages.push({ role: "assistant", content: assistant_reply });

        await thread_id.save();

        res.json({ reply: assistant_reply });

    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});


export default router;