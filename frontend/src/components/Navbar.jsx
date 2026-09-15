import { FaBookOpen, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
    const firstName = user?.name
        ? user.name.trim().split(" ")[0]
        : "";

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <FaBookOpen />
                <h2>Book Library</h2>
            </div>

            <div className="navbar-right">
                <span className="navbar-user">
                    Welcome, {firstName}
                </span>

                <button
                    className="logout-button"
                    onClick={onLogout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;