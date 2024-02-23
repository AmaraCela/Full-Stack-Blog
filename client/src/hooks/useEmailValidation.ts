import { validateEmail } from "../utils/validations/validateEmail";

const useEmailValidation = (email: string) => {
    return validateEmail(email);
}

export default useEmailValidation;