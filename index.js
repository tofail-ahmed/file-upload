const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log("server listening on port " + port);
});
app.get("/test", (req, res) => {
  res.send("server is running");
});
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
        const name = Date.now() + '-'+file.originalname;
        cb(null, name)
      }
    })
    
    const upload = multer({ storage: storage })
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/register",upload.single("image"), (req, res) => {
  res.send("file is uploaded");
});
