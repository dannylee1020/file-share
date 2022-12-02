import socket
import tqdm
import os
from threading import Thread
import threading
import typer

SERVER_HOST = "0.0.0.0"
SERVER_PORT = 5001
BUFFER_SIZE = 4096
SEPARATOR = "<SEPARATOR>"
HEADER = "<HEADER>"
DATA = "<DATA>"
N_THREADS = 4

app = typer.Typer(name="server")


def _handle_client(conn, addr, buffer_size=BUFFER_SIZE):
    print(f"Thread starting...")
    received = conn.recv(buffer_size).decode()
    header = received.split(HEADER)[1]

    filename, filesize = received.split(SEPARATOR)
    filename = filename.split(HEADER)[1]

    filepath = os.path.abspath(
        os.path.join(
            os.path.dirname("__file__"),
            "..",
            "data",
            "receive",
            "recv_" + filename,
        )
    )
    filesize = int(filesize)

    # receive file
    progress = tqdm.tqdm(
        range(filesize),
        f"Receiving {filename}:{filesize}",
        unit="B",
        unit_scale=True,
        unit_divisor=1024,
    )

    with open(filepath, "wb") as f:
        while filesize > 0:
            if filesize < buffer_size:
                buffer_size = filesize

            bytes_read = conn.recv(buffer_size)
            f.write(bytes_read)
            progress.update(len(bytes_read))

            filesize -= buffer_size

    f.close()


@app.command()
def run_server():
    all_threads = []

    s = socket.socket()
    s.bind((SERVER_HOST, SERVER_PORT))

    s.listen(5)
    print(f"[*] Listening on {SERVER_HOST}:{SERVER_PORT}")

    for t in range(N_THREADS):
        client_socket, address = s.accept()
        print(f"[+] {address} is connected!")

        thread = Thread(target=_handle_client, args=(client_socket, address))
        thread.start()
        all_threads.append(thread)

        print(f"[ACTIVE CONNECTIONS] {threading.active_count() - 1}")

    for t in all_threads:
        t.join()

    client_socket.close()
    s.close()


if __name__ == "__main__":
    app()
