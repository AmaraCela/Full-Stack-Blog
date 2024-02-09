import "../styles/signup.css";
import blog from "../assets/blog.webp";
import FormComponent from "../components/FormComponent";

const inputs = [
    {
        type:"text",
        id:"username",
        placeholder:" Enter username...",
        label : 'Username'
    },
    {
        type:"email",
        id:"email",
        placeholder:" Enter email...",
        label:'Email'
    },
    {
        type:"password",
        id:"password",
        placeholder:" Enter password...",
        label : 'Password'
    },
    {
        type:"password",
        id:"verify",
        placeholder:" Retype password...",
        label : 'Verify password'
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