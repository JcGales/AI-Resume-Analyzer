import { Link } from "react-router";

const Navbar = () => {
    return (
        <header className="w-full py-4 px-6 fixed top-0 left-0 z-50 bg-transparent">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Brand */}
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    JobTune
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    <Link to="/upload" className="text-white hover:text-blue-300 transition-colors">
                        Upload
                    </Link>
                    <Link
                        to="/upload"
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                        Get Started
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;