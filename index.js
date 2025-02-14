const express = require("express");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv")

dotenv.config()
const PORT = process.env.PORT || 3009;

const app = express();
app.use(fileUpload({ createParentPath: true }));
app.use(express.static("public"));
app.use(cors());

app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  console.log(`File upload , store file: ${req.files.file?.name} `);

  const uploadedFile = req.files.file;
  const fileExtension = path.extname(uploadedFile.name); 
  const newFileName = `${uuidv4()}${fileExtension}`;
  const savePath = path.join(__dirname, "public", "files", newFileName);

  uploadedFile.mv(savePath, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).send("File upload failed.");
    }

    console.log(`File upload , store file success: ${savePath} `);

    res.send({
      message: "File uploaded successfully!",
      fileName: newFileName,
      url: `/download/${newFileName}`,
    });
  });
});

app.get("/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "public", "files", fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName);
  } else {
    res.status(404).send("File not found.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
