import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { editProfile } from "../store/auth/authThunks";
import { useNavigate } from "react-router-dom";
import edit from "../assets/pencilGirl-transformed-removebg-preview.png";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import useUsernameValidation from "../hooks/useUsernameValidation";
import useEmailValidation from "../hooks/useEmailValidation";
import "../styles/editProfile.css";


interface Data {
    username: string;
    email: string;
}

const EditProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const currentId = useSelector((state: RootState) => state.user.id) ?? '';
    const currentUsername = useSelector((state: RootState) => state.user.username);
    const currentEmail = useSelector((state: RootState) => state.user.email);

    const [validForm, setValidForm] = useState(false);

    const [inputs, setInputs] = useState<Data>(
        {
            username: currentUsername ?? '',
            email: currentEmail ?? '',
        }
    );

    const [errors, setErrors] = useState<Data>(
        {
            username: '',
            email: '',
        }
    );

    const usernameError = useUsernameValidation(inputs.username);
    const emailError = useEmailValidation(inputs.email);

    useEffect(() => {
        if (validForm) {
            const newData =
            {
                username: inputs.username,
                email: inputs.email,
            };
            dispatch(editProfile({...newData, user_id: currentId}));
            navigate(`/profile/${currentId}`);
        }
    }, [validForm]);


    const handleSubmit = async (): Promise<void> => {
        setErrors({
            username: usernameError,
            email: emailError,
        });

        const valid = usernameError === '' && emailError === '';
        setValidForm(valid);
    }

    return (
        <div className="flex justify-center h-full items-center">
            <div className="h-2/3 edit-div flex rounded-md bg-white w-1/2">
                <div className="grid justify-evenly p-4 items-center rounded-l-md login-form">
                    <h1 className="regular-font text-3xl font-bold">Edit Profile</h1>

                    <FormInput label="Username" value={inputs.username ? inputs.username : ''} placeholder="Enter Username..."
                        errorMessage={errors.username} updateValue={(value) => setInputs({ ...inputs, username: value })} />

                    <FormInput label="Email" inputType="email" value={inputs.email ? inputs.email : ''} placeholder="Enter Email..."
                        errorMessage={errors.email} updateValue={(value) => setInputs({ ...inputs, email: value })} />

                    <div className="flex flex-col items-baseline">
                        <FormButton value="Save" handle={handleSubmit} />
                    </div>
                </div>
                <img src={edit} alt="" className="login-blog rounded-r-md p-9" />
            </div>
        </div>
    );
}

export default EditProfile;