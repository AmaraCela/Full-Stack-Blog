import "../styles/footer.css";
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
                    <p className="mt-4">Our company</p>
                    <p>Our policy</p>
                </div>
                <div className="text-white regular-font mt-2">
                    <p>Our contacts</p>
                    <hr />
                    <p className="mt-4">amara.cela@divsion5.co</p>
                    <p>dummy.email@gmail.com</p>
                </div>
                <div className="text-white regular-font mt-2">
                    <p>Our socials</p>
                    <hr />
                    <p className="mt-4">Facebook</p>
                    <p>Instagram</p>
                </div>
            </div>
            <hr className="mt-4"/>
            <p className="text-white text-xl text-center mt-2">&copy; 2024. All rights reserved.</p>
        </div>
     );
}
 
export default Footer;