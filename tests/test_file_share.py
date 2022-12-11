import os
import pandas as pd
import pytest


def _get_filenames(path):
    files = []
    for file in os.listdir(path):
        files.append(file)

    return sorted(files)


def test_received_files():
    res = []
    filepath = os.path.abspath(os.path.join(os.curdir, "..", "data"))

    send_files = _get_filenames(filepath + "/send/")
    receive_files = _get_filenames(filepath + "/receive/")

    for files in zip(send_files, receive_files):
        s = pd.read_csv(filepath + "/send/" + files[0])
        r = pd.read_csv(filepath + "/receive/" + files[1])

        comp = s.compare(r)
        res.append(0) if len(comp) == 0 else res.append(1)

    assert max(res) == 0
