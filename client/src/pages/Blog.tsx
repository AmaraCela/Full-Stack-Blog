import "../styles/blog.css"; import { useEffect, useState } from "react";
import lake from "../assets/lake.avif";
import personalBlog from "../assets/personal-blog.jpg";
import profile from "../assets/profile.png";

interface Tag {
    id: number;
    name: string;
}

interface BlogType {
    id: number;
    author: string;
    profilePic: string;
    date: Date;
    title: string;
    description: string;
    tags: Tag[];
    images: string[];
}

const Blog = () => {

    const tags: Tag[] = [
        { id: 1, name: 'blog' },
        { id: 2, name: 'tag' },
        { id: 3, name: 'othertag' }];

    const blog: BlogType = {
        id: 1,
        author: 'user',
        profilePic: profile,
        date: new Date(),
        title: "Here goes the title",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut leo elementum, scelerisque justo eget, consequat leo. Nam eget aliquet sapien, vitae varius augue. Etiam commodo auctor turpis sit amet facilisis. Fusce sagittis, ipsum non faucibus cursus, purus magna ultrices dui, sed maximus odio urna eget lorem. Fusce cursus sodales magna at malesuada. Donec suscipit arcu sit amet turpis gravida, nec vulputate lacus iaculis. Curabitur vitae urna ut elit pharetra tincidunt. Aliquam sollicitudin nulla pulvinar egestas ullamcorper. Fusce neque lectus, sagittis sit amet tempus id, mollis sed neque. Fusce pulvinar leo ac ex euismod, sit amet pretium nibh scelerisque. Fusce ligula ante, congue sed libero sed, feugiat egestas odio. Donec fringilla vehicula ipsum, nec ornare velit. Curabitur pulvinar fringilla nibh quis efficitur.",
        tags: tags,
        images: [lake, personalBlog]
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState<HTMLElement[]>([]);

    useEffect(() => {
        setImages(Array.from(document.querySelectorAll(".carousel-img")));
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
        <div className="blog-details px-16">
            <div className="carousel w-full flex justify-center items-center p-5">

                <button className="p-4 cursor-pointer mr-1 prev" onClick={() => handleNavigation("left")}>
                    <p>&#10094;</p>
                </button>

                {blog.images.map((image, index) => (
                    <div className={`carousel-img ${index !== 0 ? 'hidden' : ''}`} key={image}>
                        <img src={image} alt="" className="w-full" />
                    </div>
                ))}

                <button className="p-4 cursor-pointer ml-1 next" onClick={() => handleNavigation("right")}>
                    <p>&#10095;</p>
                </button>

            </div>
            <h1 className="regular-font text-3xl font-bold mt-8">{blog.title}</h1>
            <p className="mt-2 regular-font text-base italic">Talks about {blog.tags.map((tag) => ("#" + tag.name + " "))}</p>
            <p className="mt-8 regular-font text-xl blog-description">{blog.description}</p>
        </div>
    );
}
export default Blog;