import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import "../styles/settings.css";
import FormButton from "../components/FormButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ChangePasswordBodyType, useChangePasswordForm } from "../hooks/useChangePasswordForm";

const Settings = () => {

    const user_id = useSelector((state: RootState) => state.user.id);
    const [activeButton, setActiveButton] = useState<number>(0);

    const { hasErrors, errors, validateForm } = useChangePasswordForm();

    const [inputs, setInputs] = useState<ChangePasswordBodyType>({
        currentId: user_id ?? '',
        currentPassword: '',
        newPassword: '',
        verifyNewPassword: '',
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
        if(!hasErrors) {
            
        }
    }, [hasErrors]);

    const handleSubmit = () => {
        validateForm(inputs);
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
                        <FormInput label="Current password" value={inputs.currentPassword} placeholder="Enter current password..." inputType="password"
                            errorMessage={errors.currentPassword}
                            updateValue={(value) => setInputs({ ...inputs, currentPassword: value })} />

                        <div className="mt-4">
                            <FormInput label="New password" value={inputs.newPassword} placeholder="Enter new password..." inputType="password"
                                errorMessage={errors.newPassword}
                                updateValue={(value) => setInputs({ ...inputs, newPassword: value })} />
                        </div>

                        <div className="mt-4">
                            <FormInput label="Verify new password" value={inputs.verifyNewPassword} placeholder="Retype password..." inputType="password"
                                errorMessage={errors.verifyNewPassword}
                                updateValue={(value) => setInputs({ ...inputs, verifyNewPassword: value })} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <FormButton value="Change" handle={function (): Promise<void> {
                            throw new Error("Function not implemented.");
                        }} />
                    </div>
                </div>

                <div className={`mt-4 ${divVisibility.deleteProfile}`}>
                    <p className="regular-font text-red-700 text-lg">This action will delete your account permanently.</p>

                    <div className="mt-4">
                        <FormInput label="Current password" value={inputs.currentPassword} placeholder="Enter current password..." inputType="password"
                            updateValue={(value) => setInputs({ ...inputs, currentPassword: value })} />
                    </div>

                    <div className="mt-4">
                        <FormButton value="Delete" handle={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;