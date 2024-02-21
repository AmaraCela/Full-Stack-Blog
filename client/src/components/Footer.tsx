import "../styles/footer.css";
import instagram from "../assets/instagram.webp";
import facebook from "../assets/facebook.webp";

const Footer = () => {
    
    return (
        <div className="bg-black px-16 pb-8 mt-8 static footer">
            <div className="flex justify-between footer-info pt-8">
                
                <div className="flex items-center">
                    <h2 className="text-white footer-logo text-3xl">Chronicles</h2>
                </div>

                <div className="text-white regular-font mt-2">
                    <p>About us</p>
                    <hr />
                    <p className="mt-4 footer-p">Our company</p>
                    <p className="footer-p">Our policy</p>
                </div>

                <div className="text-white regular-font mt-2">
                    <p>Our contacts</p>
                    <hr />
                    <p className="mt-4 footer-p">amara.cela@divsion5.co</p>
                    <p className="footer-p">dummy.email@gmail.com</p>
                </div>

                <div className="text-white regular-font mt-2">
                    <p>Our socials</p>
                    <hr />
                    <div className="socials flex justify-between items-center cursor-pointer">
                        <img src={instagram} alt="" className="size-10 mt-4" />
                        <img src={facebook} alt="" className="size-10 mt-4 fb" />
                    </div>
                </div>
                
            </div>
            <hr className="mt-4" />
            <p className="text-white text-xl text-center mt-2">&copy; 2024. All rights reserved.</p>
        </div>
    );
}

export default Footer;