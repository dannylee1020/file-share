import {useEffect} from "react";

function Files(props) {
    useEffect(() => {
        props.fetchFiles();
    }, []);

    // write data to file using file handler api
    const writeFile = async (handler, data) => {
        const writable = await handler.createWritable();
        const dataObj = {type: "write", data: data};

        await writable.write(dataObj);
        await writable.close();
    };

    // fetch data from server and write it as a new file
    const handleClick = async (e) => {
        let filename = e.target.textContent;
        let endpoint = "http://localhost:3000/download";

        let handler = await window.showSaveFilePicker({
            suggestedName: filename,
        });

        await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({filename}),
        })
            .then((res) => res.arrayBuffer())
            .then(async (data) => {
                await writeFile(handler, data).then(
                    console.log("file downloaded successfully")
                );
            });
    };

    return (
        <div>
            <table className="table-auto w-5/6">
                <thead className="border-b text-left text-xl">
                    <tr>
                        <th className="py-4">Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.files ? (
                        props.files.newData.map((val, idx) => {
                            return (
                                <tr
                                    key={idx}
                                    className="border-b hover:bg-gray-100"
                                >
                                    <td className="py-2">
                                        <button onClick={handleClick}>
                                            {val.name}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Files;
