const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON bodies

const playersSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  age: Number,
});

const Player = mongoose.model("players", playersSchema);

const connectToMDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Ravi:Ravi@createdatabase.29g4i.mongodb.net/test?retryWrites=true&w=majority&appName=createDatabase"
    );
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Unable to connect to MongoDB", error);
  }
};

app.get("/getPlayers", async (req, res) => {
  try {
    const players = (await Player.find().and([{age:38}]));
    if (players.length === 0) {
      console.log("No players found");
    }
    res.json(players);
  } catch (error) {
    console.error("Error fetching players", error);
    res.status(500).json({ message: "Error fetching players" });
  }
});

connectToMDB().then(() => {
  app.listen(1234, () => {
    console.log("Listening on port 1234");
  });
});
