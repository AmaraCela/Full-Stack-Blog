import { useEffect, useState } from "react";
import { validatePassword } from "../utils/validations/validatePassword";
import { validateVerify } from "../utils/validations/validateVerifyPassword";

export type ChangePasswordBodyType = {
    currentUsername: string,
    currentPassword: string,
    newPassword: string,
    verifyNewPassword: string,
}

export const useChangePasswordForm = () => {
    const [hasErrors, setHasErrors] = useState(true);

    const [errors, setErrors] = useState<ChangePasswordBodyType>({
        currentUsername: '',
        currentPassword: '',
        newPassword: '',
        verifyNewPassword: ''
    });

    const validateForm = (inputs: ChangePasswordBodyType) => {
        const newPasswordError = validatePassword(inputs.newPassword);
        const verifyNewPasswordError = validateVerify(inputs.newPassword, inputs.verifyNewPassword);
        
        setErrors({
            ...errors,
            newPassword: newPasswordError,
            verifyNewPassword: verifyNewPasswordError,
        });

        setHasErrors(!!(newPasswordError && verifyNewPasswordError));
    }

    return {
        hasErrors,
        errors,
        validateForm,
    }

}