import express from "express";
import multer from "multer";
import fs from "fs";
import {body, validationResult} from "express-validator";

import {
    upload_file,
    retrieve_files,
    download_file,
} from "../controller/file_controller.js";

import {register_user} from "../controller/auth_controller.js";

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

// register users to the app
router.post(
    "/register",

    body("firstname").trim().escape(),
    body("lastname").trim().escape(),
    body("password").trim().escape(),
    body("email").isEmail().normalizeEmail({all_lowercase: true}),

    (req, res) => {
        let result = validationResult(req);

        if (!result.isEmpty()) {
            return res.json({errors: result.array()});
        }

        let {data, error} = register_user(req.body);

        error
            ? res.status(404).send(error)
            : res.status(200).json({message: "OK"});
    }
);

export default router;
