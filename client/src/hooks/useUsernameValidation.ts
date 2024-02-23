import { validateUsername } from "../utils/validations/validateUsername";

const useUsernameValidation = (username: string) => {
    return validateUsername(username);
}

export default useUsernameValidation;