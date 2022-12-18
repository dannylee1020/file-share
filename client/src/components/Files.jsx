function Files() {
  const files = ["test1.txt", "test2.jpg", "test3.gif", "test4.pdf"];

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
          {files.map((val, index) => {
            return (
              <tr key={index} className="border-b">
                <td className="py-2">{val}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Files;
