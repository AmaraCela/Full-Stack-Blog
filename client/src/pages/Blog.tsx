import laptop from "../assets/laptop.png";
import blogImg from "../assets/blog.webp";
import "../styles/blog.css";
import { useEffect, useState } from "react";

interface Tag{
    id:number;
    name:string;
}

interface Blog {
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

const Blog = ({blog}:Blog) => { 

    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState<HTMLElement[]>([]);

    useEffect(() => {
        setImages(Array.from(document.querySelectorAll(".carousel-img")));
    }, []);
   
    const handleNavigation = (direction: "left"|"right")=>{
        if(direction == 'left')
        {
            setActiveIndex((previousIndex:number)=>{
                let newIndex:number;
                if(previousIndex==0)
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
                if(previousIndex==images.length-1)
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
            <h1 className="regular-font text-3xl mt-4 font-bold">{blog.author} · {blog.date.getDate()+"/"+blog.date.getMonth()+"/"+blog.date.getFullYear()} </h1>  
           
            <div className="carousel w-full flex justify-center items-center">
                <div className="p-4" onClick={()=>handleNavigation("left")}>
                    <p>&#10094;</p>
                </div>
                <div className="carousel-img">
                    <img src={laptop} alt="" />
                </div>
                <div className="carousel-img hidden">
                    <img src={blogImg} alt=""/>
                </div>
                <div className="p-4" onClick={()=>handleNavigation("right")}>
                    <p>&#10095;</p>
                </div>
            </div>

            <h1>{blog.title}</h1>
            <p>Talks about {blog.tags.map((tag)=>("#"+tag.name+" "))}</p>
            <p>{blog.description}</p>
        </div>
     );
}
export default Blog;