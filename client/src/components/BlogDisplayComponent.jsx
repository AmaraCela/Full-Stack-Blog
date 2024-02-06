import laptop from "../assets/laptop.jpg";
import profile from "../assets/profile.png";
import "../styles/blogDisplay.css";
import {Link} from 'react-router-dom';
const BlogDisplay = () => {
    return (  
        <div className="relative blogs">
            <div className="w-3/4 pl-10 pr-10 pb-10 blog shadow-lg">
                <div className="flex flex-row items-end">
                <img src={profile} alt="" className="h-10"/>
                <Link to="" className="regular-font text-2xl ml-1">User</Link>
                </div>
                <img src={laptop} alt="laptop" className="mt-2 blog-img w-4/5"/>
                <p className="mt-2 regular-font">Here goes the title...</p>
                <p className="mt-2 regular-font">About #blog #blog #blog</p>
                <p className="mt-2 regular-font">Here goes a loooooooooooooooooooong description</p>
            </div>
        </div>
    );
}

export default BlogDisplay;