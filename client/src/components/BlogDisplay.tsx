import "../styles/blogDisplay.css";
import { Link } from 'react-router-dom';
import { Post } from "../types/blogTypes";
import profileImg from "../assets/profile.png";


const BlogDisplay = ({ blogs }: { blogs: Post[] }) => {
    console.log(blogs);
    return (
        <div className="blogs">
            {blogs.map((item) => (
                <Link to={`/blogs/${item.post_id}`} key={`blog-${item.post_id}`}>
                    <div className="blog">
                        <img src={`http://localhost:5000/${item.images[0].replace(/\\/g, '/')}`} alt="laptop" className="mt-2 blog-img h-full w-3/5" />
                        <div className="info p-2 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-row items-end">
                                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-black">
                                        <img src={item.profile_img ? `http://localhost:5000/${item.profile_img.replace(/\\/g, '/')}` : profileImg} alt="" className="blog-profile h-full w-full object-cover" />
                                    </div>
                                    
                                    <p className="regular-font text-3xl font-semibold ml-1 blog-user">{item.username}</p>
                                </div>
                                <p className="mt-8 regular-font text-2xl font-bold blog-title">{item.title}</p>
                                <p className="regular-font mt-2 text-base italic blog-tags">Talks about {item.tags.map((tag) => ("#" + tag.tag_name + " "))}</p>
                                <p className="mt-8 regular-font text-xl blog-desc">{item.description.slice(0,50)}</p>
                            </div>
                            <p className="refular-font text-xl font-bold text-end date">Posted on: {new Date(item.date_posted).getDate() + "/" + new Date(item.date_posted).getMonth() + "/" + new Date(item.date_posted).getFullYear()}</p>
                        </div>
                    </div>
                </Link>
            ))}

        </div>
    );
}

export default BlogDisplay;