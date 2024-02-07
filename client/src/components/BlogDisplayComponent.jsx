import laptop from "../assets/laptop.jpg";
import profile from "../assets/profile.png";
import "../styles/blogDisplay.css";
import {Link} from 'react-router-dom';
const BlogDisplay = () => {
    return (  
        <div className="relative blogs">
            <div className="w-3/4 pl-10 pb-10 blog shadow-lg flex cursor-pointer">
                <div className="info w-3/4">
                <div className="flex flex-row items-end">
                    <img src={profile} alt="" className="h-10" />
                    <Link to="" className="regular-font text-2xl ml-1">User</Link>
                </div>
                <img src={laptop} alt="laptop" className="mt-2 blog-img h-3/4 w-full"/>
                <p className="mt-2 regular-font text-2xl font-bold">Here goes the title...</p>
                <p className="mt-2 regular-font">Here goes a looooooooooooooooooooooooooooooooooooooooooooong description...</p>
                </div>
                <div className="tags flex flex-col justify-start items-end">
                    <div className="sticky-tag">
                        <p className="w-full text-2xl pt-2">#blog</p>
                    </div>
                    <div className="sticky-tag">
                        <p className="w-full text-2xl pt-2">#tag</p>
                    </div>
                    <div className="sticky-tag">
                        <p className="w-full text-2xl pt-2">#othertag</p>
                    </div>
                    <div className="sticky-tag">
                        <p className="w-full text-2xl pt-2">#longertag</p>                      
                    </div>
                </div>
            </div>
            <div className="w-3/4 pl-10 pb-10 blog shadow-lg flex cursor-pointer">
                <div className="info w-3/4">
                <div className="flex flex-row items-end">
                    <img src={profile} alt="" className="h-10" />
                    <Link to="" className="regular-font text-2xl ml-1">User</Link>
                </div>
                <img src={laptop} alt="laptop" className="mt-2 blog-img h-3/4 w-full"/>
                <p className="mt-2 regular-font text-2xl font-bold">Here goes the title...</p>
                <p className="mt-2 regular-font">Here goes a looooooooooooooooooooooooooooooooooooooooooooong description...</p>
                </div>
                <div className="tags flex flex-col justify-start items-end">
                    <div className="sticky-tag">
                        <p className="w-full text-2xl pt-2">#blog</p>
                    </div>
                    <div className="sticky-tag">
                        <p className="w-full text-2xl pt-2">#tag</p>
                    </div>
                    <div className="sticky-tag">
                        <p className="w-full text-2xl pt-2">#othertag</p>
                    </div>
                    <div className="sticky-tag">
                        <p className="w-full text-2xl pt-2">#longertag</p>                      
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default BlogDisplay;