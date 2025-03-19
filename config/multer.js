const multer = require("multer");
const path = require('path')

const fs = require('fs')
const uploadDir = path.join(__dirname, "uploads");

// Check if uploads folder exists, create it if not
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Uploads directory created.");
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,uploadDir)
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+ file.originalname);
    },

});

const upload = multer({storage:storage});
module.exports = upload;