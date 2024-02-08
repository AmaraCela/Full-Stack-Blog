import { useParams } from "react-router-dom";
import BlogDisplayComponent from "../components/BlogDisplayComponent";
import profileImg from "../assets/profileImg.png";
import "../styles/profile.css";
const Profile = () => {
    type Id = {
        id : string
    }
    const {id} = useParams<Id>();
    return ( 
       <div className="flex w-full flex-row justify-between mt-8">
        <BlogDisplayComponent/>
            <div className="profile-card flex flex-row w-full ml-10 mr-10 h-fit items-center rounded-md sticky top-2 justify-between p-5  border-black border-double border-4">
                <div className="flex justify-evenly flex-row">
                <img src={profileImg} alt="" className="size-32" />
                </div>
                <div className="flex flex-col justify-evenly">
                <h1 className="regular-font font-bold text-xl">Profile</h1>
                <h1 className="regular-font text-xl">Username</h1>
                <p className="regular-font text-xl">Number of posts : 3</p>
                </div>
            </div>
           
       </div>
     );
}
 
export default Profile;