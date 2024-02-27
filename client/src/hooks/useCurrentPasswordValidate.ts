import { validateCurrentPassword } from "../utils/validations/validateCurrentPassword"

const useCurrentPasswordValidate = async (userId: string, password: string) => {
    return validateCurrentPassword(userId, password);
}

export default useCurrentPasswordValidate;