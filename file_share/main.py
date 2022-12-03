import typer
from file_share import client
from file_share import server


app = typer.Typer()

app.add_typer(client.app)
app.add_typer(server.app)


def run():
    try:
        app()
    except Exception as err:
        print(f"Exception: {err}")
        raise
