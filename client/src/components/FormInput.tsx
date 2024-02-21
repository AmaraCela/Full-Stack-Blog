type FormInputType = {
    label: string;
    value: string;
    placeholder: string;
    inputType?: string;
    errorMessage?: string;
    updateValue: (value: string) => void;
    name?: string;
}

const FormInput = ({ value, label, placeholder, inputType = 'text',
    errorMessage, updateValue, name = '' }: FormInputType) => {

    
    const onChange = (value: string) => {
        updateValue(value);
    }

    return (
        <div className="flex flex-col">
            <label className="regular-font font-semibold">{label}</label>
            <input type={inputType} value={value} required placeholder={placeholder} name={name} className="input-format"
                onChange={(event) => onChange(event.target.value)} />
            <p className={`text-xs text-red-700 italic font-bold ${errorMessage ? "block" : "hidden"}`}>{errorMessage}</p>
        </div>
    );
}

export default FormInput;