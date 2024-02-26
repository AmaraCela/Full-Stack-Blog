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
        username: "",
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
        if (buttonPressed) setErrors({ username: usernameError, email: emailError, password: passwordError, verify: verifyError });
    }, [inputs]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (error) setErrors({ ...errors, username: error })
    }, [error])

    const handleSubmit = async (): Promise<void> => {
        setErrors({
            username: usernameError,
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
            <div className="h-5/6 login-div flex rounded-md mt-8 bg-white">
                <div className="grid justify-evenly p-4 items-center rounded-l-md login-form">
                    <h1 className="regular-font text-3xl font-bold form-title">Signup</h1>

                    <FormInput label="Username" value={inputs.username} placeholder="Enter Username" name="username"
                        errorMessage={errors.username}
                        updateValue={(value) => setInputs({ ...inputs, username: value })}
                    />

                    <FormInput label="Email" value={inputs.email} placeholder="Enter Email" name="email"
                        errorMessage={errors.email}
                        updateValue={(value) => setInputs({ ...inputs, email: value })}
                    />

                    <FormInput label="Password" value={inputs.password} inputType="password" placeholder="Enter Password" name="password"
                        errorMessage={errors.password}
                        updateValue={(value) => setInputs({ ...inputs, password: value })}
                    />

                    <FormInput label="Verify password" value={inputs.verify} inputType="password" placeholder="Retype password" name="verify"
                        errorMessage={errors.verify}
                        updateValue={(value) => setInputs({ ...inputs, verify: value })}
                    />

                    <div className="flex flex-col items-baseline">
                        <FormButton value="Signup" handle={handleSubmit} />
                        <FormLink descriptionText="Already have an account?" to="/login" linkText="Login" />
                    </div>

                </div>
                <img src={ signup } alt="" className="login-blog rounded-r-md" />
            </div>
            {isLoading && <Loading />}
        </div>
    );
}

export default SignUp;