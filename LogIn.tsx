import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/form.css";
import FormInput from "../components/FormInput";

interface Data{
    username:string;
    password:string;
}

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const [inputsError, setInputsError] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = () => {
        console.log(inputs);
    }

    // try{
    //     const response = await fetch('http://localhost:5000/api/login', {
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json',
    //         },
    //         body:JSON.stringify(data)
    //     })
    //     if(response.ok)
    //     {
    //         const data = await response.json();
    //         dispatch(loginUser(data.user))
    //         navigate("/")
    //         console.log("User logged in");
    //     }
    //     else{

    //         setInputs([inputs[0], {...inputs[1], visible:true}])
    //         console.log("User could not be logged in");
    //     }
    //     }
    //     catch(error)
    //     {
    //         console.log("API request failed");
    //     }

    return (
        <div className="flex justify-center h-full items-center">
            <div className="h-2/3 login-div flex rounded-md ">
                <div className="bg-[#ffffff] grid justify-evenly p-4 items-center rounded-l-md login-form">
                    <h1 className="regular-font text-3xl font-bold">Login</h1>

                    <FormInput label="Username" value={inputs.username} placeholder="Enter Username"
                        updateValue={(value) =>setInputs({...inputs, username: value})}/>

                    <FormInput label="Password" value={inputs.password} placeholder="Enter Password"
                        updateValue={(value) =>setInputs({...inputs, password: value})}/>




                    <div className="flex flex-col items-baseline">
                        <input type="submit" value="Login" onClick={() => handleSubmit()}
                            className="text-xl p-1 input-format cursor-pointer regular-font font-semibold"/>
                        <p className="regular-font mt-2">
                            Don't have an account?
                            <Link to="/signup" className="text-[#c46666] underline">Sign up</Link>
                        </p>
                    </div>



                </div>
            </div>
        </div>
     );
}
 
export default LogIn;
