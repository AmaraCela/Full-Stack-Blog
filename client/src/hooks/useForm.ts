import { useEffect, useState } from "react";

const useForm = () => {
    
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        verify: '',
    });

    const [errors, setErrors] = useState({
        noErrors: false,
        username: '',
        email: '',
        password: '',
        verify: '',
    });

    useEffect(() => {
        let usernameError = validateUsername(values.username);
        let emailError = validateEmail(values.email);
        let passwordsError = validatePassword(values.password, values.verify);
        setErrors((oldErrors) => ({
            ...oldErrors,
            noErrors: usernameError && emailError && passwordsError
        }));
    }, [values]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.persist();
        setValues((oldValues) => (
            {
                ...oldValues,
                [event.target.name]: event.target.value
            }
            ));
    }

    function validateUsername(username: string): boolean
    {
        if(username.length < 3)
        {
            setErrors((oldErrors) => ({
                ...oldErrors,
                username: 'Username must be longer than 3 characters.'
            }));
            return false;
        }
        setErrors((oldErrors) => ({
            ...oldErrors,
            username: ''
        }))
        return true;
    }

    function validateEmail(email: string): boolean
    { 
        const re = /.+@[a-zA-Z]+\..+/;
        if(re.test(email))
        {
            setErrors((oldErrors) => ({
                ...oldErrors,
                email: ''
            }));
            return true;
        }
        setErrors((oldErrors) => ({
            ...oldErrors,
            email: 'Enter a valid email.'
        }));
        return false;
    }


    function validatePassword(password: string, verify: string): boolean
    {

        if(password.length>=8)
        {   
            setErrors((oldErrors) => ({
            ...oldErrors,
            password: ''
            }));
            if(password === verify)
            {
                setErrors((oldErrors) => ({
                    ...oldErrors,
                    verify: ''
                }));
                return true;
            }

            setErrors((oldErrors) => ({
                ...oldErrors,
                verify: 'Passwords should match.'
            }));
            return false;
        }
        setErrors((oldErrors) => ({
            ...oldErrors,
            password: 'Password should be at least 8 characters.'
            }));

        return false;
    }


    return {
        values,
        errors,
        handleChange
    };
}
 
export default useForm;