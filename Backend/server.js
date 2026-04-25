import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
// const PORT = 3000;

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use("/api", chatRoutes);


// app.listen(PORT, () => {
//     console.log(`server running on ${PORT}`);
//     connectDB();
// });
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on ${PORT}`);
    connectDB();
});

//create func
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_URI);
        console.log("connected to database!");
    }
    catch (err) {
        console.log("Database connection failed. ", err);
    }
}

// app.get("/", (req, res) => {
//     res.send("Backend is live 🚀");
// });

app.get("/testtest", (req, res) => {
    res.send("API working");
});






// app.post("/test", async (req, res) => {

//     const options = {
//         method: 'POST',
//         headers: {
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [
//                 // { role: "system", content: "You are a helpful assistant." },
//                 {
//                     role: "user",
//                     content: req.body.messages,
//                 },
//             ],
//         }),
//     }

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         console.log(data);
//         res.send(data);
//     }
//     catch (err) {
//         console.log(err);
//     }
// });



// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//     model: 'gpt-4o-mini',
//     input: 'Joke related to Computer Science',
// });

// console.log(response.output_text);



//WAY 1
// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//     model: 'gpt-4o-mini',
//     input: 'Joke related to Engineering',
// });

// console.log(response.output_text);