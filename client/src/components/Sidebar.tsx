import "../styles/sideBar.css";
import { FaPenToSquare } from "react-icons/fa6";
const Sidebar = () => {
    return ( 
    <div className="sidebar sticky flex flex-col items-center w-full justify-evenly ml-16 mr-16">
       <h1 className="regular-font font-bold text-xl text-center">Insipired to share your story?</h1>
       <div className="bg-[#FEFF9C] border-neutral-950 border-2 write flex justify-center items-center w-28 h-28 cursor-pointer">
        <FaPenToSquare className="h-20 w-16"/>
       </div>
    </div> 
    );
}
 
export default Sidebar;