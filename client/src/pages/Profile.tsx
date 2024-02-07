import { useParams } from "react-router-dom";
import BlogDisplayComponent from "../components/BlogDisplayComponent";
import profileImg from "../assets/profileImg.png";
const Profile = () => {
    type Id = {
        id : string
    }
    const { id } = useParams<Id>();
    return ( 
       <div className="flex w-full flex-row justify-between">
            <div className="bg-[#ff33f2] flex flex-col w-full ml-10 mr-10 h-fit items-center rounded-md">
                <img src={profileImg} alt="" className="size-40" />
                <h1>Username</h1>
                <p>Number of posts:3</p>
            </div>
            <BlogDisplayComponent/>
       </div>
     );
}
 
export default Profile;