import { useState } from "react";
import { validateTitle } from "../utils/validations/validateTitle";
import { validateTags } from "../utils/validations/validateTags";
import { validateImages } from "../utils/validations/validateImages";

export type EditBlogBodyType = {
    title: string;
    tags: string[];
}

type EditBlogErrorType = {
    title: string;
    tags: string;
}

export const useEditBlogForm = () => {
    const [errors, setErrors] = useState<EditBlogErrorType>({
        title: '',
        tags: '',
    });

    const [hasErrors, setHasErrors] = useState(true);

    const validateForm = (inputs: EditBlogBodyType) => {
        const titleError = validateTitle(inputs.title);
        const tagsError = validateTags(inputs.tags);
        setHasErrors(!!(titleError || tagsError));
    }

    const displayErrors = (inputs: EditBlogBodyType) => {
        const titleError = validateTitle(inputs.title);
        const tagsError = validateTags(inputs.tags);
        setErrors({ title: titleError, tags: tagsError });
    }

    return {
        errors,
        hasErrors,
        validateForm,
        displayErrors,
    }
}