var express = require("express");
var router = express.Router();

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   // res.render('index', { title: 'Express' }); //renderによる描画は不要
//   res.sendFile("./public/index.html"); //クライアントにindex.htmlを返す
// });

//koko
// const express = require("express");
// const app = express();
// const PORT = 3000;
const database = require("../knex.js");

// app.use(express.json());
console.log("index.jsです");

router.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

router.get("/api/chat", (req, res) => {
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

router.post("/api/chat", (req, res) => {
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

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}!`);
// });

///koko
module.exports = router;
