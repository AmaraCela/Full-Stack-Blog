// import "../styles/home.css"
import BlogDisplay from "../components/BlogDisplayComponent";
import TagsComponent from "../components/TagsComponent";
const Home = () => {
    return (  
        <div className="home flex items-center flex-col">
            <TagsComponent/>
            <BlogDisplay/>
        </div>
    );
}
export default Home;