import { useEffect, useState } from "react";
import blog from "../assets/blog.webp";
import '../styles/form.css';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import FormInput from "../components/FormInput";
import FormLink from "../components/FormLink";
import FormButton from "../components/FormButton";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const error = useSelector((state: RootState) => state.user.error)

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const [inputsError, setInputsError] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn])


    useEffect(() => {
        if (error) {
            setInputsError({ ...inputsError, password: error });
        }
    }, [error])

    const handleSubmit = async (): Promise<void> => {
        try {
            await (dispatch(loginUser(inputs)));
        }
        catch (error) {
            setInputsError({ ...inputsError, password: 'Check username and password.' });
        }
    };

    return (
        <div className="flex justify-center h-full items-center">
            <div className="h-2/3 login-div flex rounded-md ">
                <div className="bg-[#ffffff] grid justify-evenly p-4 items-center rounded-l-md login-form">
                    <h1 className="regular-font text-3xl font-bold">Login</h1>

                    <FormInput label="Username" value={inputs.username} placeholder="Enter Username"
                        errorMessage={inputsError.username} updateValue={(value) => setInputs({ ...inputs, username: value })} />

                    <FormInput label="Password" value={inputs.password} placeholder="Enter Password"
                        errorMessage={inputsError.password} updateValue={(value) => setInputs({ ...inputs, password: value })} />

                    <div className="flex flex-col items-baseline">
                        <FormButton value="Login" handle={handleSubmit} />
                        <FormLink descriptionText="Don't have an account?" to="/signup" linkText="Signup" />
                    </div>
                </div>
                <img src={blog} alt="" className="login-blog rounded-r-md" />
            </div>
        </div>
    );
}

export default LogIn;