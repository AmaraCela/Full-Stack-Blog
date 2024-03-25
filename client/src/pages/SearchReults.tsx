import { useEffect, useState } from "react";
import SearchBlogDisplay from "../components/SearchBlogDisplay";
import { useSelector } from "react-redux";
import { selectSearchBlog, useAppDispatch } from "../store/store";
import { searchBlog } from "../store/blogSearch/blogSearchThunks";
import { useParams } from "react-router-dom";


const SearchResult = () => {
    const dispatch = useAppDispatch();
    const blogs = useSelector(selectSearchBlog);
    const blogsByUser = blogs.blogsByUser;
    const blogsByTitle = blogs.blogsByTitle;
    const blogsByDescription = blogs.blogsByDescription;
    const blogsByTag = blogs.blogsByTag;
    const [blogsToDisplay, setBlogsToDisplay] = useState(blogsByUser);
    const { keyword } = useParams();
    const [activeTab, setActiveTab] = useState('users');


    useEffect(() => {
        setBlogsToDisplay(blogsByUser);
    }, [blogs]);

    useEffect(() => {
        keyword && dispatch(searchBlog({ keyword }));
    }, [keyword]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex regular-font justify-start flex-wrap w-3/4">
                <button className={`setting-bt p-2 rounded-md ${activeTab === 'users' ? 'bg-[#acc1e6] text-white' : ''}`} onClick={() => { setActiveTab('users'); setBlogsToDisplay(blogsByUser) }}>{`Users (${blogsByUser.length})`}</button>
                <button className={`setting-bt p-2 rounded-md ${activeTab === 'titles' ? 'bg-[#acc1e6] text-white' : ''}`} onClick={() => { setActiveTab('titles'); setBlogsToDisplay(blogsByTitle) }}>{`Title (${blogsByTitle.length})`}</button>
                <button className={`setting-bt p-2 rounded-md ${activeTab === 'descriptions' ? 'bg-[#acc1e6] text-white' : ''}`} onClick={() => { setActiveTab('descriptions'); setBlogsToDisplay(blogsByDescription) }}>{`Description (${blogsByDescription.length})`}</button>
                <button className={`setting-bt p-2 rounded-md ${activeTab === 'tags' ? 'bg-[#acc1e6] text-white' : ''}`} onClick={() => { setActiveTab('tags'); setBlogsToDisplay(blogsByTag) }}>{`Tags (${blogsByTag.length})`}</button>
            </div>
            <hr className="w-3/4 border-black" />
            <h1 className="regular-font mt-4 w-3/4 text-left">Showing results for "{keyword}". </h1>
            <div className="flex flex-col items-center mt-4 w-3/4">
                {blogsToDisplay.length > 0 ? blogsToDisplay.map((blog) => (<SearchBlogDisplay key={blog.post_id} post={blog} keyword={keyword ?? ''} />)) : (
                    <p className="regular-font italic text-red-700">
                        There are no results for "{keyword}" in {activeTab}.
                    </p>
                )}
            </div>

        </div>
    );
}

export default SearchResult;