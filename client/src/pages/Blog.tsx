import { useParams } from "react-router-dom";
import laptop from "../assets/laptop.png";
const Blog = () => {
    type Id = {
        id:string;
    }
    const {id} = useParams<Id>()
    return (
        <div className="blog-details">
            <h1>Author · date posted </h1>
            <img src={laptop} alt="" />
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