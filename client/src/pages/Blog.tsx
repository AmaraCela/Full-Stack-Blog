import laptop from "../assets/laptop.png";
import blog from "../assets/blog.webp";
import "../styles/blog.css";
import { useEffect, useRef, useState } from "react";
import CarouselItem from "../components/CarouselItem.jsx";

const Blog = () => {

    const items = [
        {
            id:1,
            image:laptop
        },
        {
            id:2,
            image:blog
        },
    ]
    
    return (
        <div className="blog-details px-16">
            <h1 className="regular-font text-3xl mt-4 font-bold">Author · date posted </h1>
            {/* <div className="relative max-w-5xl">
                <div className="fade slidesDiv">
                    <img src={laptop} alt="" />
                </div>
                <div className="fade slidesDiv">
                    <img src={blog} alt="" />
                </div>
                <p className="prev navigation-button">&#10094;</p>
                <p className="next navigation-button">&#10095;</p>
                
            </div> */}
            
            <div className="carousel">
                <div className="inner">
                    {items.map((item)=>{
                        return <CarouselItem key={item.id} item={item}/>
                    })}
                </div>
            </div>
            <h1>Here goes the blog title</h1>
            <p>Talks about: #blog #tag #othertag</p>
            <p>Here will go a looooooooooooooooooooooooooooooooooooong description: 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt at nisl eu dapibus. In non velit lacinia, gravida urna eget, sagittis massa. Etiam massa tortor, tincidunt a accumsan in, pretium quis ex. Nam id libero maximus, egestas elit dapibus, hendrerit tellus. Aliquam ornare gravida odio, eget ultricies massa pharetra dictum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fringilla dignissim lacus. Nulla viverra justo vitae lectus facilisis, quis bibendum lorem laoreet.
            Sed nisi ligula, vulputate non pretium tincidunt, imperdiet sed nibh. Maecenas sed lacinia nibh, non efficitur arcu. Sed egestas, velit sit amet bibendum finibus, justo ex varius ante, et ullamcorper justo mauris et nibh. Nulla sed lacus semper lacus imperdiet efficitur. Mauris lobortis et dolor vel posuere. Ut consectetur dolor congue arcu hendrerit accumsan. Duis volutpat sapien a pulvinar molestie. Nullam mollis ipsum sodales blandit imperdiet. Vestibulum sodales malesuada condimentum. Donec fermentum nisi turpis, sit amet pellentesque purus facilisis sed. Aenean in dui ut neque euismod pellentesque. Quisque scelerisque nunc eget ex feugiat, quis tincidunt elit ullamcorper. Curabitur maximus bibendum mauris, eu egestas enim porttitor quis. Nullam tempor felis et bibendum pretium. Vivamus maximus molestie vehicula.
            </p>
        </div>
     );
}
 
export default Blog;