import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import edit from "../assets/edit.jpg";
import { loginUser } from "../store/authThunks";
import { useNavigate } from "react-router-dom";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import useUsernameValidation from "../hooks/useUsernameValidation";
import useEmailValidation from "../hooks/useEmailValidation";
import usePasswordValidation from "../hooks/usePasswordValidation";

interface Data {
    username: string;
    email: string;
    oldPassword: string;
    newPassword: string;
}

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const oldid = useSelector((state: RootState) => state.user.id);
    const oldUsername = useSelector((state: RootState) => state.user.username);
    const oldEmail = useSelector((state: RootState) => state.user.email);

    const [validForm, setValidForm] = useState(false);


    // async function validateOldPassword(oldPassword: string) {
    //     const passwordData = { user_id: oldid, password: oldPassword };
    //     try {
    //         const response = await fetch("http://localhost:5000/api/password", {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(passwordData)
    //         });
    //         console.log(response.ok)
    //         return response.ok;
    //     }
    //     catch (error) {

    //     }
    // }

    const [inputs, setInputs] = useState<Data>(
        {
            username: oldUsername ?? '',
            email: oldEmail ?? '',
            oldPassword: '',
            newPassword: ''
        }
    );

    const [errors, setErrors] = useState<Data>(
        {
            username: '',
            email: '',
            oldPassword: '',
            newPassword: ''
        }
    );

    const usernameError = useUsernameValidation(inputs.username);
    const emailError = useEmailValidation(inputs.email);
    const newPasswordError = usePasswordValidation(inputs.newPassword);

    const handleSubmit = async (): Promise<void> => {
        setErrors({
            username: usernameError,
            email: emailError,
            oldPassword: '',
            newPassword: newPasswordError
        });

        const valid = errors.username === '' && errors.email === '' && errors.oldPassword === '' && errors.newPassword === '';
        setValidForm(valid);

        if (validForm) {
            const newData =
            {
                username: inputs.username,
                email: inputs.email,
                password: inputs.newPassword,
                user_id: oldid
            };

            // try {
            //     const response = await fetch('http://localhost:5000/api/edit', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(newData)
            //     });
            //     if (response.ok) {
            //         const data = await response.json();
            //         console.log(data.user);
            //         dispatch(loginUser(data.user));

            //     }
            //     else {
            //         console.log(response);
            //     }
            // }
            // catch (error) {
            // }
        }
    }

    return (
        <div className="flex justify-center h-full items-center">
            <div className="h-4/5 login-div flex rounded-md ">
                <div className="bg-[#ffffff] grid justify-evenly p-4 items-center rounded-l-md login-form">
                    <h1 className="regular-font text-3xl font-bold">Edit Profile</h1>

                    <FormInput label="Username" value={inputs.username ? inputs.username : ''} placeholder="Enter Username"
                        errorMessage={errors.username} updateValue={(value) => setInputs({ ...inputs, username: value })} />

                    <FormInput label="Email" inputType="email" value={inputs.email ? inputs.email : ''} placeholder="Enter Username"
                        errorMessage={errors.email} updateValue={(value) => setInputs({ ...inputs, email: value })} />

                    <FormInput label="Current password" value={inputs.oldPassword ? inputs.oldPassword : ''} placeholder="Enter current password..."
                        errorMessage={errors.oldPassword} updateValue={(value) => setInputs({ ...inputs, oldPassword: value })} />

                    <FormInput label="New password" value={inputs.newPassword ? inputs.newPassword : ''} placeholder="Enter new password..."
                        errorMessage={errors.newPassword} updateValue={(value) => setInputs({ ...inputs, newPassword: value })} />

                    <div className="flex flex-col items-baseline">
                        <FormButton value="Save" handle={handleSubmit} />
                    </div>
                </div>
                <img src={edit} alt="" className="login-blog rounded-r-md" />
            </div>
        </div>
    );
}

export default EditProfile;