import {useRef} from "react";

function Upload() {
    const ref = useRef();

    const handleClick = () => {
        ref.current.click();
    };

    const handleSubmit = async (e) => {
        let endpoint = "http://localhost:3000";

        await fetch(endpoint, {
            method: "POST",
            headers: {"Content-Type": "multipart/form-data"},
            body: e.target.files[0],
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    return (
        <div>
            <button
                type="button"
                onClick={handleClick}
                className="bg-blue-600 px-6 py-2.5 text-white text-sm font-medium uppercase shadow-md hover:bg-blue-700 hover:shadow-lg"
            >
                Upload
            </button>
            <input
                ref={ref}
                type="file"
                className="hidden"
                onChange={handleSubmit}
            ></input>
        </div>
    );
}

export default Upload;
