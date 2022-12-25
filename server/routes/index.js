import express from "express";
import multer from "multer";
import {upload_file, retrieve_files} from "../controller/file_controller.js";

var router = express.Router();
const upload = multer({dest: "dest/"});

// upload file to server
router.post("/", upload.single("file"), async function (req, res) {
    const {data, error} = await upload_file(req.file, req.file.originalname);
    res.send({data, error});
});

// get all files in a bucket
router.get("/files", async (req, res) => {
    const {data, error} = await retrieve_files();

    res.send({data, error});
});

export default router;
