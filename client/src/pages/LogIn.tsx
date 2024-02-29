import { useEffect, useState } from "react";
import login from "../assets/login-transformed.jpeg";
import '../styles/form.css';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth/authThunks";
import FormInput from "../components/FormInput";
import FormLink from "../components/FormLink";
import FormButton from "../components/FormButton";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const LogIn = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const error = useSelector((state: RootState) => state.user.loginError);
    const isLoading = useSelector((state: RootState) => state.user.loading);

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
    }, [isLoggedIn]);


    useEffect(() => {
        if (error) {
            setInputsError({ username: error === 'Invalid username.' ? error : '', password: error === 'Invalid password.' ? error : '' });
        }
    }, [error]);

    const handleSubmit = () => {
        try {
            (dispatch(loginUser(inputs)));
        }
        catch (error) {
            setInputsError({ ...inputsError, password: 'Check username and password.' });
        }
    };

    return (
        <div className="flex justify-center h-4/5 items-center">
            <div className="h-4/5 main-div flex rounded-md bg-white relative">

                <svg id="sw-js-blob-svg" className="absolute z-0 login-svg h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="sw-gradient" x1="2" x2="1" y1="1" y2="0">
                            <stop id="stop1" stopColor="rgba(156, 187, 242, 1)" offset="0%" />
                            <stop id="stop2" stopColor="rgba(156, 187, 242, 1)" offset="100%" />
                        </linearGradient>                  
                    </defs>                
                    <path fill="url(#sw-gradient)" d="M16.7,-10.1C17.5,-2.7,11.4,2.3,4.1,8.1C-3.1,13.9,-11.5,20.6,-19.8,16.9C-28.2,13.3,-36.6,-0.7,-33.3,-11.4C-30,-22.2,-15,-29.8,-3.5,-28.6C7.9,-27.5,15.8,-17.6,16.7,-10.1Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" stroke="url(#sw-gradient)" />
                </svg>

               <div className="bg-[#ffffff] grid justify-evenly p-4 items-center rounded-l-md login-signup-form">
                    <h1 className="regular-font text-3xl font-bold form-title z-10">Login</h1>

                    <FormInput label="Username" value={inputs.username} placeholder="Enter Username..."
                        errorMessage={inputsError.username} updateValue={(value) => setInputs({ ...inputs, username: value })} />

                    <FormInput label="Password" value={inputs.password} placeholder="Enter Password..." inputType="password"
                        errorMessage={inputsError.password} updateValue={(value) => setInputs({ ...inputs, password: value })} />

                    <div className="flex flex-col items-baseline z-10">
                        <FormButton value="Login" handle={handleSubmit} />
                        <FormLink descriptionText="Don't have an account?" to="/signup" linkText="Signup" />
                    </div>
                </div>
                <img src={login} alt="" className="form-img rounded-r-md" />
            </div>
            {isLoading && <Loading />}
        </div>
    );
}

export default LogIn;