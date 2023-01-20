import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [data, setData] = useState({});
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let endpoint = "http://localhost:3000/login";

        await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.data) {
                    navigate("/");

                    // store user's session
                    // ! this might not be the safest way to persist user's session state
                    // ? which subset of session data should I use to persist session and be safe?
                    localStorage.setItem(
                        "session",
                        JSON.stringify(res.data.session)
                    );
                } else {
                    setError(res);
                }
            });
    };

    return (
        <div className="flex justify-center mt-20">
            <div className="p-6 rounded-lg shadow-lg bg-white w-1/3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-6">
                        <label
                            htmlFor="exampleInputEmail2"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            onChange={handleChange}
                            className="form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleInputEmail2"
                            aria-describedby="emailHelp"
                            name="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label
                            htmlFor="exampleInputPassword2"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={handleChange}
                            className="form-control block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleInputPassword2"
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                onChange={handleChange}
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                id="exampleCheck2"
                                name="checkbox"
                            />
                            <label
                                className="form-check-label inline-block text-gray-800"
                                htmlFor="exampleCheck2"
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            href="#!"
                            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                        >
                            Forgot password?
                        </a>
                    </div>
                    {error ? (
                        <strong className="text-rose-500 text-xs">
                            The email or password you entered is incorrect.
                        </strong>
                    ) : null}
                    <button
                        type="submit"
                        className="w-full
                                    mt-2
                                    px-6
                                    py-2.5
                                    bg-blue-600
                                    text-white
                                    font-medium
                                    text-xs
                                    leading-tight
                                    uppercase
                                    rounded
                                    shadow-md
                                    hover:bg-blue-700 hover:shadow-lg
                                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                                    active:bg-blue-800 active:shadow-lg
                                    transition
                                    duration-150
                                    ease-in-out"
                    >
                        Sign in
                    </button>
                    <p className="text-gray-800 mt-6 text-center">
                        Not a member?{" "}
                        <a
                            href="/register"
                            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                        >
                            Register
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
