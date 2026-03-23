const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Environment variables (Render)
const accountSid = process.env.SID;
const authToken = process.env.AUTH_TOKEN;

const client = twilio(accountSid, authToken);

// API route
app.post("/send-alert", async (req, res) => {
  const temp = req.body.temp;

  console.log("Received temp:", temp);

  try {
    await client.messages.create({
      body: `⚠️ Temp is ${temp}°C. Drink water and stay hydrated 💧`,
      from: process.env.TWILIO_NUMBER,
      to: process.env.MY_NUMBER
    });

    console.log("SMS Sent");
    res.send("Message sent");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending SMS");
  }
});

// Port fix for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
