import { Link } from "react-router-dom";
import blog from "../assets/blog.webp";
import "../styles/form.css";
import { useState } from "react";

interface Inputs{
        type:string;
        id:string;
        placeholder:string;
        label:string;
        error:string;
};

interface FormProp{
    formProp:{
        height:string;
        name:string;
        image:string;
        inputs:Inputs[];
    }
}

const FormComponent = ({formProp}:FormProp) => {

    interface FormData {
        username:string;
        email:string;
        password:string;
        verify:string;
    }
    const [data, setData] = useState<FormData>(
        {
            username:"",
            email:"",
            password:"",
            verify:"",
        }
    );

    
    
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        
        event.preventDefault();
        if(validateInputs())
        {
            try{
                const response = await fetch("http://localhost:5000/api/signup",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(data)
                });

                if(response.ok)
                {
                    console.log("User signed in");
                }
                else{
                    console.log("User could not be signed in");
                }

            }
            catch(error)
            {
                console.log("API request failed");
            }
        }
        else{
            console.log("input error");
        }
    }

    function validateUsername():boolean
    {
        if(data.username.length<3)
        {
            return false;
        }
        return true
    }

    function validateEmail():boolean
    {
        const re = /.+@[a-z]+\/..+/;
        return re.test(data.email);
    }

    function validatePassword():boolean
    {
        if(data.password.length>8)
        {
            return data.password === data.verify;
        }
        return false;
    }


    function validateInputs()
    {
        return validateUsername()&&validateEmail()&&validatePassword();
    }

    return ( 
        <div className="flex justify-center h-full items-center">
            <div className={`${formProp.height} login-div flex rounded-md`}>
                <form className="bg-[#ffffff] grid justify-evenly p-4 items-center rounded-l-md login-form" method="post" onSubmit={handleSubmit}>
                    <h1 className="regular-font text-3xl font-bold">{formProp.name}</h1>
                    {formProp.inputs.map((input)=>(
                        <div key={input.id} className="flex flex-col"><label htmlFor={input.id} className="regular-font font-semibold">{input.label}</label>
                        <input type={input.type} key={input.id} required placeholder={input.placeholder} className="input-format" name={input.id} onChange={(event) => setData({ ...data, [input.id]: event.target.value })}/>
                        <p className="text-xs text-red-700 italic font-bold">{input.error}</p>
                        </div>
                    ))}
                    <div className="flex flex-col items-baseline">
                        <input type="submit" value={formProp.name} className="text-xl p-1 input-format cursor-pointer regular-font font-semibold"/>
                        <p className="regular-font mt-2">{formProp.name==="login"? (
                        <>
                        Don't have an account?{' '}
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
                    </div>
                </form>
                <img src={blog} alt="" className="login-blog rounded-r-md"/>
            </div>
        </div>
     );
}
 
export default FormComponent;