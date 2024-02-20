import { useEffect, useState } from "react";

type ValidationFunctionInformation = {
    function: (strings: string[]) => string;
    extraParams?: string[];
}

type ValidationInformation = { [key: string]: ValidationFunctionInformation };

const useForm = (props: { values: any, validations: ValidationInformation }) => {

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [noErrors, setNoErrors] = useState(false);

    useEffect(() => {
        for (const key of Object.keys(props.values)) {
            setErrors((errors) => {
                const newErrors = { ...errors };
                newErrors[key] = '';
                return newErrors;
            })
        }
    }, []);

    useEffect(() => {
        for (const [key, validate] of Object.entries(props.validations)) {
            const value = props.values[key];
            let error: string;
            if (!validate.extraParams) {
                error = validate.function([value])
            } else {
                error = validate.function([value, ...validate.extraParams])
            }
            setErrors((prevErrors) => ({ ...prevErrors, [key]: error }))
        }

    }, [props.values]);


    return {
        errors,
        noErrors,
    };
}

export default useForm;