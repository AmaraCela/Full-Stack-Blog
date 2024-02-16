import { useState } from "react";
import FormComponent from "../components/FormComponent";
import edit from "../assets/edit.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { loginUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

interface Data{
    username:string;
    email:string;
    oldPassword:string;
    newPassword:string;
}

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const oldid = useSelector((state:RootState)=>state.user.id);
    const oldUsername = useSelector((state:RootState)=>state.user.username);
    const oldEmail = useSelector((state:RootState)=>state.user.email);

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>, data:Data):Promise<void>=>{
        event.preventDefault();
        const newData = 
            {
                username:data.username,
                email:data.email,
                password:data.newPassword,
                user_id:oldid
            }
            console.log("new data")
            console.log(newData)
        if(await validateOldPassword(data.oldPassword) && validateUsername(data.username) &&  validateEmail(data.email))
        {  
            try{
            const response = await fetch('http://localhost:5000/api/edit',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(newData)
            });
            if(response.ok)
                {
                    const data = await response.json();
                    console.log(data.user);
                    dispatch(loginUser(data.user));
                    
                }
                else
                {
                    console.log(response);
                }
            }
            catch(error)
            {

            }
        }
    } 

    async function validateOldPassword(oldPassword:string)
    {
        const passwordData = {user_id:oldid, password:oldPassword };
        try{ 
            const response = await fetch("http://localhost:5000/api/password", {
                method : 'POST',
                headers: {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(passwordData)
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

    const [inputs, setInputs] = useState([
        {
            type:"text",
            id:"username",
            placeholder:" Enter username...",
            label : 'Username',
            error : 'Enter a valid username.',
            visible:false,
            value:oldUsername,
        },
        {
            type:"email",
            id:"email",
            placeholder:" Enter email...",
            label:'Email',
            error : 'Enter a valid email.',
            visible:false,
            value:oldEmail,
        },
        {
            type:"password",
            id:"oldPassword",
            placeholder:" Enter password...",
            label : 'Old password',
            error:'Password must be longer than 8 characters.',
            visible:false,
            value:""
        },
        {
            type:"password",
            id:"newPassword",
            placeholder:" Retype password...",
            label : 'New password',
            error : 'Passwords do not match.',
            visible:false,
            value:""
        }
    ]);

    const formProp = {
        height:"h-4/5",
        name:'Edit profile',
        image:edit,
        inputs:inputs,
        handle:handleSubmit,
    }
    return ( 
        <FormComponent formProp={formProp}/>
     );
}
 
export default EditProfile;