import socket
import tqdm
import os
import typer
from cryptography.fernet import Fernet
import time

from file_share.crypto import encrypt, write_key, load_key


SEPARATOR = "<SEPARATOR>"
HEADER = "<HEADER>"
DATA = "<DATA>"
BUFFER_SIZE = 4096


host = "0.0.0.0"
port = 5001
send_path = os.path.abspath(os.path.join(os.curdir, "..", "data", "send"))

app = typer.Typer(name="client")


@app.command()
def run_client():
    """
    Loop through each file in a directory and send the bytes to the server
    """
    encrypt_key = load_key()

    for file in os.listdir(send_path):
        s = socket.socket()
        print(f"[+] Connecting to {host}:{port}")

        s.connect((host, port))
        print("[+] Connected!")

        filename = file
        filepath = send_path + "/" + filename
        filesize = os.path.getsize(filepath)

        progress = tqdm.tqdm(
            range(filesize),
            f"Sending {filename}, size {filesize}",
            unit="B",
            unit_scale=True,
            unit_divisor=1024,
        )

        s.send(f"{filename}{SEPARATOR}{filesize}{HEADER}".encode())

        bytes_array = bytearray()

        with open(filepath, "rb") as f:
            while True:
                bytes_read = f.read(BUFFER_SIZE)

                if not bytes_read:
                    break

                bytes_array.extend(bytes_read)
                progress.update(len(bytes_read))

            encrypt_data = encrypt(encrypt_key, bytes(bytes_array))
            s.sendall(encrypt_data)

        s.close()


if __name__ == "__main__":
    app()
