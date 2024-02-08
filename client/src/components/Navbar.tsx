import profileImg from "../assets/profile.png";
import "../styles/navbar.css";
import search from "../assets/search.png";
 
const Navbar = () => {
    return ( 
        <nav className="flex justify-between items-center nav">
            <h1 className="title ml-16 mt-4">Chronicles</h1>
            <div className="flex row mr-16 ml-10 mt-4">
                <div className="flex items-center search-bar">
                    <input className="mr-2 relative text-center h-9 rounded-md w-52 md:w-96 search-input pl-10"  type="search" placeholder="Search..." style={{ backgroundImage: `url(${search})` }}/>
                </div>
                <img src={profileImg} alt="profile-img" className="w-12 h-12 cursor-pointer" />
            </div>
        </nav>
    )
}
export default Navbar;