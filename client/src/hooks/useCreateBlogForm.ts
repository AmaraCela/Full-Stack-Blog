import { useState } from "react";
import { validateTitle } from "../utils/validations/validateTitle";
import { validateTags } from "../utils/validations/validateTags";
import { validateImages } from "../utils/validations/validateImages";

export type CreateBlogBodyType = {
    title: string;
    tags: string[];
    images: FileList | [];
}

type CreateBlogErrorType = {
    title: string;
    tags: string;
    images: string;
}

export const useCreateBlogForm = () => {
    const [errors, setErrors] = useState<CreateBlogErrorType>({
        title: '',
        tags: '',
        images: '',
    });

    const [hasErrors, setHasErrors] = useState(true);

    const validateForm = (inputs: CreateBlogBodyType) => {
        const titleError = validateTitle(inputs.title);
        const tagsError = validateTags(inputs.tags);
        const imagesError = validateImages(inputs.images);
        setHasErrors(!!(titleError || tagsError || imagesError));
    }

    const displayErrors = (inputs: CreateBlogBodyType) => {
        const titleError = validateTitle(inputs.title);
        const tagsError = validateTags(inputs.tags);
        const imagesError = validateImages(inputs.images);
        setErrors({ title: titleError, tags: tagsError, images: imagesError });
    }

    return {
        errors,
        hasErrors,
        validateForm,
        displayErrors,
    }
}