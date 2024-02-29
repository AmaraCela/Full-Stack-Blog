type FormButtonType = {
    value: string;
    handle: () => void;
}

const FormButton = ({ value, handle }: FormButtonType) => {
    
    const onClick = (): void => {
        handle();
    }

    return (
        <button type="button" onClick={onClick}
            className="text-xl p-1 input-format cursor-pointer regular-font font-semibold bg-white">
            {value}
        </button>
    );
}

export default FormButton;