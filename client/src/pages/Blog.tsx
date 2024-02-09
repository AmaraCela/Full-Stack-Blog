import laptop from "../assets/laptop.png";
import blogImg from "../assets/blog.webp";
import "../styles/blog.css";
import { useEffect, useState } from "react";

interface Tag{
    id:number;
    name:string;
}

interface BlogType {
    blog:{
    id:number;
    author:string;
    profilePic:string;
    date:Date;
    title:string;
    description:string;
    tags:Tag[];
    images:string[];
    }
}

const Blog = ({blog}:BlogType) => { 

    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState<HTMLElement[]>([]);

    useEffect(() => {
        setImages(Array.from(document.querySelectorAll(".carousel-img")));
    }, []);
   
    const handleNavigation = (direction: "left"|"right")=>{
        if(direction === 'left')
        {
            setActiveIndex((previousIndex:number)=>{
                let newIndex:number;
                if(previousIndex===0)
                {
                    newIndex = images.length-1;
                }
                else
                {
                    newIndex = previousIndex-1;
                }
                images[previousIndex].style.display = "none";
                images[newIndex].style.display = "block";
                return newIndex;
            })
        }
        else{
            setActiveIndex((previousIndex:number)=>{
                let newIndex;
                if(previousIndex===images.length-1)
                {
                    newIndex=0;
                }
                else
                {
                    newIndex = previousIndex+1;
                }
                images[previousIndex].style.display = "none";
                images[newIndex].style.display = "block";
                return newIndex;     
            })
        }
    }
    return (
        <div className="blog-details px-16">
            <div className="carousel w-full flex justify-center items-center p-5 bg-black">
                <div className="p-4 cursor-pointer mr-1 prev" onClick={()=>handleNavigation("left")}>
                    <p>&#10094;</p>
                </div>
                <div className="carousel-img">
                    <img src={laptop} alt="" className="w-full"/>
                </div>
                <div className="carousel-img hidden">
                    <img src={blogImg} alt="" className="w-full"/>
                </div>
                <div className="p-4 cursor-pointer ml-1 next" onClick={()=>handleNavigation("right")}>
                    <p>&#10095;</p>
                </div>
            </div>
            <h1 className="regular-font text-3xl font-bold mt-8">{blog.title}</h1>
            <p className="mt-2 regular-font text-base italic">Talks about {blog.tags.map((tag)=>("#"+tag.name+" "))}</p>
            <p className="mt-8 regular-font text-xl blog-description">{blog.description}</p>
        </div>
     );
}
export default Blog;