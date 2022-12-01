import socket
import tqdm
import os

SEPARATOR = "<SEPARATOR>"
HEADER = "<HEADER>"
DATA = "<DATA>"
BUFFER_SIZE = 4096


host = "0.0.0.0"
port = 5001
send_path = os.path.abspath(os.path.join(os.curdir, "..", "data", "send"))

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

    s.send(f"{HEADER}{filename}{SEPARATOR}{filesize}".encode())

    with open(filepath, "rb") as f:
        while True:
            bytes_read = f.read(BUFFER_SIZE)
            if not bytes_read:
                break
            s.sendall(bytes_read)
            progress.update(len(bytes_read))

    s.close()
