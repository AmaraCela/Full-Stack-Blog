import { Tag } from "../store/tag/tagSlice";
import "../styles/blogDisplay.css";
import { Link } from 'react-router-dom';

export interface BlogType {
    blogs: {
        id: string;
        user: string;
        image: string;
        profilePic: string;
        title: string;
        description: string;
        date: Date;
        tags: Tag[];
    }[];
}

const BlogDisplay = ({ blogs }: BlogType) => {
    console.log(blogs);
    return (
        <div className="blogs">
            {blogs.map((item) => (
                <Link to={`/blogs/${item.id}`} key={`blog-${item.id}`}>
                    <div className="blog">
                        <img src={`http://localhost:5000/${item.image.replace(/\\/g, '/')}`} alt="laptop" className="mt-2 blog-img h-full w-3/5" />
                        <div className="info p-2 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-row items-end">
                                    <img src={item.profilePic} alt="" className="h-14 blog-profile rounded-full w-14" />
                                    <p className="regular-font text-3xl font-semibold ml-1 blog-user">{item.user}</p>
                                </div>
                                <p className="mt-8 regular-font text-2xl font-bold blog-title">{item.title}</p>
                                <p className="regular-font mt-2 text-base italic blog-tags">Talks about {item.tags.map((tag) => ("#" + tag.tag_name + " "))}</p>
                                <p className="mt-8 regular-font text-xl blog-desc">{item.description.slice(0,50)}</p>
                            </div>
                            <p className="refular-font text-xl font-bold text-end date">Posted on: {item.date.getDate() + "/" + item.date.getMonth() + "/" + item.date.getFullYear()}</p>
                        </div>
                    </div>
                </Link>
            ))}

        </div>
    );
}

export default BlogDisplay;