import { useState } from "react";
import { validateTitle } from "../utils/validations/validateTitle";

export type CreateBlogBodyType = {
    title: string;
}


export const useCreateBlogForm = () => {
    const [errors, setErrors] = useState<CreateBlogBodyType>({
        title: '',
    });

    const [hasErrors, setHasErrors] = useState(true);

    const validateForm = (inputs: CreateBlogBodyType) => {
        const titleError = validateTitle(inputs.title);

        setHasErrors(!!titleError);
    }

    const displayErrors = (inputs: CreateBlogBodyType) => {
        const titleError = validateTitle(inputs.title);

        setErrors({title: titleError});
    }

    return {
        errors,
        hasErrors,
        validateForm,
        displayErrors,
    }
}