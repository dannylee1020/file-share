import {useEffect} from "react";

function Files(props) {
    useEffect(() => {
        props.fetchFiles();
    }, []);

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
                        props.files.data.map((val, idx) => {
                            return (
                                <tr key={idx} className="border-b">
                                    <td className="py-2">{val.name}</td>
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
