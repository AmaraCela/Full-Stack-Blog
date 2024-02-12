import "../styles/blogDisplay.css";
import {Link} from 'react-router-dom';

interface Tag{
    id:number;
    name:string;
}
interface BlogType{
    blogs:{
        id:number;
        user:string;
        image:string;
        profilePic:string;
        title:string;
        description:string;
        date:Date;
        tags:Tag[];
    }[];
}
const BlogDisplay = ({blogs}:BlogType) => {
    return (  
        <div className="blogs">
            {blogs.map((item)=>(
                <div className="blog" key={item.id}>
                   <img src={item.image} alt="laptop" className="mt-2 blog-img h-full w-3/5"/>
                   <div className="info p-2 flex flex-col justify-between">
                    <div>
                    <div className="flex flex-row items-end">
                        <img src={item.profilePic} alt="" className="h-14 blog-profile rounded-full w-14" />
                        <Link to="" className="regular-font text-3xl font-semibold ml-1 blog-user">{item.user}</Link>
                    </div>
                    <p className="mt-8 regular-font text-2xl font-bold blog-title">{item.title}</p>
                    <p className="regular-font mt-2 text-base italic blog-tags">Talks about {item.tags.map((tag)=>("#"+tag.name+" "))}</p>
                    <p className="mt-8 regular-font text-xl blog-desc">{item.description}</p>
                    </div>
                    <p className="refular-font text-xl font-bold text-end date">Posted on: {item.date.getDate()+"/"+item.date.getMonth()+"/"+item.date.getFullYear()}</p>
                </div>
                </div>
            ))}   

        </div>
    );
}

export default BlogDisplay;