type FormButtonType = {
    value: string;
    handle: () => Promise<void>;
}

const FormButton = ({ value, handle }: FormButtonType) => {
    
    const onClick = async (): Promise<void> => {
        await handle();
    }

    return (
        <button type="button" onClick={onClick}
            className="text-xl p-1 input-format cursor-pointer regular-font font-semibold bg-white">
            {value}
        </button>
    );
}

export default FormButton;