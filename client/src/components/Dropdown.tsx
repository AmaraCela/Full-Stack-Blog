import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser, useAppDispatch } from "../store/store";
import "../styles/dropdown.css";
import { logoutUser } from "../store/auth/userSlice";

const Dropdown = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = useSelector(selectUser).id;

    
    const handleClick = () => {
        dispatch(logoutUser());
        navigate('/login');
    }

    return (
        <div className="absolute z-10 flex flex-col dropdown w-full items-center bg-white mt-3 p-3 rounded-md">
            <Link to={`/profile/${userId}`} className="regular-font link text-lg">Profile</Link>
            <button className="regular-font mt-2 link text-lg" onClick={handleClick}>Logout</button>
        </div>
    );
}

export default Dropdown;