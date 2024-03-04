import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { editProfile } from "../store/auth/authThunks";
import { useNavigate } from "react-router-dom";
import edit from "../assets/girl-sitting-bean-bag-chair-working-laptop_129422-107-transformed-removebg-preview.png";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import "../styles/editProfile.css";
import { EditProfileBodyType, useEditProfileForm } from "../hooks/useEditProfileForm";

const EditProfile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentId = useSelector((state: RootState) => state.user.id) ?? '';
    const currentUsername = useSelector((state: RootState) => state.user.username);
    const currentEmail = useSelector((state: RootState) => state.user.email);

    const isButtonPressed = useRef(false);

    const { hasErrors, errors, validateForm } = useEditProfileForm();
    const [inputs, setInputs] = useState<EditProfileBodyType>(
        {
            username: currentUsername ?? '',
            email: currentEmail ?? '',
        }
    );

    useEffect(() => {
        if (!hasErrors) {
            const newData =
            {
                username: inputs.username,
                email: inputs.email,
            };
            dispatch(editProfile({ ...newData, user_id: currentId }));
            navigate(`/profile/${currentId}`);
        }
    }, [hasErrors]);

    useEffect(() => {
        isButtonPressed.current && validateForm(inputs);
    }, [inputs])

    const handleSubmit =  (): void => {
        validateForm(inputs);
        isButtonPressed.current = true;
    }

    return (
        <div className="flex justify-center h-4/5 items-center">
            <div className="h-4/5 edit-div flex rounded-md bg-white w-1/2">
                <div className="grid justify-evenly p-4 items-center rounded-l-md relative w-1/2 edit-form">
                    <svg id="sw-js-blob-svg" className="absolute z-0 edit-svg h-full w-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="sw-gradient" x1="2" x2="1" y1="1" y2="0">
                                <stop id="stop1" stopColor="rgba(156, 187, 242, 1)" offset="0%" />
                                <stop id="stop2" stopColor="rgba(156, 187, 242, 1)" offset="100%" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#sw-gradient)" d="M16.7,-10.1C17.5,-2.7,11.4,2.3,4.1,8.1C-3.1,13.9,-11.5,20.6,-19.8,16.9C-28.2,13.3,-36.6,-0.7,-33.3,-11.4C-30,-22.2,-15,-29.8,-3.5,-28.6C7.9,-27.5,15.8,-17.6,16.7,-10.1Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" stroke="url(#sw-gradient)" />
                    </svg>

                    <h1 className="regular-font text-3xl font-bold relative z-10">Edit Profile</h1>

                    <FormInput label="Username" value={inputs.username ? inputs.username : ''} placeholder="Enter Username..."
                        errorMessage={errors.username} updateValue={(value) => setInputs({ ...inputs, username: value })} />

                    <FormInput label="Email" inputType="email" value={inputs.email ? inputs.email : ''} placeholder="Enter Email..."
                        errorMessage={errors.email} updateValue={(value) => setInputs({ ...inputs, email: value })} />

                    <div className="flex flex-col items-baseline relative z-10">
                        <FormButton value="Save" handle={handleSubmit} />
                    </div>
                </div>
                <img src={edit} alt="" className="edit-blog rounded-r-md w-1/2" />
            </div>
        </div>
    );
}

export default EditProfile;