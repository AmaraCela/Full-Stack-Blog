import blog from "../assets/blog.webp";
import FormComponent from "../components/FormComponent";

const inputs = [
    {
        type:"text",
        id:"username",
        placeholder:" Enter username...",
        label : 'Username',
        error : 'Enter a valid username.'
    },
    {
        type:"email",
        id:"email",
        placeholder:" Enter email...",
        label:'Email',
        error : 'Enter a valid email.'
    },
    {
        type:"password",
        id:"password",
        placeholder:" Enter password...",
        label : 'Password',
        error:'Password must be longer than 8 characters.'
    },
    {
        type:"password",
        id:"verify",
        placeholder:" Retype password...",
        label : 'Verify password',
        error : 'Passwords do not match.'
    }
];


interface Data{
    username:string;
    email:string;
    password:string;
    verify:string;
}
const SignUp = () => {

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

    function validateUsername(username:string):boolean
    {
        if(username.length<3)
        {
            return false;
        }
        return true
    }

    function validateEmail(email:string):boolean
    { 
        const re = /.+@[a-zA-Z]+\..+/;
        return re.test(email);
    }

    function validatePassword(password:string, verify:string):boolean
    {
        if(password.length>8)
        {
            return password === verify;
        }
        return false;
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