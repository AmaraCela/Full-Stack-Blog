import { useEffect, useState } from "react";
import SearchBlogDisplay from "../components/SearchBlogDisplay";
import { useSelector } from "react-redux";
import { selectSearchBlog, useAppDispatch } from "../store/store";
import { searchBlog } from "../store/blogSearch/blogSearchThunks";

const SearchResult = () => {
    const [keyword, setKeyword] = useState('a');
    const dispatch = useAppDispatch();
    const blogs = useSelector(selectSearchBlog);
    const blogsByUser = blogs.blogsByUser;
    const blogsByTitle = blogs.blogsByTitle;
    const blogsByDescription = blogs.blogsByDescription;
    const blogsByTag = blogs.blogsByTag;

    console.log(blogsByUser);
    useEffect(() => {
        dispatch(searchBlog({keyword}));
    }, []);

    return (
        <div>
            <h1>Showing results for "{keyword}" </h1>
            {blogsByUser.map((blog) => (<SearchBlogDisplay {...blog} />))}
        </div>
    );
}

export default SearchResult;