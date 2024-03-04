import { useRef, useState } from "react"
import { validateCurrentPassword } from "../utils/validations/validateCurrentPassword";
import { validatePassword } from "../utils/validations/validatePassword";
import { validateVerify } from "../utils/validations/validateVerifyPassword";

export type ChangePasswordBodyType = {
    currentId: string,
    currentPassword: string,
    newPassword: string,
    verifyNewPassword: string,
}

export const useChangePasswordForm = () => {
    const hasErrors = useRef(true);

    const [errors, setErrors] = useState<ChangePasswordBodyType>({
        currentId: '',
        currentPassword: '',
        newPassword: '',
        verifyNewPassword: ''
    });

    const validateForm = async (inputs: ChangePasswordBodyType) => {
        const currentPasswordError = await validateCurrentPassword(inputs.currentId, inputs.currentPassword);
        const newPasswordError = validatePassword(inputs.newPassword);
        const verifyNewPasswordError = validateVerify(inputs.newPassword, inputs.verifyNewPassword);
        
        setErrors({
            ...errors,
            currentPassword: currentPasswordError,
            newPassword: newPasswordError,
            verifyNewPassword: verifyNewPasswordError,
        });

        hasErrors.current = !!(currentPasswordError || newPasswordError || verifyNewPasswordError);
    }

    return {
        hasErrors,
        errors,
        validateForm,
    }

}