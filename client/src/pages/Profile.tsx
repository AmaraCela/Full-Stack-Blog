import BlogDisplayComponent from "../components/BlogDisplay";
import profileImg from "../assets/profileImg.png";
import "../styles/profile.css";
import profile from "../assets/profile.png";
import laptop from '../assets/laptop.jpg';
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
    const userId = useSelector((state: RootState) => state.user.id)
    const { id } = useParams();

    const tags = [
        { id: 1, name: 'blog' },
        { id: 2, name: 'tag' },
        { id: 3, name: 'othertag' }
    ];

    const blogs = [
        {
            id: 1, user: 'User', image: laptop, profilePic: profile, title: "The title goes here...", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...',
            date: new Date(), tags: tags
        },
        {
            id: 2, user: 'User', image: laptop, profilePic: profile, title: "The title goes here...", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...',
            date: new Date(), tags: tags
        },
        {
            id: 3, user: 'User', image: laptop, profilePic: profile, title: "The title goes here...", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus eu lectus id gravida...',
            date: new Date(), tags: tags
        }
    ];

    return (
        <>
            <div className="flex w-full flex-row justify-between mt-8 profile-content">
                <div className="w-full flex justify-center">
                    <div className="profile-card flex flex-col w-full ml-16 mt-8 -mr-8 h-fit items-center rounded-md sticky top-2 justify-between p-5 border-black border-double border-4">
                        <img src={profileImg} alt="" className="size-32 profile-img" />
                        <div className="flex flex-col justify-evenly w-full mt-4 profile-info">
                            <h1 className="regular-font font-bold text-xl profile">Profile</h1>
                            <h1 className="regular-font text-xl username">Username</h1>
                            <p className="regular-font text-xl nr-posts">Number of posts : 3</p>
                            <Link to={`/editprofile/${userId}`}>{userId == id ? <p>Edit</p> : ""}</Link>
                        </div>
                    </div>
                </div>
                <BlogDisplayComponent blogs={blogs} />
            </div>
            <Pagination />
        </>
    );
}
export default Profile;