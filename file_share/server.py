import socket
import tqdm
import os
from threading import Thread
import threading

SERVER_HOST = "0.0.0.0"
SERVER_PORT = 5001
BUFFER_SIZE = 4096
SEPARATOR = "<SEPARATOR>"
HEADER = "<HEADER>"
DATA = "<DATA>"
N_THREADS = 3


def handle_client(conn, addr, buffer_size=BUFFER_SIZE):
    print(f"Thread starting...")
    received = conn.recv(buffer_size).decode()
    header = received.split(HEADER)[1]

    filename, filesize = received.split(SEPARATOR)
    filename = filename.split(HEADER)[1]
    print(f"{filename}, {filesize}")

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
        while True:
            bytes_read = conn.recv(buffer_size)

            if not bytes_read:
                break

            f.write(bytes_read)
            progress.update(len(bytes_read))

        f.close()


def main():
    all_threads = []

    s = socket.socket()
    s.bind((SERVER_HOST, SERVER_PORT))

    s.listen(5)
    print(f"[*] Listening on {SERVER_HOST}:{SERVER_PORT}")

    for t in range(N_THREADS):
        client_socket, address = s.accept()
        print(f"[+] {address} is connected!")

        handle_client(client_socket, address)

    client_socket.close()
    s.close()


if __name__ == "__main__":
    main()

    # for t in range(N_THREADS):
    #     thread = Thread(target=handle_client, args=(client_socket, address))
    #     thread.start()
    #     all_threads.append(thread)

    # for t in all_threads:
    #     t.join()

    # while True:
    #     client_socket, address = s.accept()
    #     print(f"[+] {address} is connected!")

    #     for t in range(N_THREADS):
    #         thread = Thread(target=handle_client, args=(client_socket, address))
    #         thread.start()
    #         all_threads.append(thread)

    #     for t in all_threads:
    #         t.join()

    # print(f"[ACTIVE CONNECTIONS] {threading.active_count() - 1}")

    # client_socket.close()
    # s.close()
