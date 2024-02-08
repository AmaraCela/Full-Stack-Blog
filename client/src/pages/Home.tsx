import "../styles/home.css"
import BlogDisplay from "../components/BlogDisplayComponent";
import TagsComponent from "../components/TagsComponent";
import Sidebar from "../components/Sidebar";
import profile from "../assets/profile.png";
import laptop from '../assets/laptop.jpg';

const tags = [
    {id:1, name:'blog'},
    {id:2, name:'tag'},
    {id:3, name:'othertag'}
]
const blogs = [
    {id:1,user:'User', image:laptop,profilePic:profile,title:"The title goes here...",description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...',
    date:new Date(), tags:tags},
    {id:1,user:'User', image:laptop,profilePic:profile,title:"The title goes here...",description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...',
    date:new Date(), tags:tags},
    {id:1,user:'User', image:laptop,profilePic:profile,title:"The title goes here...",description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...',
    date:new Date(), tags:tags}
];


const Home = () => {
    return (  
        <div className="home flex items-center flex-col">
            <TagsComponent/>
            <div className="flex flex-row w-full relative home-main">
                <BlogDisplay blogs={blogs}/>
                <Sidebar/>
            </div>
        </div>
    );
}
export default Home;