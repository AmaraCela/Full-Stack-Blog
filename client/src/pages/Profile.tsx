import { useParams } from "react-router-dom";
const Profile = () => {
    type Id = {
        id : string
    }
    const { id } = useParams<Id>();
    return ( 
        <h1>Profile -{id}</h1>
     );
}
 
export default Profile;