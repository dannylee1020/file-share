import express from "express";
import {upload_file, retrieve_files} from "../controller/file_controller.js";

var router = express.Router();

// upload file to server
router.post("/", async (req, res) => {
    let file = req.files;
    const {data, error} = await upload_file(file);

    res.send({data, error});
});

// get all files in a bucket
router.get("/files", async (req, res) => {
    const {data, error} = await retrieve_files();

    res.send({data, error});
});

export default router;
