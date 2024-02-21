import { validateVerify } from "../utils/validations"

const useVerifyPasswordValidation = (password: string, verify: string) => {
    return validateVerify(password, verify);
}

export default useVerifyPasswordValidation;