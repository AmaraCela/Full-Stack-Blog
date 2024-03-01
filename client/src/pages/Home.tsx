import "../styles/home.css"
import BlogDisplay from "../components/BlogDisplay";
import Wave from "../components/Wave";
import Sidebar from "../components/Sidebar";
import profile from "../assets/profile.png";
import laptop from '../assets/laptop.jpg';
import Pagination from "../components/Pagination";
import personalBlog from "../assets/personal-blog.jpg";
import lake from "../assets/lake.avif";

const tags = [
    { id: 1, name: 'blog' },
    { id: 2, name: 'tag' },
    { id: 3, name: 'othertag' }
]

const blogs = [
    {
        id: 1, user: 'User', image: personalBlog, profilePic: profile, title: "The title goes here...", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...',
        date: new Date(), tags: tags
    },
    {
        id: 2, user: 'User', image: laptop, profilePic: profile, title: "The title goes here...", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...',
        date: new Date(), tags: tags
    },
    {
        id: 3, user: 'User', image: lake, profilePic: profile, title: "The title goes here...", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...',
        date: new Date(), tags: tags
    }
];

const Home = () => {
    return (
        <><Wave/>
            <div className="home flex items-center flex-col relative mx-16 2xl:container 2xl:mx-auto">
                <div className="flex flex-row w-full home-main">
                    <BlogDisplay blogs={blogs} />
                    <Sidebar />
                </div>
                <Pagination />
            </div>
        </>
    );
}
export default Home;