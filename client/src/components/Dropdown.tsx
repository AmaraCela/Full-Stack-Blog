import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import "../styles/dropdown.css";

const Dropdown = () => {
    const userId = useSelector((state: RootState) => state.user.id);

    return (
        <div className="absolute z-10 flex flex-col dropdown bg-white p-3 rounded-md">
            <Link to={`/profile/${userId}`} className="regular-font link">Profile</Link>
            <Link to="/" className="regular-font mt-2 link">Logout</Link>
        </div>
    );
}

export default Dropdown;