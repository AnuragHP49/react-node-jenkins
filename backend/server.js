const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crudDB")
  .then(() => console.log("MongoDB Connected"));

const User = mongoose.model("User", {
  name: String,
  email: String
});

// CREATE
app.post("/users", async (req, res) => {
  await new User(req.body).save();
  res.send("User Created");
});

// READ
app.get("/users", async (req, res) => {
  res.json(await User.find());
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send("User Updated");
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User Deleted");
});

app.listen(5000, () => console.log("Server running on port 5000"));