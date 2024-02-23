import { validateVerify } from "../utils/validations/validateVerifyPassword"

const useVerifyPasswordValidation = (password: string, verify: string) => {
    return validateVerify(password, verify);
}

export default useVerifyPasswordValidation;