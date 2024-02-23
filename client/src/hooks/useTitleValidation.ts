import { validateTitle } from "../utils/validations/validateTitle"

export const useTitleValidation = (title: string) => {
    return validateTitle(title);
}