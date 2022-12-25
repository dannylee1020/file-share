import express from "express";
import multer from "multer";
import {
    upload_file,
    retrieve_files,
    download_file,
} from "../controller/file_controller.js";

var router = express.Router();
const upload = multer({dest: "dest/"});

// upload file to server
router.post("/upload", upload.single("file"), async function (req, res) {
    const {data, error} = await upload_file(req.file, req.file.originalname);
    res.send({data, error});
});

// download file from server
router.post("/download", async function (req, res) {
    let filename = req.body.filename;
    const {data, error} = await download_file(filename);

    res.send({data, error});
});

// get all files in a bucket
router.get("/files", async (req, res) => {
    const {data, error} = await retrieve_files();

    res.send({data, error});
});

export default router;
