import { useEffect, useState } from "react";
import blog from "../assets/blog.webp";

import { useNavigate } from "react-router-dom";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import FormLink from "../components/FormLink";
import { useDispatch } from "react-redux";
import useForm from "../hooks/useForm";
import { signupUser } from "../store/userSlice";

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        verify: "",
    });

    const [inputErrors, setInputErrors] = useState({
        noErrors: false,
        username: '',
        email: '',
        password: '',
        verify: '',
    })

    const {handleChange, errors} = useForm();
    
    useEffect(() => {
        setInputErrors(errors);
    }, [errors]);


    const handleSubmit = async ():Promise<void>=>{

        if(inputErrors.noErrors)
        {
            try{
                await dispatch(signupUser({
                    username: inputs.username,
                    email: inputs.email,
                    password: inputs.password
                }) as any);
                
            }
            catch(error)
            {
                    
            }

        }
        else{
            console.log("Input error");
        }
    }


    return ( 
        <div className = "flex justify-center h-full items-center">
        <div className = "h-4/5 login-div flex rounded-md ">
            <div className = "bg-[#ffffff] grid justify-evenly p-4 items-center rounded-l-md login-form">
                <h1 className = "regular-font text-3xl font-bold">Signup</h1>

                <FormInput label = "Username" value = {inputs.username} placeholder = "Enter Username" name = "username"
                    errorMessage = {inputErrors.username}
                    updateValue = {(value) => setInputs({...inputs, username: value})}
                    handleChange = {handleChange}/>

                <FormInput label = "Email" value = {inputs.email} placeholder = "Enter Email" name = "email"
                    errorMessage = {inputErrors.email}
                    updateValue = {(value) => setInputs({...inputs, email: value})}
                    handleChange = {handleChange}/>

                <FormInput label = "Password" value = {inputs.password} inputType="password" placeholder = "Enter Password" name = "password"
                    errorMessage = {inputErrors.password}
                    updateValue = {(value) => setInputs({...inputs, password: value})}
                    handleChange = {handleChange}/>
                
                <FormInput label = "Verify password" value = {inputs.verify} inputType="password" placeholder = "Retype password" name = "verify"
                    errorMessage = {inputErrors.verify}
                    updateValue = {(value) => setInputs({...inputs, verify: value})}
                    handleChange = {handleChange}/>

                <div className = "flex flex-col items-baseline">
                    <FormButton value = "Signup" handle ={handleSubmit}/>
                    <FormLink descriptionText = "Already have an account?" to = "/login" linkText = "Login" />
                </div>
            </div>
            <img src = {blog} alt = "" className = "login-blog rounded-r-md"/>
        </div>
    </div>
     );
}
 
export default SignUp;