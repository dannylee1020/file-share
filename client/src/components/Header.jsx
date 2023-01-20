import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        let endpoint = "http://localhost:3000/logout";

        await fetch(endpoint, {
            method: "GET",
        })
            .then((res) => res.json())
            .then(() => {
                localStorage.removeItem("session");
                window.location.reload();
            });
    };

    return (
        <div className="border-b flex items-center justify-between mr-10">
            <div className="text-xl bold ml-10 p-2">FileShare</div>

            {localStorage.getItem("session") ? (
                <button
                    onClick={handleLogout}
                    className="bg-blue-600 text-white font-small px-2 py-1 text-sm rounded uppercase hover:bg-blue-700 hover:shadow-lg"
                >
                    Log out
                </button>
            ) : (
                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white font-small px-2 py-1 text-sm rounded uppercase hover:bg-blue-700 hover:shadow-lg"
                >
                    Log in
                </button>
            )}
        </div>
    );
}

export default Header;
