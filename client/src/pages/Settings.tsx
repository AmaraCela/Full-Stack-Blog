import FormInput from "../components/FormInput";
import "../styles/settings.css";

const Settings = () => {
    return (
        <div className="flex mt-8">

            <div className="flex flex-col bg-white w-1/3 rounded-md">
                <button className="regular-font pt-4 setting-bt rounded-md">Change password</button>
                <button className="regular-font pt-4 setting-bt rounded-md">Delete profile</button>
            </div>

            <div>
                <p>Your account will be deleted permanently. Enter password to proceed.</p>
                <FormInput label="Current password" value="" placeholder="Enter current password..." inputType="password" updateValue={function (value: string): void {
                    throw new Error("Function not implemented.");
                } } />
            </div>

            <div>

            </div>

        </div>
    );
}

export default Settings;