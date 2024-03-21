import profilePic from "../assets/profileImg.png";

const ProfileImage = ({size, image}: {size: number, image: string | null}) => {
    return (
        <div className={`overflow-hidden h-${size} w-${size} rounded-full border-2 border-black`}>
             <img src={image ? `http://localhost:5000/${image.replace(/\\/g, '/')}` : profilePic} alt="" className="w-full h-full object-cover" />
        </div>
    );
}

export default ProfileImage;