import profileImg from "../assets/profile.png";
import "../styles/navbar.css";
import search from "../assets/search.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../store/store';
import Dropdown from "./Dropdown";

const Navbar = () => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isLoggedIn);
    const location = useLocation();
    const isRootPath = location.pathname === '/';

    return (
        <nav className="flex justify-between items-end nav flex-col">
            <div className="flex w-full justify-between items-center">
                <Link to="/"><h1 className="title ml-16 mt-4">Chronicles</h1></Link>
                <div className="flex row mr-16 ml-10 mt-4">
                    {isAuthenticated ?
                        <div><img src={profileImg} alt="profile-img" className="w-12 h-12 cursor-pointer profile-link" /><Dropdown /></div> :
                        <Link to="/login"><button className="login-nav regular-font">Login</button></Link>}
                </div>
            </div>

            {isRootPath && <div className="flex items-center search-bar mx-16">
                <input className="relative text-center h-9 rounded-md w-52 md:w-96 search-input pl-10 place-items-end" type="search" placeholder="Search..." style={{ backgroundImage: `url(${search})` }} />
            </div>}
        </nav>
    )
}
export default Navbar;