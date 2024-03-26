import errorImg from "../assets/wired-outline-1140-error.gif";
const ErrorPage = () => {
    return ( 
        <div className="flex px-12 items-end">
            <img src={errorImg} alt="" className="w-20"/>
            <p className="text-2xl font-bold regular-font pb-1.5">There has been an error connecting to the server.</p>
        </div>
     );
}

export default ErrorPage;