import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import edit from "../assets/edit.jpg";
import { loginUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import FormLink from "../components/FormLink";


interface Data{
    username: string | null;
    email: string | null;
    oldPassword:  string | null;
    newPassword: string | null;
}

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const oldid = useSelector((state: RootState) => state.user.id);
    const oldUsername = useSelector((state: RootState) => state.user.username);
    const oldEmail = useSelector((state: RootState) => state.user.email);

    const handleSubmit = async (): Promise<void> => {
        
        const newData = 
            {
                username: inputs.username,
                email: inputs.email,
                password: inputs.newPassword,
                user_id: oldid
            }
        // if(await validateOldPassword(data.oldPassword) && validateUsername(data.username) &&  validateEmail(data.email))
        // {  
        //     try{
        //     const response = await fetch('http://localhost:5000/api/edit',{
        //         method:'POST',
        //         headers:{
        //             'Content-Type':'application/json'
        //         },
        //         body:JSON.stringify(newData)
        //     });
        //     if(response.ok)
        //         {
        //             const data = await response.json();
        //             console.log(data.user);
        //             // dispatch(loginUser(data.user));
                    
        //         }
        //         else
        //         {
        //             console.log(response);
        //         }
        //     }
        //     catch(error)
        //     {

        //     }
        // }
    } 

    async function validateOldPassword(oldPassword: string)
    {
        const passwordData = {user_id: oldid, password: oldPassword };
        try{ 
            const response = await fetch("http://localhost:5000/api/password", {
                method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(passwordData)
            });
            console.log(response.ok)
            return response.ok;
        }
        catch(error)
        {
            
        }

        
    }

    function validateUsername(username:string):boolean
    {
        if(username.length<3)
        {
            console.log("username prob")
            return false;
        }
        
        return true;
    }

    function validateEmail(email:string):boolean
    { 
        const re = /.+@[a-zA-Z]+\..+/;
        if(re.test(email))
        {
            return true;
        }
        return false;
    }

    const [inputs, setInputs] = useState<Data>(
        {
            username: oldUsername,
            email: oldEmail,
            oldPassword: '',
            newPassword: ''
        }
    );

    const [inputsError, setInputsError] = useState({
        username: '',
        email: '',
        oldPassword: '',
        newPassword: ''
    })

    return ( 
        <div className = "flex justify-center h-full items-center">
        <div className = "h-4/5 login-div flex rounded-md ">
            <div className = "bg-[#ffffff] grid justify-evenly p-4 items-center rounded-l-md login-form">
                <h1 className = "regular-font text-3xl font-bold">Edit Profile</h1>

                <FormInput label = "Username" value = {inputs.username ? inputs.username : ''} placeholder = "Enter Username"
                    errorMessage = {inputsError.username} updateValue = {(value) => setInputs({...inputs, username: value})}/>
                
                <FormInput label = "Email" inputType="email" value = {inputs.email ? inputs.email : ''} placeholder = "Enter Username"
                    errorMessage = {inputsError.username} updateValue = {(value) => setInputs({...inputs, email: value})}/>

                <FormInput label = "Current password" value = {inputs.oldPassword ? inputs.oldPassword: ''} placeholder = "Enter current password..."
                    errorMessage = {inputsError.oldPassword} updateValue = {(value) => setInputs({...inputs, oldPassword: value})}/>
                
                <FormInput label = "New password" value = {inputs.newPassword ? inputs.newPassword: ''} placeholder = "Enter new password..."
                    errorMessage = {inputsError.newPassword} updateValue = {(value) => setInputs({...inputs, newPassword: value})}/>

                <div className = "flex flex-col items-baseline">
                    <FormButton value = "Login" handle = {handleSubmit}/>
                    <FormLink descriptionText = "Don't have an account?" to = "/signup" linkText = "Signup" />
                </div>
            </div>
            <img src = {edit} alt = "" className = "login-blog rounded-r-md"/>
        </div>
    </div>
     );
}
 
export default EditProfile;