import { Link } from "react-router-dom";
import "../styles/form.css";
import { useEffect, useState } from "react";

interface Inputs{
        type:string;
        id:string;
        placeholder:string;
        label:string;
        error:string;
        visible:boolean;
        value:string|null;
};

interface FormProp{
    formProp:{
        height:string;
        name:string;
        image:string;
        inputs:Inputs[];
        handle: (event: React.FormEvent<HTMLFormElement>, data:any) => Promise<void>;
    }
}

const FormComponent = ({formProp}:FormProp) => {
    const [data, setData] = useState({});
    
    useEffect(()=>{
    for(let input of formProp.inputs)
        {
            setData((prevData) => ({ ...prevData, [input.id]: input.value}));
        }
    }, []);
    
    return ( 
        <div className="flex justify-center h-full items-center">
            <div className={`${formProp.height} login-div flex rounded-md`}>
                <form className="bg-[#ffffff] grid justify-evenly p-4 items-center rounded-l-md login-form" method="post" onSubmit={(event)=>formProp.handle(event,data)}>
                    <h1 className="regular-font text-3xl font-bold">{formProp.name}</h1>
                    {formProp.inputs.map((input)=>(
                        <div key={input.id} className="flex flex-col"><label htmlFor={input.id} className="regular-font font-semibold">{input.label}</label>
                        <input type={input.type} key={input.id} value={input.value ?? ""}  required placeholder={input.placeholder} className="input-format" name={input.id} onChange={(event) =>{
                            input.value = event.target.value;
                            setData({ ...data, [input.id]: event.target.value })}}/>
                        <p className={`text-xs text-red-700 italic font-bold ${input.visible?"block":"hidden"}`}>{input.error}</p>
                        </div>
                    ))}
                    <div className="flex flex-col items-baseline">
                        <input type="submit" value={formProp.name} className="text-xl p-1 input-format cursor-pointer regular-font font-semibold"/>
                        {formProp.name === 'Edit profile'?'':
                        <p className="regular-font mt-2">{formProp.name === "Login"? (
                            <>
                            Don't have an account? {' '}
                            <Link to="/signup" className="text-[#c46666] underline">
                            Sign up
                            </Link>
                            </>) : (
                                <>
                                Already have an account? {' '}
                                <Link to="/login" className="text-[#c46666] underline">
                                Login
                                </Link>
                                </>
                            )}</p>
                        }
                    </div>
                </form>
                <img src={formProp.image} alt="" className="login-blog rounded-r-md"/>
            </div>
        </div>
     );
}
 
export default FormComponent;