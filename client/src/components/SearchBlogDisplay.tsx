import { Post } from "../types/blogTypes";
import profileImg from "../assets/profile.png";

const SearchBlogDisplay = ( post: Post ) => {
    return (
        <div>
            <div>
                <img src={profileImg} alt="" />
                <h1>Username</h1>
            </div>
        </div>
    );
}

export default SearchBlogDisplay;