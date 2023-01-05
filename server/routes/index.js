import express from "express";
import multer from "multer";
import fs from "fs";

import {
    upload_file,
    retrieve_files,
    download_file,
} from "../controller/file_controller.js";

import {auth_user} from "../controller/auth_controller.js";

var router = express.Router();
const upload = multer({dest: "dest/"});

// upload file to server
router.post("/upload", upload.single("file"), async function (req, res) {
    let fileBody = fs.readFileSync(req.file.path);
    const {data, error} = await upload_file(fileBody, req.file.originalname);

    res.send({data, error});
});

// download file from server
router.post("/download", async function (req, res) {
    let filename = req.body.filename;
    const data = await download_file(filename, res);

    res.status(200).send(data);
});

// get all files in a bucket
router.get("/files", async (req, res) => {
    const {newData, error} = await retrieve_files();

    res.send({newData, error});
});

router.get("/auth", (req, res) => {
    // handle authentication here
});

export default router;
