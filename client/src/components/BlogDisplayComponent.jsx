import laptop from "../assets/laptop.jpg";
import profile from "../assets/profile.png";
import "../styles/blogDisplay.css";
import {Link} from 'react-router-dom';
const BlogDisplay = () => {
    return (  
        <div className="relative blogs">
            <div className="blog">
                <img src={laptop} alt="laptop" className="mt-2 blog-img h-full w-3/5"/>
                <div className="info p-2 flex flex-col justify-between">
                    <div>
                    <div className="flex flex-row items-end">
                        <img src={profile} alt="" className="h-14 blog-profile" />
                        <Link to="" className="regular-font text-3xl font-semibold ml-1 blog-user">User</Link>
                    </div>
                    <p className="mt-8 regular-font text-2xl font-bold blog-title">Here goes the title...</p>
                    <p className="regular-font mt-2 text-base italic blog-tags">Talks about #blog #tag #othertag</p>
                    <p className="mt-8 regular-font text-xl blog-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...</p>
                    </div>
                    <p className="refular-font text-xl font-bold text-end date">Posted on: date</p>
                    </div>
            </div>
            <div className="blog">
                <img src={laptop} alt="laptop" className="mt-2 blog-img h-full w-3/5"/>
                <div className="info p-2 flex flex-col justify-between">
                    <div>
                    <div className="flex flex-row items-end">
                        <img src={profile} alt="" className="h-14 blog-profile" />
                        <Link to="" className="regular-font text-3xl font-semibold ml-1 blog-user">User</Link>
                    </div>
                    <p className="mt-8 regular-font text-2xl font-bold blog-title">Here goes the title...</p>
                    <p className="regular-font mt-2 text-base italic blog-tags">Talks about #blog #tag #othertag</p>
                    <p className="mt-8 regular-font text-xl blog-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...</p>
                    </div>
                    <p className="refular-font text-xl font-bold text-end date">Posted on: date</p>
                    </div>
            </div>
             <div className="blog">
                <img src={laptop} alt="laptop" className="mt-2 blog-img h-full w-3/5"/>
                <div className="info p-2 flex flex-col justify-between">
                    <div>
                    <div className="flex flex-row items-end">
                        <img src={profile} alt="" className="h-14 blog-profile" />
                        <Link to="" className="regular-font text-3xl font-semibold ml-1 blog-user">User</Link>
                    </div>
                    <p className="mt-8 regular-font text-2xl font-bold blog-title">Here goes the title...</p>
                    <p className="regular-font mt-2 text-base italic blog-tags">Talks about #blog #tag #othertag</p>
                    <p className="mt-8 regular-font text-xl blog-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...</p>
                    </div>
                    <p className="refular-font text-xl font-bold text-end date">Posted on: date</p>
                    </div>
            </div>

        </div>
    );
}

export default BlogDisplay;