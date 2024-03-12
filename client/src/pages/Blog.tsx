import "../styles/blog.css"; import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBlog, useAppDispatch } from "../store/store";
import { getIndividualBlog } from "../store/blog/blogThunk";
import { useParams } from "react-router-dom";


const Blog = () => {

    const dispatch = useAppDispatch();
    const blog = useSelector(selectBlog).blog;
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState<HTMLElement[]>([]);
    const { post_id } = useParams();

    useEffect(() => {
        setImages(Array.from(document.querySelectorAll(".carousel-img")));
        dispatch(getIndividualBlog(post_id ?? ''));
    }, []);

    const handleNavigation = (direction: "left" | "right") => {

        let newIndex = 0;
        const imagesLength = images.length - 1;

        if (direction === 'right' && activeIndex < imagesLength) {
            newIndex = (activeIndex + 1)
        } else if (direction === 'left' && activeIndex === 0) {
            newIndex = imagesLength
        } else if (direction === 'left' && activeIndex > 0) {
            newIndex = (activeIndex - 1)
        }

        images[activeIndex].style.display = "none";
        images[newIndex].style.display = "block";

        setActiveIndex(newIndex);
    }

    return (
        <div className="blog-details md:px-16 px-8 2xl:container 2xl:mx-auto">
            <div className="carousel w-full flex justify-center items-center relative md:static md:p-6">

                {blog.posts[0].images.length > 1 && <button className="p-4 cursor-pointer mr-1 prev md:static md:text-black absolute z-20 left-1 text-white" onClick={() => handleNavigation("left")}>
                    <p>&#10094;</p>
                </button>}

                {blog.posts[0].images.map((image, index) => (
                    <div className={`carousel-img relative ${index !== 0 ? 'hidden' : ''}`} key={image}>
                        <img src={`http://localhost:5000/${image.replace(/\\/g, '/')}`} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}

                {blog.posts[0].images.length > 1 && <button className="p-4 cursor-pointer ml-1 next md:static md:text-black absolute z-20 right-1 text-white" onClick={() => handleNavigation("right")}>
                    <p>&#10095;</p>
                </button>}

            </div>
            <h1 className="regular-font text-3xl font-bold mt-8">{blog.posts[0].title}</h1>
            <p className="mt-2 regular-font text-base italic">Talks about {blog.posts[0].tags.map((tag) => ("#" + tag.tag_name + " "))}</p>
            <p className="mt-8 regular-font text-xl blog-description">{blog.posts[0].description}</p>
        </div>
    );
}
export default Blog;