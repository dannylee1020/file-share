from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    flash,
    Response,
    jsonify,
    abort,
    send_from_directory,
)
from werkzeug.utils import secure_filename

import secrets
import sys
import os

UPLOAD_FOLDER = "/Users/dannylee/projects/file-share/db/"
ALLOWED_EXTENSIONS = {"txt", "pdf", "png", "jpg", "jpeg", "gif"}

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["SECRET_KEY"] = secrets.token_hex(16)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        flash("No selected file")
        return redirect(url_for("index"))
    uploaded_file = request.files["file"]
    if not uploaded_file or not allowed_file(uploaded_file.filename):
        abort(400)
    filename = secure_filename(uploaded_file.filename)
    uploaded_file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

    return render_template("index.html", res="upload successful")


@app.route("/uploads/<filename>")
def download(filename):
    return send_from_directory(
        app.config["UPLOAD_FOLDER"], filename, as_attachment=True
    )
