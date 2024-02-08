import blog from "../assets/blog.webp";
const FormComponent = () => {
    return ( 
        <div className="flex justify-center h-full items-center">
        <div className="h-2/3 login-div flex rounded-md">
        <form className="bg-[#ffffff] grid justify-evenly p-4 login-form items-center rounded-l-md">
        </form>
            <img src={blog} alt="" className="login-blog rounded-r-md"/>
            </div>
        </div>
     );
}
 
export default FormComponent;