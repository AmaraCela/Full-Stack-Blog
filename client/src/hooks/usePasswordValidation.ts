import { validatePassword } from "../utils/validations"

const usePasswordValidation = (password: string) => {
    return validatePassword(password);
}

export default usePasswordValidation;