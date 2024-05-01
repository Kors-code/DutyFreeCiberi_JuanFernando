const upload = require("../middelwares/upload");
const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { ObjectID } = require("mongodb");


Grid.mongo = mongoose.mongo;
let gfs;

var uri ="mongodb://127.0.0.1:27017/DutyFree";

mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Base de Datos App DOCS Correctamente...");
    gfs =  new mongoose.mongo.GridFSBucket(db.db,{
        bucketName:'archivos'
    })
});


router.post("/upload", upload.single("file"), async (req, res) => {
    console.log(req.file)
    if (req.file === undefined) return res.send("you must select a file.");
    return res.send(req.file);
});

router.get("/file/:filename", async (req, res) => {
    id=req.params.filename 

    try {
        // let files = await gfs.find({"_id": new mongoose.isObjectIdOrHexString(id)}).toArray();
        let files = await gfs.find({filename: id}).toArray();
        res.json(files[0])
    } catch (err) {
        console.log(err)
        res.json({err})
    }
});


router.get("/image/:filename", async (req, res) => {
    id=req.params.filename 

    try {
        // let files = await gfs.find({"_id": new mongoose.isObjectIdOrHexString(id)}).toArray();
        let files = await gfs.find({filename: id}).toArray();

        let img = files[0]

        console.log(img)
        if(img.contentType === 'image/jpeg' || img.contentType === 'image/png'){
  
            const readStream = gfs.openDownloadStream(img._id);
                readStream.on("error", (err) => {
                console.error("Error reading file stream:", err);
                res.status(500).json({ error: "Error reading file stream" });
                });
                readStream.pipe(res);

        }
      
    } catch (err) {
        console.log(err)
        res.json({err})
    }
});

router.get("/pdf/:filename", async (req, res) => {
    id=req.params.filename 
    console.log(id)
    try {
        // let files = await gfs.find({"_id": new mongoose.isObjectIdOrHexString(id)}).toArray();
        let files = await gfs.find({filename: id}).toArray();
        let pdf = files[0]
        console.log(pdf)
        if(pdf.contentType === 'application/pdf'){
            const readStream = gfs.openDownloadStream(pdf._id);
                readStream.on("error", (err) => {
                console.error("Error reading file stream:", err);
                res.status(500).json({ error: "Error reading file stream" });
                });
                readStream.pipe(res);

        }
      
    } catch (err) {
        console.log(err)
        res.json({err})
    }
});


router.get("/files", async (req, res) => {
    try {
        let files = await gfs.find().toArray();
        res.json({files})
    } catch (err) {
        console.log(err)
        res.json({err})
    }

});

router.delete("/file/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});


module.exports = router;