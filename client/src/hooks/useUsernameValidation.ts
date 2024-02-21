import { validateUsername } from "../utils/validations";

const useUsernameValidation = (username: string) => {
    return validateUsername(username);
}

export default useUsernameValidation;