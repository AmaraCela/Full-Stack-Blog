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
            dispatch(editProfile({ ...newData, user_id: currentId }));
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
                <div className="grid justify-evenly p-4 items-center rounded-l-md relative w-1/2">
                    <svg id="sw-js-blob-svg" className="absolute z-0 login-svg h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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

                    <div className="flex flex-col items-baseline">
                        <FormButton value="Save" handle={handleSubmit} />
                    </div>
                </div>
                <img src={edit} alt="" className="login-blog rounded-r-md p-12" />
            </div>
        </div>
    );
}

export default EditProfile;