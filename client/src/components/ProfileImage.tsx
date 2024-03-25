import profilePic from "../assets/profileImg.png";

interface SizeVariants {
    [key: number]: string;
}

const ProfileImage = ({ size, image }: { size: number; image: string | null }) => {
    const sizeVariants: SizeVariants = {
        40: 'h-40 w-40',
        12: 'h-12 w-12'
    };
    const sizeVariant = sizeVariants[size] || 'h-12 w-12';
    
    return (
        <div className={`overflow-hidden ${sizeVariant} rounded-full border-2 border-black`}>
            <img src={image ? `http://localhost:5000/${image.replace(/\\/g, '/')}` : profilePic} alt="" className="w-full h-full object-cover" />
        </div>
    );
}

export default ProfileImage;
