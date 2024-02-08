import "../styles/login.css";
import blog from "../assets/blog.webp";
import { Link } from "react-router-dom";

const LogIn = () => {
    return (
        <div className="flex justify-center h-full items-center">
            <div className="h-2/3 login-div flex rounded-md">
            <form className="bg-[#ffffff] grid justify-evenly content-center p-4 login-form items-center rounded-l-md">
                <div className="flex flex-col">
                <label htmlFor="username" className="regular-font font-semibold">Username:</label>
                <input type="text" id="username" className="input-format"/>
                </div> 
                <div className="flex flex-col">
                <label htmlFor="password" className="regular-font font-semibold">Password:</label>
                <input type="password" id="password" className="input-format"/></div>
                <div className="flex flex-col items-baseline">
                <input type="submit" value='Login' className="text-xl p-1 input-format cursor-pointer"/>
                <p className="regular-font mt-2">Don't have an account? <Link to="" className="text-[#c46666] underline">Sign up</Link></p>
                </div>
            </form>
            <img src={blog} alt="" className="login-blog rounded-r-md"/>
            </div>
        </div>
     );
}
 
export default LogIn;