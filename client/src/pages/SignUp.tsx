import { useState } from "react";
import blog from "../assets/blog.webp";
import FormComponent from "../components/FormComponent";

import { useNavigate } from "react-router-dom";

interface Data{
    username:string;
    email:string;
    password:string;
    verify:string;
}
const SignUp = () => {

    const [inputs,setInputs] = useState([
        {
            type:"text",
            id:"username",
            placeholder:" Enter username...",
            label : 'Username',
            error : 'Enter a valid username.',
            visible:false
        },
        {
            type:"email",
            id:"email",
            placeholder:" Enter email...",
            label:'Email',
            error : 'Enter a valid email.',
            visible:false
        },
        {
            type:"password",
            id:"password",
            placeholder:" Enter password...",
            label : 'Password',
            error:'Password must be longer than 8 characters.',
            visible:false
        },
        {
            type:"password",
            id:"verify",
            placeholder:" Retype password...",
            label : 'Verify password',
            error : 'Passwords do not match.',
            visible:false
        }
    ]);


    const navigate = useNavigate();
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>,data: Data):Promise<void>=>{

        event.preventDefault();
        if(validateInputs(data.username,data.email, data.password, data.verify))
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
                    navigate('/');
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
            console.log("Input error");
        }
    }

    function validateUsername(username:string):boolean
    {
        if(username.length<3)
        {
            toggleErrorVisibility("username",true);
            return false;
        }
        console.log("here")
        toggleErrorVisibility("username",false);
        return true;
    }

    function validateEmail(email:string):boolean
    { 
        const re = /.+@[a-zA-Z]+\..+/;
        if(re.test(email))
        {
            toggleErrorVisibility("email",false);
            return true;
        }
        toggleErrorVisibility("email",true);
        return false;
    }

    function validatePassword(password:string, verify:string):boolean
    {
        if(password.length>8)
        {
            toggleErrorVisibility("password",false)   
            if(password===verify)
            {
                toggleErrorVisibility("verify",false)
                return true;
            }

            toggleErrorVisibility("verify",true)
            return false;
        }
        toggleErrorVisibility("password",true)
        return false;
    }


    function toggleErrorVisibility(field: string, visibility: boolean) {
        setInputs((prevInputs) =>
          prevInputs.map((input) =>{
            if(input.id === field)
            {
                return {...input, visible:visibility}
            }
            else
            {
                return input;
            }
          }
          )
        );
      }
      
    function validateInputs(username:string, email:string, password:string, verify:string):boolean
    {
        return (validateUsername(username)&&validateEmail(email))&&validatePassword(password, verify);
    }

    const formProp = {
        height:"h-4/5",
        name:'Signup',
        image:blog,
        inputs:inputs,
        handle:handleSubmit,
    }

    return ( 
       < FormComponent formProp={formProp}/>
     );
}
 
export default SignUp;