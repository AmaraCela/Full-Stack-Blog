import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import "../styles/dropdown.css";
import { logoutUser } from "../store/auth/userSlice";

const Dropdown = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => state.user.id);
    
    const handleClick = () => {
        dispatch(logoutUser());
        navigate('/login');
    }

    return (
        <div className="absolute z-10 flex flex-col dropdown bg-white p-3 rounded-md">
            <Link to={`/profile/${userId}`} className="regular-font link">Profile</Link>
            <button className="regular-font mt-2 link" onClick={handleClick}>Logout</button>
        </div>
    );
}

export default Dropdown;