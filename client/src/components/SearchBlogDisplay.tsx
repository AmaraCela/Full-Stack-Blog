import { Post } from "../types/blogTypes";
import ProfileImage from "./ProfileImage";
import "../styles/searchBlogDisplay.css";

const SearchBlogDisplay = (post: Post) => {
    return (
        <div className="rounded-md search-blog-div w-3/4 flex search-blog-div bg-white p-2">
            <ProfileImage size={16} image={post.profile_img ?? null} />
            <div className="px-2">
                <h1 className="regular-font text-xl font-semibold">{post.username}</h1>
                <hr className="search-hr border-black" />
                <h1 className="regular-font">{post.title}</h1>
                <p className="regular-font">{post.description}</p>
            </div>
        </div>
    );
}

export default SearchBlogDisplay;