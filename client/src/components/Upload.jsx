import {useRef} from "react";

function Upload() {
    const ref = useRef();

    const handleClick = () => {
        ref.current.click();
    };

    const handleSubmit = async (e) => {
        let endpoint = "http://localhost:3000/upload";
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        await fetch(endpoint, {
            method: "POST",
            body: formData,
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
                name="file"
                className="hidden"
                onChange={handleSubmit}
            ></input>
        </div>
    );
}

export default Upload;
