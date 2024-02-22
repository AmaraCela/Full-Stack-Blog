import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import edit from "../assets/edit.jpg";
import { editProfile } from "../store/auth/authThunks";
import { useNavigate } from "react-router-dom";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import useUsernameValidation from "../hooks/useUsernameValidation";
import useEmailValidation from "../hooks/useEmailValidation";
import usePasswordValidation from "../hooks/usePasswordValidation";
import useCurrentPasswordValidate from "../hooks/useCurrentPasswordValidate";

interface Data {
    username: string;
    email: string;
    currentPassword: string;
    newPassword: string;
}

const EditProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const currentId = useSelector((state: RootState) => state.user.id);
    const currentUsername = useSelector((state: RootState) => state.user.username);
    const currentEmail = useSelector((state: RootState) => state.user.email);
    const isLoading = useSelector((state: RootState) => state.user.loading);
    const error = useSelector((state: RootState) => state.user.error);

    const [validForm, setValidForm] = useState(false);

    const [inputs, setInputs] = useState<Data>(
        {
            username: currentUsername ?? '',
            email: currentEmail ?? '',
            currentPassword: '',
            newPassword: ''
        }
    );

    const [errors, setErrors] = useState<Data>(
        {
            username: '',
            email: '',
            currentPassword: '',
            newPassword: ''
        }
    );

    const usernameError = useUsernameValidation(inputs.username);
    const emailError = useEmailValidation(inputs.email);
    const newPasswordError = usePasswordValidation(inputs.newPassword);
    const currentPasswordError = useCurrentPasswordValidate(currentId ?? '', inputs.currentPassword)

    useEffect(() => {
        if (validForm) {
            const newData =
            {
                username: inputs.username,
                email: inputs.email,
                password: inputs.newPassword,
                user_id: currentId ?? '',
            };
            dispatch(editProfile(newData));
            navigate(`/profile/${currentId}`);
        }
    }, [validForm]);


    const handleSubmit = async (): Promise<void> => {
        setErrors({
            username: usernameError,
            email: emailError,
            currentPassword: await currentPasswordError,
            newPassword: newPasswordError
        });

        const valid = usernameError === '' && emailError === '' && await currentPasswordError === '' && errors.newPassword === '';
        setValidForm(valid);
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

                    <FormInput label="Current password" value={inputs.currentPassword ? inputs.currentPassword : ''} placeholder="Enter current password..."
                        errorMessage={errors.currentPassword} updateValue={(value) => setInputs({ ...inputs, currentPassword: value })} />

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