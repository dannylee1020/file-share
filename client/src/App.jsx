import Upload from "./components/Upload";
import Files from "./components/Files";
import Header from "./components/Header";
import {useState} from "react";

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
            <div className>
                <Header></Header>
            </div>
            <div className="flex flex-col gap-20 mt-20 ml-10">
                <Upload fetchFiles={fetch_files}></Upload>
                {/* <Files fetchFiles={fetch_files} files={files}></Files> */}
            </div>
        </div>
    );
}

export default App;
