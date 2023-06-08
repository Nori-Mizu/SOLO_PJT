const express = require("express");
const app = express();
const PORT = 3000;
const database = require("./knex.js");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

app.get("/api/chat", (req, res) => {
  database("chat2_table")
    .select()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error("Error retrieving chat messages:", error);
      res.status(500).json({ error: "Failed to retrieve chat messages" });
    });
});

app.post("/api/chat", (req, res) => {
  const { name, message, created_at } = req.body;

  database("chat2_table")
    .insert({ name, message, created_at })
    .returning("*")
    .then((newMessage) => {
      res.status(201).json(newMessage[0]);
    })
    .catch((error) => {
      console.error("Error inserting chat message:", error);
      res.status(500).json({ error: "Failed to insert chat message" });
    });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
