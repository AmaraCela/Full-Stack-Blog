import { validateEmail } from "../utils/validations";

const useEmailValidation = (email: string) => {
    return validateEmail(email);
}

export default useEmailValidation;