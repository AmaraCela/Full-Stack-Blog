import { useParams } from "react-router-dom";
const Blog = () => {
    type Id = {
        id:string;
    }
    const {id} = useParams<Id>()
    return ( 
        
        <div className="blog-details">
            <h2>Blog details - {id}</h2>
        </div>
     );
}
 
export default Blog;