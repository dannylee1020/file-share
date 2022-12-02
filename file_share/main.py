import typer
import client
import server


app = typer.Typer()

app.add_typer(client.app)
app.add_typer(server.app)

if __name__ == "__main__":
    app()
