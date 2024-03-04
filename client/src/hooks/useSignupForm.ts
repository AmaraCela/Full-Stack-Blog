import { useState } from "react";
import { validateUsername } from "../utils/validations/validateUsername";
import { validateEmail } from "../utils/validations/validateEmail";
import { validatePassword } from "../utils/validations/validatePassword";
import { validateVerify } from "../utils/validations/validateVerifyPassword";

export type SignupBodyType = {
    username: string,
    email: string,
    password: string,
    verify: string
}

export const useSignupForm = () => {
    const [errors, setErrors] = useState<SignupBodyType>({
        username: '',
        email: '',
        password: '',
        verify: ''
    });

    const [hasErrors, setHasErrors] = useState<boolean>(true);

    const validateForm = (inputs: SignupBodyType) => {
        const usernameError = validateUsername(inputs.username);
        const emailError = validateEmail(inputs.email);
        const passwordError = validatePassword(inputs.password);
        const verifyPasswordError = validateVerify(inputs.password, inputs.verify);

        setErrors({
            username: usernameError,
            email: emailError,
            password: passwordError,
            verify: verifyPasswordError
        });

        setHasErrors(Boolean(usernameError || emailError || passwordError || verifyPasswordError));

    }

    return {
        errors,
        hasErrors,
        validateForm,
    }
} 