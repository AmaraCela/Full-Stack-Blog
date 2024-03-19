import "../styles/blog.css"; import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBlog, selectUser, useAppDispatch } from "../store/store";
import { deleteBlog, getIndividualBlog } from "../store/blog/blogThunk";
import { Link, useNavigate, useParams } from "react-router-dom";
import profilePic from "../assets/profileImg.png";
import edit from "../assets/edit-246.png";
import deleteImg from "../assets/delete.png";
import { resetState } from "../store/blog/blogSlice";

const Blog = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const blog = useSelector(selectBlog).blog;
    const user_id = useSelector(selectUser).id;
    const deleteSuccessful = useSelector(selectBlog).deleteSuccessful;
    const [activeIndex, setActiveIndex] = useState(0);
    const { post_id } = useParams();
    const [deleteVisibility, setDeleteVisibility] = useState('hidden');
    const [imageVisibility, setImageVisibility] = useState('hidden');

    useEffect(() => {
        dispatch(getIndividualBlog(post_id ?? ''));
    }, []);

    useEffect(() => {
        document.body.style.overflowY = imageVisibility === 'hidden' ? 'scroll' : 'hidden';
    }, [imageVisibility]);

    useEffect(() => {
        dispatch(resetState());
        deleteSuccessful && navigate('/');
    }, [deleteSuccessful]);

    const handleNavigation = (direction: "left" | "right") => {

        let newIndex = 0;
        const imagesLength = blog[0].images.length - 1;

        if (direction === 'right' && activeIndex < imagesLength) {
            newIndex = (activeIndex + 1)
        } else if (direction === 'left' && activeIndex === 0) {
            newIndex = imagesLength
        } else if (direction === 'left' && activeIndex > 0) {
            newIndex = (activeIndex - 1)
        }

        setActiveIndex(newIndex);
    }

    const handleDelete = () => {
        dispatch(deleteBlog(blog[0].post_id));
    }


    return (
        <>
            {blog && blog.length > 0 && (
                <div className={`absolute w-full h-full bg-black object-fill top-0 flex justify-center items-center z-50 ${imageVisibility}`}>
                    {blog[0].images.length > 1 && <button className="p-4 cursor-pointer mr-1 prev md:static md:text-white absolute z-20 left-1 text-white" onClick={() => handleNavigation("left")}>
                        <p>&#10094;</p>
                    </button>}
                    {blog[0].images && blog[0].images.length > 0 && (

                        <img className=" max-h-full" src={`http://localhost:5000/${blog[0].images[activeIndex].replace(/\\/g, '/')}`} alt="" />

                    )}
                    {blog[0].images.length > 1 && <button className="p-4 cursor-pointer ml-1 next md:static md:text-white absolute z-20 right-1 text-white" onClick={() => handleNavigation("right")}>
                        <p>&#10095;</p>
                    </button>}
                    <button title="remove full scr" onClick={() => setImageVisibility('hidden')} className="absolute top-1 font-extrabold right-5 text-white regular-font text-2xl">X</button>
                </div>
            )}

            <div className={`blog-details md:px-16 px-8 2xl:container 2xl:mx-auto relative`}>
                <div className="carousel w-full flex justify-center items-center relative md:static md:p-6">

                    {blog[0].images.length > 1 && <button className="p-4 cursor-pointer mr-1 prev md:static md:text-black absolute z-20 left-1 text-white" onClick={() => handleNavigation("left")}>
                        <p>&#10094;</p>
                    </button>}

                    {blog[0].images.map((image, index) => (
                        <button title="Click to expand" onClick={() => { window.scrollTo(0, 0); setImageVisibility('') }} className={`carousel-img relative ${index !== activeIndex ? 'hidden' : ''}`} key={image}>
                            <img src={`http://localhost:5000/${image.replace(/\\/g, '/')}`} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}

                    {blog[0].images.length > 1 && <button className="p-4 cursor-pointer ml-1 next md:static md:text-black absolute z-20 right-1 text-white" onClick={() => handleNavigation("right")}>
                        <p>&#10095;</p>
                    </button>}
                </div>

                {user_id === blog[0].user_id ? <div className="flex justify-end">
                    <Link to={`../editBlog/${blog[0].post_id}`}><img src={edit} alt="" className="w-8" /></Link>
                    <button onClick={() => { setDeleteVisibility('flex'); }}><img src={deleteImg} alt="" className="w-7 h-7" /></button>
                </div> : ''}

                <div className="flex items-center justify-between">
                    <Link to={`../profile/${blog[0].user_id}`}>
                        <div className="flex items-center">
                            <div className="overflow-hidden h-16 w-16 rounded-full border-2 border-black">
                                <img src={blog[0].profile_img ? `http://localhost:5000/${blog[0].profile_img.replace(/\\/g, '/')}` : profilePic} alt="" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="regular-font text-2xl font-semibold ml-4">{blog[0].username}</h1>
                        </div>
                    </Link>
                    <p className="regular-font italic text-lg">posted on {`${new Date(blog[0].date_posted).getDate()}/${new Date(blog[0].date_posted).getMonth()}/${new Date(blog[0].date_posted).getFullYear()}`}</p>
                </div>

                <hr className="border-black border-2 mt-2" />

                <h1 className="regular-font text-3xl font-bold mt-8">{blog[0].title}</h1>
                <p className="mt-2 regular-font text-base italic">Talks about {blog[0].tags.map((tag) => ("#" + tag.tag_name + " "))}</p>
                <p className="mt-8 regular-font text-xl blog-description">{blog[0].description}</p>

                <div className={`absolute w-11/12 h-full top-0 flex items-center justify-center ${deleteVisibility}`}>
                    <div className="self-center bg-white p-5 rounded-md info-box">
                        <p className="regular-font font-bold">Are you sure you want to delete this blog?</p>
                        <p className="regular-font italic text-sm mt-2 text-red-800">This action can not be undone.</p>
                        <div className="flex justify-between regular-font mt-3">
                            <button onClick={() => handleDelete()}
                                className="rounded-md bg-red-600 hover:bg-red-800 p-2 text-white w-1/2">Delete</button>
                            <button onClick={() => setDeleteVisibility('hidden')} className="ml-2 rounded-md border-black border-2 p-2 w-1/2 hover:bg-gray-200">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Blog;