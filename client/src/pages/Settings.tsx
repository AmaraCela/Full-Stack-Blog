import { useEffect, useRef, useState } from "react";
import FormInput from "../components/FormInput";
import "../styles/settings.css";
import FormButton from "../components/FormButton";
import { useSelector } from "react-redux";
import { selectPassword, selectUser, useAppDispatch } from "../store/store";
import { ChangePasswordBodyType, useChangePasswordForm } from "../hooks/useChangePasswordForm";
import { changePassword } from "../store/password/passwordThunks";
import { deleteUser } from "../store/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { resetPasswordState } from "../store/password/passwordSlice";

const Settings = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const username = useSelector(selectUser).username;
    const user_id = useSelector(selectUser).id;
    const changePasswordError = useSelector(selectPassword).error;
    const changePasswordSuccess = useSelector(selectPassword).success;
    const deleteUserError = useSelector(selectUser).deleteError;

    const [activeButton, setActiveButton] = useState<number>(0);
    const { hasErrors, errors, validateForm, displayErrors } = useChangePasswordForm();
    const isButtonPressed = useRef(false);
    const [successfulDisplay, setSuccessfulDisplay] = useState("hidden");

    const [changePasswordInputs, setChangePasswordInputs] = useState<ChangePasswordBodyType>({
        currentUsername: username ?? '',
        currentPassword: '',
        newPassword: '',
        verifyNewPassword: '',
    });

    const [deleteUserInputs, setDeleteUserInputs] = useState({
        username: username ?? '',
        currentPassword: ""
    });

    const [divVisibility, setDivVisibility] = useState({
        changePassword: '',
        deleteProfile: 'hidden',
    });

    const handleClick = (button: number) => {

        setDivVisibility({
            changePassword: button === 0 ? '' : 'hidden',
            deleteProfile: button === 1 ? '' : 'hidden'
        });

        setActiveButton(button);
    }

    useEffect(() => {
        isButtonPressed.current && displayErrors(changePasswordInputs);
    }, [changePasswordInputs]);

    useEffect(() => {
        changePasswordSuccess && setSuccessfulDisplay('flex');
    }, [changePasswordSuccess])

    useEffect(() => {
        !hasErrors && dispatch(changePassword(changePasswordInputs));
    }, [hasErrors]);

    const handleChangePasswordSubmit = () => {
        validateForm(changePasswordInputs);
        displayErrors(changePasswordInputs);
        isButtonPressed.current = true;
    }

    const handleDeleteUserSubmit = () => {
        dispatch(deleteUser(deleteUserInputs));
    }

    return (
        <div className="flex mt-8 items-center flex-col">
            <div className="flex w-2/3 justify-evenly setting-options">
                <button className={`regular-font pt-4 setting-bt rounded-md text-2xl w-1/2 ${activeButton === 0 ? 'bg-[#acc1e6] text-white' : ''}`} onClick={() => handleClick(0)}>Change password</button>
                <button className={`regular-font pt-4 setting-bt rounded-md text-2xl w-1/2 ${activeButton === 1 ? 'bg-[#acc1e6] text-white' : ''}`} onClick={() => handleClick(1)}>Delete profile</button>
            </div>

            <hr className="border-black w-2/3 setting-hr" />

            <div className="mt-8 setting-info">
                <div className={`mt-4 ${divVisibility.changePassword}`}>
                    <p className="regular-font text-red-700 text-lg warning-text">This action will permanently change your password.</p>

                    <div className="mt-4">
                        <FormInput label="Current password" value={changePasswordInputs.currentPassword} placeholder="Enter current password..." inputType="password"
                            errorMessage={changePasswordSuccess || changePasswordError || errors.currentPassword}
                            updateValue={(value) => setChangePasswordInputs({ ...changePasswordInputs, currentPassword: value })} />

                        <div className="mt-4">
                            <FormInput label="New password" value={changePasswordInputs.newPassword} placeholder="Enter new password..." inputType="password"
                                errorMessage={errors.newPassword}
                                updateValue={(value) => setChangePasswordInputs({ ...changePasswordInputs, newPassword: value })} />
                        </div>

                        <div className="mt-4">
                            <FormInput label="Verify new password" value={changePasswordInputs.verifyNewPassword} placeholder="Retype password..." inputType="password"
                                errorMessage={errors.verifyNewPassword}
                                updateValue={(value) => setChangePasswordInputs({ ...changePasswordInputs, verifyNewPassword: value })} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <FormButton value="Change" handle={handleChangePasswordSubmit} />
                    </div>
                </div>

                <div className={`mt-4 ${divVisibility.deleteProfile}`}>
                    <p className="regular-font text-red-700 text-lg">This action will delete your account permanently.</p>

                    <div className="mt-4">
                        <FormInput label="Current password" value={deleteUserInputs.currentPassword} placeholder="Enter current password..." inputType="password"
                            errorMessage={deleteUserError ?? ''}
                            updateValue={(value) => setDeleteUserInputs({ ...deleteUserInputs, currentPassword: value })} />
                    </div>

                    <div className="mt-4">
                        <FormButton value="Delete" handle={handleDeleteUserSubmit} />
                    </div>
                </div>
            </div>

            <div className={`w-full h-full absolute justify-center items-center ${successfulDisplay}`}>
                <div className="bg-white w-1/3 h-1/3 flex items-center justify-center flex-col rounded-md info-box">
                    <p>{changePasswordSuccess}</p>
                    <FormButton value="Okay" handle={function (): void {
                        dispatch(resetPasswordState());
                        navigate(`/profile/${user_id}`);
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Settings;