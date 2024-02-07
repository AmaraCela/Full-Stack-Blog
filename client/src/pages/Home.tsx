import "../styles/home.css"
import BlogDisplay from "../components/BlogDisplayComponent";
import TagsComponent from "../components/TagsComponent";
import Sidebar from "../components/Sidebar";
const Home = () => {
    return (  
        <div className="home flex items-center flex-col">
            <TagsComponent/>
            <div className="flex flex-row w-full relative home-main">
                <BlogDisplay/>
                <Sidebar/>
            </div>
        </div>
    );
}
export default Home;