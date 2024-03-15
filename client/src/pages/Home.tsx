import "../styles/home.css";
import Wave from "../components/Wave";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { selectBlog, useAppDispatch } from "../store/store";
import BlogDisplay from "../components/BlogDisplay";
import { useEffect } from "react";
import { getBlogs } from "../store/blog/blogThunk";

const Home = () => {
    const dispatch = useAppDispatch();
    const blogs = useSelector(selectBlog).blog;

    useEffect(() => {
        dispatch(getBlogs({offset: 1}));
    }, []);


    return (
        <><Wave/>
            <div className="home flex items-center flex-col relative mx-16 2xl:container 2xl:mx-auto">
                <div className="flex flex-row w-full home-main">
                    {blogs && blogs.length > 0 && <BlogDisplay blogs={blogs} />}
                    <Sidebar />
                </div>
                <Pagination />
            </div>
        </>
    );
}
export default Home;