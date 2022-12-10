from cryptography.fernet import Fernet


def write_key():
    """
    Generate a key and write to a file
    """

    key = Fernet.generate_key()
    with open("key.key", "wb") as key_file:
        key_file.write(key)


def load_key():
    """
    Loads the key from the key file
    """

    with open("key.key", "rb") as f:
        secretkey = f.read().strip()

    return secretkey


def encrypt(key: bytes, data: bytes):
    """
    Encrypts a file and write it given the filename and key
    """

    f = Fernet(key)
    encrypted_data = f.encrypt(data)

    return encrypted_data


def decrypt(key: bytes, data: bytes):
    """
    Decrypts a file and write it given the filename and key
    """
    f = Fernet(key)
    decrypted_data = f.decrypt(data)

    return decrypted_data
