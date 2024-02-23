import { validateCurrentPassword } from "../utils/validations/validateCurrentPassword"

const useCurrentPasswordValidate = (userId: string, password: string) => {
    return validateCurrentPassword(userId, password);
}

export default useCurrentPasswordValidate;