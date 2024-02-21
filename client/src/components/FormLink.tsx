import { Link } from "react-router-dom";

type FormLinkType = {
    descriptionText: string;
    to: string;
    linkText: string;
}

const FormLink = ({ descriptionText, to, linkText }: FormLinkType) => {
    
    return (
        <p className="regular-font mt-2">
            {descriptionText}
            <Link to={to} className="text-[#c46666] underline pl-1">{linkText}</Link>
        </p>
    );
}

export default FormLink;