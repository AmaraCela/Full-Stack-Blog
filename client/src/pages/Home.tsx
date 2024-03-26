import "../styles/home.css";
import Wave from "../components/Wave";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { selectBlog, useAppDispatch } from "../store/store";
import BlogDisplay from "../components/BlogDisplay";
import { useEffect, useState } from "react";
import { getBlogs } from "../store/blog/blogThunk";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const blogs = useSelector(selectBlog).blog;
    const isLoading = useSelector(selectBlog).loading;
    const serverError = useSelector(selectBlog).serverError;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getBlogs({offset: ((currentPage-1)*4)}));
    }, [currentPage]);

    useEffect(() => {
        console.log(serverError);
    }, [serverError]);

    return (
        <><Wave/>
            <div className="home flex items-center flex-col relative mx-16 2xl:container 2xl:mx-auto">
                <div className="flex flex-row w-full home-main">
                    {blogs && blogs.length > 0 && blogs[0].post_id !== '' ? <BlogDisplay blogs={blogs} /> : <p className="regular-font text-2xl w-full mt-8">There don't seem to be any recent posts.</p>}
                    <Sidebar />
                </div>
                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            {isLoading && <Loading />}
            {serverError && navigate("/error")}
        </>
    );
}
export default Home;