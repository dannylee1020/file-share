import {useEffect} from "react";

function Files(props) {
    useEffect(() => {
        props.fetchFiles();
    }, []);

    const handleClick = async (e) => {
        let filename = e.target.textContent;
        let endpoint = "http://localhost:3000/download";

        await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({filename}),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    // TODO: when file is clicked for download, window should pop up to select where to store file
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
