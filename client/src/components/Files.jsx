import {useEffect, useState} from "react";

function Files(props) {
    const [files, setFiles] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let {data, error} = await props.fetchFiles();
            data ? setFiles(data) : console.log(error);
        };

        fetchData().catch(console.error);
    });

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
                    <tr>{files}</tr>
                    {/* {data.map((val, index) => {
                        return (
                            <tr key={index} className="border-b">
                                <td className="py-2">{val.name}</td>
                                <td></td>
                            </tr>
                        );
                    })} */}
                </tbody>
            </table>
        </div>
    );
}

export default Files;
