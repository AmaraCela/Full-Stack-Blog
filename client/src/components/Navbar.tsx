import profileImg from "../assets/profile.png";
import "../styles/navbar.css";
import search from "../assets/search.png";
 
const Navbar = () => {
    return ( 
        <nav className="flex justify-between items-center nav">
            <h1 className="title ml-4">Chronicles</h1>
            <div className="flex row mr-10 ml-10">
                <div className="flex items-center search-bar">
                    <img src={search} alt="" className="h-5 w-5 absolute z-10 ml-1"/>
                    <input className="mr-2 relative text-center h-9 rounded-md w-52 md:w-96" type="search" placeholder="Search..."/>
                </div>
                <img src={profileImg} alt="profile-img" className="w-12 h-12" />
            </div>
        </nav>
    )
}
export default Navbar;