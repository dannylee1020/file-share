import Upload from "./components/Upload";
import Files from "./components/Files";
import {useEffect, useState} from "react";

function App() {
    const [files, setFiles] = useState();

    const fetch_files = async function () {
        let endpoint = "http://localhost:3000/files";

        await fetch(endpoint, {
            method: "GET",
            headers: {"Content-Type": "multipart/form-data"},
        })
            .then((res) => res.json())
            .then((data) => setFiles(data));
    };

    return (
        <div className="w-screen">
            <div className="flex flex-col gap-20 ml-10 mt-20">
                <Upload fetchFiles={fetch_files}></Upload>
                <Files fetchFiles={fetch_files} files={files}></Files>
            </div>
        </div>
    );
}

export default App;
