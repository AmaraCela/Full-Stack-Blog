import { Post } from "../types/blogTypes";
import ProfileImage from "./ProfileImage";
import "../styles/searchBlogDisplay.css";
import { Link } from "react-router-dom";

const SearchBlogDisplay = (post: Post) => {
    return (
        <Link to={`/blogs/${post.post_id}`} className="rounded-md search-blog-div w-3/4 flex search-blog-div bg-white p-2 mt-2">
            <ProfileImage size={16} image={post.profile_img ?? null} />
            <div className="px-2">
                <div className="flex justify-between items-baseline">
                    <h1 className="regular-font text-xl font-semibold">{post.username}</h1>
                    <p className="regular-font italic ml-2 text-sm">{post.date_posted}</p>
                </div>
                {/* <hr className="search-hr border-black" /> */}
                <h1 className="regular-font">{post.title}</h1>
                <p className="regular-font">{post.description}</p>
            </div>
        </Link>
    );
}
export default SearchBlogDisplay;