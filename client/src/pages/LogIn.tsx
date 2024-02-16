import { useState } from "react";
import blog from "../assets/blog.webp";
import FormComponent from "../components/FormComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/userSlice";

interface Data{
    username:string;
    password:string;
}

const LogIn = () => {

    const dispatch = useDispatch();

    const [inputs,setInputs] = useState([
        {
            type:"text",
            id:"username",
            placeholder:" Enter username",
            label : 'Username',
            error : '',
            visible: false,
            value:'',
        },
        {
            type:"password",
            id:"password",
            placeholder:" Enter password",
            label : 'Password',
            error : 'Enter valid login information',
            visible:false,
            value:'',
        }
    ]);
    
    const navigate = useNavigate();

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>,data:Data):Promise<void>=>{

        event.preventDefault();
        try{
        const response = await fetch('http://localhost:5000/api/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })
        if(response.ok)
        {
            const data = await response.json();
            dispatch(loginUser(data.user))
            navigate("/")
            console.log("User logged in");
        }
        else{

            setInputs([inputs[0], {...inputs[1], visible:true}])
            console.log("User could not be logged in");
        }
        }
        catch(error)
        {
            console.log("API request failed");
        }

    }
    const formProp = {
        height:"h-2/3",
        name:'Login',
        image:blog,
        inputs:inputs,
        handle:handleSubmit
    }
    return (

        <FormComponent formProp={formProp}/>
     );
}
 
export default LogIn;