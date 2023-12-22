const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//schema and model
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
});

const User = mongoose.model("users", userSchema);
//connectionto DB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userTestDB");
    console.log("DB is connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

app.get("/test", (req, res) => {
  res.send("server is running");
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/register", upload.single("image"), async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      image: req.file.filename,
    });
    await newUser.save();
    res.status(201).send(newUser)
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, async () => {
  console.log("server listening on port " + port);
  await connectDB();
});
