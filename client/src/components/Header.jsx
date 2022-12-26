function Header() {
    return (
        <div className="border-b flex items-center justify-between mr-10">
            <div className="text-xl bold ml-10 p-2">FileShare</div>
            <button className="bg-blue-600 text-white font-small px-2 py-1 text-sm uppercase hover:bg-blue-700 hover:shadow-lg">
                Log in
            </button>
        </div>
    );
}

export default Header;
