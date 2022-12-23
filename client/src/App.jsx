import Upload from "./components/Upload";
import Files from "./components/Files";
import {useEffect} from "react";

function App() {
    const fetch_files = async function () {
        let endpoint = "http://localhost:3000/files";
        let {data, error} = await fetch(endpoint, {
            method: "GET",
            headers: {"Content-Type": "multipart/form-data"},
        })
            .then((res) => res.json())
            .then((data) => console.log(data));

        return {data, error};
    };

    return (
        <div className="w-screen">
            <div className="flex flex-col gap-20 ml-10 mt-20">
                <Upload></Upload>
                <Files fetchFiles={fetch_files}></Files>
            </div>
        </div>
    );
}

export default App;
