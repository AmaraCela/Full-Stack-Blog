import { Post } from "../types/blogTypes";
import ProfileImage from "./ProfileImage";
import "../styles/searchBlogDisplay.css";
import { Link } from "react-router-dom";

const SearchBlogDisplay = ({ post, keyword }: { post: Post, keyword: string }) => {
    const userIndex = post.username.indexOf(keyword);
    const titleIndex = post.title.indexOf(keyword);
    const descriptionIndex = post.description.indexOf(keyword);


    return (
        <Link to={`/blogs/${post.post_id}`} className="rounded-md search-blog-div w-full flex search-blog-div bg-white p-2 mt-2">
            <ProfileImage size={16} image={post.profile_img ?? null} />
            <div className="px-2">
                <div className="flex justify-between items-baseline">
                    <h1 className="regular-font text-xl font-semibold">{post.username.substring(0, userIndex)}{userIndex > -1 ? <p className="bg-[#ffc6002e] inline">{post.username.substring(userIndex, keyword.length)}</p> : ''}{post.username.substring(userIndex + keyword.length, post.username.length)}</h1>
                    <p className="regular-font italic ml-2 text-sm">{new Date(post.date_posted).getDay()}/{new Date(post.date_posted).getMonth()}/{new Date(post.date_posted).getFullYear()}</p>
                </div>
                <h1 className="regular-font">{post.title}</h1>
                <p className="regular-font">{post.description}</p>
                <p className="regular-font">Talks about: {post.tags.map(tag => (
                    `#${tag.tag_name}`
                ))}</p>
            </div>
        </Link>
    );
}
export default SearchBlogDisplay;