import "dotenv/config";

//create function 
const getOpenAIResponse = async (message) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                // { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: message,
                },
            ],
        }),
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();         //reply
        console.log(data);
        return data.choices[0].message.content;
    }
    catch (err) {
        console.log(err);
    }
}

export default getOpenAIResponse;