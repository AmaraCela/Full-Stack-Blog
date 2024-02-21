import { Link } from "react-router-dom";
import "../styles/sideBar.css";
import { FaPenToSquare } from "react-icons/fa6";

const Sidebar = () => {
    return (
        <div className="sidebar sticky flex flex-col items-center w-full justify-end mr-16">
            <h1 className="regular-font font-bold lg:text-xl text-center inspired-text">Share your story?</h1>
            <Link to="/create">
                <div className="border-neutral-950 border-2 write flex justify-center items-center lg:w-28 lg:h-28 cursor-pointer rounded-md mt-8" title="Create Blog">
                    <FaPenToSquare className="lg:h-20 lg:w-16 pen-icon" />
                </div>
            </Link>
        </div>
    );
}

export default Sidebar;