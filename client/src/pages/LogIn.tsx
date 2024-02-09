import blog from "../assets/blog.webp";
import FormComponent from "../components/FormComponent";


const inputs = [
    {
        type:"text",
        id:"username",
        placeholder:" Enter username",
        label : 'Username'
    },
    {
        type:"password",
        id:"password",
        placeholder:" Enter password",
        label : 'Password'
    }
];

const formProp = {
    height:"h-2/3",
    name:'Login',
    image:blog,
    inputs:inputs
}
const LogIn = () => {
    return (

        <FormComponent formProp={formProp}/>
     );
}
 
export default LogIn;