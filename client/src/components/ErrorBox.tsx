import { useEffect, useState } from "react";
import errorImg from "../assets/wired-outline-1140-error.gif";

const ErrorBox = ({error}: {error: string}) => {
    const [visibility, setVisibility] = useState("flex");

    useEffect(() => {
        return () => {document.body.style.overflowY = 'scroll';}
    }, []);

    useEffect(() => {
        document.body.style.overflowY = visibility === 'flex' ?  "hidden" : "scroll" ;
    }, [visibility]);

    return ( 
        <div className={`${visibility} absolute top-0 w-full h-full flex items-center justify-center bg-[#00000065] z-10`}>
            <div className="flex rounded-md absolute bg-white info-box z-10 w-1/4 flex-col items-center justify-center px-8 py-5">
            <img src={errorImg} alt="" className="h-16"/>
            <p className="regular-font text-center font-bold mt-2">{error}</p>
            <button className="rounded-md w-full bg-[#9fdaf7] regular-font mt-2 h-8 text-lg" onClick={() => setVisibility('hidden')}>Okay</button>
        </div>
        </div>
     );
}
 
export default ErrorBox;