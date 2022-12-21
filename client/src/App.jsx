import Upload from "./components/Upload";
import Files from "./components/Files";

function App() {
    return (
        <div className="w-screen">
            <div className="flex flex-col gap-20 ml-10 mt-20">
                <Upload></Upload>
                <Files></Files>
            </div>
        </div>
    );
}

export default App;
