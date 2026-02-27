const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "mistralai/mistral-7b-instruct:free",
    messages: [{ role: "user", content: userMessage }]
  },
  {
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_KEY}`,
      "HTTP-Referer": "https://yourgame.com",
      "X-Title": "Roblox AI"
    }
  }
);

    res.json({
      reply: response.data.choices[0].message.content
    });

  } catch (error) {
  console.log("FULL ERROR:", error.response?.data || error.message);
  res.json({ reply: "SERVER ERROR - Check Render Logs" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});
