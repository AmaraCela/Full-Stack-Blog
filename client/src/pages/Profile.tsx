import BlogDisplay from "../components/BlogDisplay";
import profileImg from "../assets/profileImg.png";
import "../styles/profile.css";
import profile from "../assets/profile.png";
import laptop from '../assets/laptop.jpg';
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Link, useParams } from "react-router-dom";
import edit from '../assets/edit-246.png';
import { useEffect } from "react";
import { populateProfile } from "../store/profile/profileThunks";
import username from "../assets/username.png";
import email from "../assets/email-removebg-preview.png";
import settings from "../assets/settings.png";
import Sidebar from "../components/Sidebar";

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams();

    const loggedInUserId = useSelector((state: RootState) => state.user.id);
    const user = useSelector((state: RootState) => state.profile.user);

    useEffect(() => {
        dispatch(populateProfile(id ?? ''));
    }, [])

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
        <div className="flex items-center flex-col">

            <div className="w-3/5 bg-[#9CBBF2] rounded-md flex pt-4 pb-4 justify-between mt-4 profile-div">

                <div className="flex flex-col items-center flex-wrap w-3/5 px-8">
                    <img src={profileImg} alt="" className="w-32" />
                    <p className="regular-font pt-4 text-base font-semibold">Bio</p>
                    <p className="regular-font text-sm">Short description lorem ipsum that goes on like this.</p>
                </div>

                <div className="flex justify-evenly w-full border-l-4 border-black relative items-center">

                    <div className="relative rounded-full p-7">
                        <div className="bg-white h-36 w-full absolute z-0 rounded-full rotate-45 top-0 left-0"></div>
                        <div className="flex items-baseline border-b-2 border-black z-20 relative">
                            <img src={username} alt="" className="w-8" />
                            <h1 className="regular-font pl-2">Username</h1>
                        </div>
                        <p className="z-20 relative regular-font pt-4">{user?.username}</p>
                    </div>

                    <div className="relative rounded-full p-7">
                        <div className="bg-white h-32 w-full absolute z-0 rounded-full rotate-45 top-0 left-0"></div>
                        <div className="flex items-baseline border-b-2 border-black relative z-20">
                            <img src={email} alt="" className="w-8" />
                            <h1 className="regular-font pl-2">Email</h1>
                        </div>
                        <p className="z-20 relative regular-font pt-4">{user?.email}</p>
                    </div>

                    {loggedInUserId === user?.user_id ?
                        <Link to={`/editprofile/${user?.user_id}`} title="Edit profile"><img src={edit} alt="" className="w-8 h-8 absolute top-0 right-12" /></Link> : ""}
                    {loggedInUserId === user?.user_id ?
                        <Link to={`/settings`} title="Profile settings"><img src={settings} alt="" className="w-8 h-8 absolute top-0 right-3" /></Link> : ""}

                </div>
            </div>

        </div>
    );
}
export default Profile;