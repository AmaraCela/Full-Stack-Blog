import { validateCurrentPassword } from "../utils/validations"

const useCurrentPasswordValidate = (userId: string, password: string) => {
    return validateCurrentPassword(userId, password);
}

export default useCurrentPasswordValidate;