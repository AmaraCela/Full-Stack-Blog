import blog from "../assets/blog.webp";
import FormComponent from "../components/FormComponent";


const inputs = [
    {
        type:"text",
        id:"username",
        placeholder:" Enter username",
        label : 'Username',
        error : 'Username not found.'
    },
    {
        type:"password",
        id:"password",
        placeholder:" Enter password",
        label : 'Password',
        error : 'Password does not match.'
    }
];


interface Data{
    username:string;
    password:string;
}
const LogIn = () => {

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
            console.log("User logged in");
        }
        else{
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