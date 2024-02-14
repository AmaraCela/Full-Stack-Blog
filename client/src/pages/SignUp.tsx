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

const formProp = {
    height:"h-4/5",
    name:'Signup',
    image:blog,
    inputs:inputs
}




const SignUp = () => {
    return ( 
       < FormComponent formProp={formProp}/>
     );
}
 
export default SignUp;