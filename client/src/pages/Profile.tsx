import BlogDisplay from "../components/BlogDisplay";
import profileImg from "../assets/profileImg.png";
import "../styles/profile.css";
import { useSelector } from "react-redux";
import { selectProfile, selectUser, useAppDispatch } from "../store/store";
import { Link, useParams } from "react-router-dom";
import edit from '../assets/edit-246.png';
import { useEffect } from "react";
import { populateProfile } from "../store/profile/profileThunks";
import username from "../assets/username.png";
import email from "../assets/email-removebg-preview.png";
import settings from "../assets/settings.png";
import Sidebar from "../components/Sidebar";
import blog from "../assets/blog.png";
import resume from "../assets/resume.png";

const Profile = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const loggedInUserId = useSelector(selectUser).id;
    const user = useSelector(selectProfile).user;
    const posts = useSelector(selectProfile).posts;

    useEffect(() => {
        dispatch(populateProfile(id ?? ''));
    }, [])

    return (
        <div className="flex items-center flex-col">

            <div className="w-3/5 bg-[#9CBBF2] rounded-md flex pt-4 pb-4 justify-between mt-4 profile-div" id="profile">

                <div className="flex flex-col items-center flex-wrap w-3/5 px-8 image-bio">
                    <img src={profileImg} alt="" className="w-32" />
                    <p className="regular-font pt-4 text-lg font-semibold">Bio</p>
                    <p className="regular-font text-sm text-center">Short description lorem ipsum that goes on like this.</p>
                </div>

                <div className="flex justify-evenly w-full relative items-center bg-white rounded-md mx-2 my-4 border-black border-2 profile-info-div">
                    <div className="flex justify-evenly w-full items-center profile-info">
                        <div className="rounded-full p-7 text-lg info-field">
                            <div className="flex items-baseline border-b-2 border-black">
                                <img src={username} alt="" className="w-5" />
                                <h1 className="regular-font pl-2">Username</h1>
                            </div>
                            <p className="regular-font pt-4">{user?.username}</p>
                        </div>

                        <div className="rounded-full p-7 text-lg info-field">
                            <div className="flex items-baseline border-b-2 border-black">
                                <img src={email} alt="" className="w-8" />
                                <h1 className="regular-font pl-2">Email</h1>
                            </div>
                            <p className="regular-font pt-4">{user?.email}</p>
                        </div>
                    </div>
                    <div>
                        {loggedInUserId === user?.user_id ?
                            <Link to={`/editprofile/${user?.user_id}`} title="Edit profile"><img src={edit} alt="" className="w-8 h-8 absolute top-0 right-12 mt-1" /></Link> : ""}
                        {loggedInUserId === user?.user_id ?
                            <Link to={`/settings`} title="Profile settings"><img src={settings} alt="" className="w-8 h-8 absolute top-0 right-3 mt-1" /></Link> : ""}

                    </div>
                </div>

            </div>

            {/* <div className="bg-[#9CBBF2] flex flex-col items-end w-2/5 profile-div rounded-md p-4">

                <div className="flex">
                    {loggedInUserId === user?.user_id ?
                        <Link to={`/editprofile/${user?.user_id}`} title="Edit profile"><img src={edit} alt="" className="w-8 h-8 mt-1" /></Link> : ""}
                    {loggedInUserId === user?.user_id ?
                        <Link to={`/settings`} title="Profile settings"><img src={settings} alt="" className="w-8 h-8 mt-1" /></Link> : ""}
                </div>

                <div className="w-full flex flex-col justify-center items-center">

                    <div className="flex relative items-center w-full">
                        <img className="w-32 z-30" src={profileImg} alt="" />
                        <div className="bg-white absolute left-24 h-3/4 flex items-center pl-12 pr-2 rounded-md w-3/4">
                            <p className="regular-font text-lg">Short description lorem ipsum that goes like this.</p>
                        </div>
                    </div>

                    <div className="flex relative items-center justify-end w-full">
                        <div className="bg-white absolute right-24 h-3/4 w-3/4 flex items-center pr-12 pl-2 rounded-md">

                            <p className="regular-font text-lg font-bold">Username: </p>
                            <p className="regular-font text-lg pl-2">{user?.username}</p>

                        </div>
                        <div className="bg-white w-32 rounded-full z-30 border-black border-4">
                            <img className="p-5" src={username} alt="" />
                        </div>
                    </div>

                    <div className="flex relative items-center w-full">
                        <div className="bg-white w-32 h-32 rounded-full z-30 border-black border-4 flex items-center">
                            <img className="p-5" src={email} alt="" />
                        </div>
                        <div className="bg-white absolute left-24 h-3/4 w-3/4 flex items-center pl-12 rounded-md">
                            <p className="regular-font text-lg font-bold">Email:</p>
                            <p className="regular-font text-lg pl-2">{user?.email}</p>
                        </div>
                    </div>

                </div>
            </div> */}

            <div className="bg-[#9cbbf2] w-full mt-8 sticky top-1 z-40 flex items-center justify-evenly py-4">

                <a href="#profile-blogs"><div className="flex flex-col items-center profile-links p-2 rounded-md">
                    <img className="w-12" src={blog} alt="" />
                    <p className="text-center regular-font text-2xl pt-1">Posts</p>
                </div>
                </a>

                <a href="#profile"><div className="flex flex-col items-center ml-4 profile-links p-2 rounded-md">
                    <img className="w-12" src={resume} alt="" />
                    <p className="text-center regular-font text-2xl pt-1">Profile</p>
                </div>
                </a>
            </div>

            <div className="flex px-16 2xl:container 2xl:mx-auto profile-blogs w-full" id="profile-blogs">
                {posts ? <BlogDisplay blogs={posts}  /> : ''}
                <Sidebar />
            </div>
        </div>
    );
}
export default Profile;