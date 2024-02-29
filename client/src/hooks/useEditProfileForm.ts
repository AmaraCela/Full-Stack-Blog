import { useState } from "react";
import { validateUsername } from "../utils/validations/validateUsername";
import { validateEmail } from "../utils/validations/validateEmail";

export type EditProfileBodyType = {
    username: string;
    email: string;
}
export const useEditProfileForm = () => {
    const [hasErrors, setHasErrors] = useState<boolean>(true);

    const [errors, setErrors] = useState<EditProfileBodyType>({
        username: '',
        email: ''
    });

    const validateForm = (inputs: EditProfileBodyType) => {
        const usernameError = validateUsername(inputs.username);
        const emailError = validateEmail(inputs.email);

        setErrors({
            username: usernameError,
            email: emailError
        });

        setHasErrors(usernameError || emailError ? true : false);
    }

    return {
        hasErrors,
        errors,
        validateForm,
    }
}