const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Twilio credentials

const accountSid = "AC42ea1264bdbb2021c1e51de295b11fd9";
const authToken = "78a77514b4d871351e330a9488f06691";

const client = twilio(accountSid, authToken);

app.post("/send-alert", async (req, res) => {

  const temp = req.body.temp;

  try {
    await client.messages.create({
      body: `⚠️ Temp is ${temp}°C. Drink water and stay hydrated 💧`,
      from:"+15705650896",
      to:"+918107162032"
    });

    console.log("SMS Sent");

    res.send("Message sent");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});