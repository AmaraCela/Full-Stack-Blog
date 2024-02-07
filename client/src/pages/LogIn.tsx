import "../styles/login.css";
import blog from "../assets/blog.webp";
import { Link } from "react-router-dom";

const LogIn = () => {
    return ( 
        <div className="flex justify-center h-full items-center">
            <div className="h-2/3 login-div flex rounded-md">
            <form className="bg-[#ffffff] grid justify-evenly p-4 login-form items-center rounded-l-md">
                <label htmlFor="username" className="regular-font font-semibold">Username:</label>
                <input type="text" id="username" className="border-2 border-[#000000] rounded-md"/>
                <label htmlFor="password" className="regular-font font-semibold">Password:</label>
                <input type="password" id="password" className="border-2 border-[#000000] rounded-md"/>
                <div className="flex flex-col items-baseline">
                <input type="submit" value='Login' className="text-xl p-1 border-2 border-black rounded-md"/>
                <p className="regular-font mt-2">Don't have an account? <Link to="" className="text-[#c46666] underline">Sign up</Link></p>
                </div>
            </form>
            <img src={blog} alt="" className="login-blog rounded-r-md"/>
            </div>
        </div>
     );
}
 
export default LogIn;