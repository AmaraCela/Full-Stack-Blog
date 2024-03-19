import profileImg from "../assets/profile.png";
import "../styles/navbar.css";
import search from "../assets/search.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from '../store/store';
import Dropdown from "./Dropdown";

const Navbar = () => {
    const isAuthenticated = useSelector(selectUser).isLoggedIn;
    const username = useSelector(selectUser).username;
    const profile = useSelector(selectUser).profileImg;
    const location = useLocation();

    const isRootPath = location.pathname === '/';

    return (
        <nav className="flex justify-between items-center nav flex-col mx-16 2xl:container 2xl:mx-auto">
            <div className="flex justify-between w-full items-center">
                <Link to="/"><h1 className="title">Chronicles</h1></Link>
                {isAuthenticated ?
                    <div className="relative">
                        <div className="flex items-end profile-link cursor-pointer">
                            <div className="rounded-full overflow-clip w-12 h-12 border-2 border-black">
                                <img src={profile ? `http://localhost:5000/${profile.replace(/\\/g, '/')}` : profileImg} alt="profile-img" className="w-full h-full object-cover" />
                            </div>
                            <p className="regular-font text-2xl pl-1 hidden sm:block">{username}</p>
                        </div>
                        <Dropdown />
                    </div> :
                    <Link to="/login" className="w-fit sm:w-1/5"><button className="login-nav regular-font">Login</button></Link>}
            </div>
            {isRootPath && <div className="flex items-center search-bar w-full justify-center">
                <input className="relative text-center h-9 rounded-md w-96 search-input pl-10 place-items-end" type="search" placeholder="Search..." style={{ backgroundImage: `url(${search})` }} />
            </div>}
        </nav>
    )
}
export default Navbar;