import { validatePassword } from "../utils/validations/validatePassword"

const usePasswordValidation = (password: string) => {
    return validatePassword(password);
}

export default usePasswordValidation;