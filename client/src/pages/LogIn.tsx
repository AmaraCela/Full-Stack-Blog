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
            setInputsError({ ...inputsError, password: error });
        }
    }, [error]);

    const handleSubmit = async (): Promise<void> => {
        try {
            await (dispatch(loginUser(inputs)));
        }
        catch (error) {
            setInputsError({ ...inputsError, password: 'Check username and password.' });
        }
    };

    return (
        <div className="flex justify-center h-4/5 items-center">
            <div className="h-4/5 login-div flex rounded-md bg-white">

                <div className="bg-[#ffffff] grid justify-evenly p-4 items-center rounded-l-md login-form">
                    <h1 className="regular-font text-3xl font-bold form-title">Login</h1>

                    <FormInput label="Username" value={inputs.username} placeholder="Enter Username..."
                        errorMessage={inputsError.username} updateValue={(value) => setInputs({ ...inputs, username: value })} />

                    <FormInput label="Password" value={inputs.password} placeholder="Enter Password..." inputType="password"
                        errorMessage={inputsError.password} updateValue={(value) => setInputs({ ...inputs, password: value })} />

                    <div className="flex flex-col items-baseline">
                        <FormButton value="Login" handle={handleSubmit} />
                        <FormLink descriptionText="Don't have an account?" to="/signup" linkText="Signup" />
                    </div>
                </div>
                <img src={login} alt="" className="login-blog rounded-r-md" />
            </div>
            {isLoading && <Loading />}
        </div>
    );
}

export default LogIn;