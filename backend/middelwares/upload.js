const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
// const crypto = require("crypto");
// const path = require("path");

const storage = new GridFsStorage({
    url: "mongodb://127.0.0.1:27017/DutyFree", 

    file: (req, file) => {

        const match = ["image/png", "image/jpeg", "application/pdf"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = file.originalname;
            return filename;
        }
        return {
            bucketName: "archivos",
            filename: file.originalname,
        };
    },
});


module.exports = multer({ storage });