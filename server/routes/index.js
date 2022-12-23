import express from "express";
import {upload_file} from "../controller/upload_controller.js";

var router = express.Router();

router.post("/", async (req, res) => {
    let file = req.files;
    const {data, error} = await upload_file(file);

    res.send({data, error});
});

export default router;
