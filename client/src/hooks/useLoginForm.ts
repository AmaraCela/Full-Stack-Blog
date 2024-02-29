import { useState } from "react"
import { validateUsername } from "../utils/validations/validateUsername";
import { validatePassword } from "../utils/validations/validatePassword";

export type LoginBodyType = {
    username: string,
    password: string
}


export const useLoginForm = () => {
    const [errors, setErrors] = useState<LoginBodyType>({
        username: '',
        password: ''
    });

    const [hasErrors, setHasErrors] = useState<boolean>(true);

    const validateForm = (inputs: LoginBodyType) => {
        const usernameError = validateUsername(inputs.username);
        const passwordError = validatePassword(inputs.password);

        setHasErrors(usernameError || passwordError ? true : false);

        setErrors({
            username: usernameError,
            password: passwordError
        });
    }

    return {
        hasErrors,
        errors,
        validateForm,
    }
}