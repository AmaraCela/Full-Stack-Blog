import "../styles/tagscomponent.css"
import laptop from '../assets/laptop1.jpg'
const TagsComponent = () => {
    return ( 
        <>
        <h1 className="title w-80 text-center relative inspire">
            Inspire and get insipred.
        </h1>
        <img src={laptop} alt=""  className="h-96 relative laptop-img"/>
        <div className="relative flex flex-row tags w-max justify-evenly bottom-16">
            <div className="tag">
                All
            </div>
            <div className="tag">
                #blog
            </div>            
            <div className="tag">
                #blog
            </div>            
            <div className="tag">
                #blog
            </div>
            <div className="tag">
                #blog
            </div>
            <div className="tag">
                #blog
            </div>
            <div className="tag">
                #blog
            </div>
            <div className="tag">
                #blog
            </div>
            <div className="tag">
                #blog
            </div>
            <div className="tag">
                #blog
            </div>
        </div>
        
        
        </>
     );
}
 
export default TagsComponent;