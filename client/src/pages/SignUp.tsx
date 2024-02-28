import { useEffect, useState } from "react";
import signup from "../assets/signup-transformed.jpeg";
import { useNavigate } from "react-router-dom";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import FormLink from "../components/FormLink";
import { useDispatch, useSelector } from "react-redux";
import useUsernameValidation from "../hooks/useUsernameValidation";
import useEmailValidation from "../hooks/useEmailValidation";
import usePasswordValidation from "../hooks/usePasswordValidation";
import useVerifyPasswordValidation from "../hooks/useVerifyPasswordValidation";
import { signupUser } from "../store/auth/authThunks";
import { RootState } from "../store/store";
import Loading from "../components/Loading";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [validForm, setValidForm] = useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const error = useSelector((state: RootState) => state.user.signupError);
    const isLoading = useSelector((state: RootState) => state.user.loading);

    const [buttonPressed, setButtonPressed] = useState(false);

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        verify: "",
    });

    const [errors, setErrors] = useState({
        username: error ?? "",
        email: "",
        password: "",
        verify: "",
    });

    const usernameError = useUsernameValidation(inputs.username);
    const emailError = useEmailValidation(inputs.email);
    const passwordError = usePasswordValidation(inputs.password);
    const verifyError = useVerifyPasswordValidation(inputs.password, inputs.verify);

    useEffect(() => {
        const valid = usernameError === '' && emailError === '' && passwordError === '' && verifyError === ''
        setValidForm(valid);
        if (buttonPressed) setErrors({ username: error ?? usernameError, email: emailError, password: passwordError, verify: verifyError });
    }, [inputs]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (error) setErrors((errors) => ({ ...errors, username: error }))
    }, [error])

    const handleSubmit = async (): Promise<void> => {
        setErrors({
            username: error ?? usernameError,
            email: emailError,
            password: passwordError,
            verify: verifyError
        });

        setButtonPressed(true);

        if (validForm) {
            await dispatch(signupUser({
                username: inputs.username,
                email: inputs.email,
                password: inputs.password
            }) as any)

        } else {
            console.log("Input error");
        }
    }

    return (
        <div className="flex justify-center h-full items-center">
            <div className="h-5/6 main-div flex rounded-md mt-8 bg-white">
                <div className="grid justify-evenly p-4 items-center rounded-l-md login-signup-form relative">

                    <svg id="sw-js-blob-svg" className="absolute z-0 h-full w-full signup-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                                <stop id="stop1" stopColor="rgba(156, 187, 242, 1)" offset="0%" />
                                <stop id="stop2" stopColor="rgba(156, 187, 242, 1)" offset="100%" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#sw-gradient)" d="M11.2,-18.4C16.1,-16.5,23,-16.9,29,-14.2C35.1,-11.5,40.3,-5.7,38.2,-1.2C36.1,3.3,26.7,6.6,23,13.4C19.3,20.1,21.3,30.3,18.4,32.7C15.6,35.1,7.8,29.8,0.4,29.1C-7,28.5,-14,32.4,-19.5,31.5C-25,30.6,-28.9,24.8,-33.7,18.7C-38.5,12.7,-44,6.3,-40.8,1.8C-37.7,-2.7,-25.8,-5.3,-19.1,-8.2C-12.5,-11,-11.2,-14.1,-8.9,-17.6C-6.6,-21.1,-3.3,-25,-0.1,-24.9C3.1,-24.7,6.2,-20.4,11.2,-18.4Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" />
                    </svg>

                    <h1 className="regular-font text-3xl font-bold form-title">Signup</h1>

                    <FormInput label="Username" value={inputs.username} placeholder="Enter Username..." name="username"
                        errorMessage={errors.username}
                        updateValue={(value) => setInputs({ ...inputs, username: value })}
                    />

                    <FormInput label="Email" value={inputs.email} inputType="email" placeholder="Enter Email..." name="email"
                        errorMessage={errors.email}
                        updateValue={(value) => setInputs({ ...inputs, email: value })}
                    />

                    <FormInput label="Password" value={inputs.password} inputType="password" placeholder="Enter Password..." name="password"
                        errorMessage={errors.password}
                        updateValue={(value) => setInputs({ ...inputs, password: value })}
                    />

                    <FormInput label="Verify password" value={inputs.verify} inputType="password" placeholder="Retype password..." name="verify"
                        errorMessage={errors.verify}
                        updateValue={(value) => setInputs({ ...inputs, verify: value })}
                    />

                    <div className="flex flex-col items-baseline z-10">
                        <FormButton value="Signup" handle={handleSubmit} />
                        <FormLink descriptionText="Already have an account?" to="/login" linkText="Login" />
                    </div>

                </div>
                <img src={signup} alt="" className="form-img rounded-r-md" />
            </div>
            {isLoading && <Loading />}
        </div>
    );
}

export default SignUp;