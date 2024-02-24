import profileImg from "../assets/profile.png";
import "../styles/navbar.css";
import search from "../assets/search.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../store/store';
import Dropdown from "./Dropdown";

const Navbar = () => {

    const isAuthenticated = useSelector((state: RootState) => state.user.isLoggedIn);

    return (
        <nav className="flex justify-between items-center nav">
            <Link to="/"><h1 className="title ml-16 mt-4">Chronicles</h1></Link>
            <div className="flex row mr-16 ml-10 mt-4">
                <div className="flex items-center search-bar">
                    <input className="mr-2 relative text-center h-9 rounded-md w-52 md:w-96 search-input pl-10" type="search" placeholder="Search..." style={{ backgroundImage: `url(${search})` }} />
                </div>
                {isAuthenticated ?
                    <div><img src={profileImg} alt="profile-img" className="w-12 h-12 cursor-pointer profile-link" /><Dropdown /></div> :
                    <Link to="/login"><button className="login-nav regular-font">Login</button></Link>}
            </div>
        </nav>
    )
}
export default Navbar;