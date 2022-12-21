import createError from "http-errors";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import fileUpload from "express-fileupload";
import indexRouter from "./routes/index.js";

// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// var fileUpload = require("express-fileupload");
// var indexRouter = require("./routes/index");

var app = express();
var port = 3000;

app.use(cors({credentials: true, origin: true}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(new URL(import.meta.url).pathname, "public")));
app.use(fileUpload());

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("error");
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
