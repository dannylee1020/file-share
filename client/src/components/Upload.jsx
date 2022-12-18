import {useRef} from "react";

function Upload() {
  const ref = useRef();

  const handleClick = (e) => {
    ref.current.click();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="bg-blue-600 px-6 py-2.5 text-white font-medium uppercase shadow-md hover:bg-blue-700 hover:shadow-lg"
      >
        Upload
      </button>
      <input ref={ref} type="file" className="hidden"></input>
    </div>
  );
}

export default Upload;
