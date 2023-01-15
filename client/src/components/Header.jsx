import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    };

    return (
        <div className="border-b flex items-center justify-between mr-10">
            <div className="text-xl bold ml-10 p-2">FileShare</div>
            <button
                onClick={handleClick}
                className="bg-blue-600 text-white font-small px-2 py-1 text-sm rounded uppercase hover:bg-blue-700 hover:shadow-lg"
            >
                Log in
            </button>
        </div>
    );
}

export default Header;
