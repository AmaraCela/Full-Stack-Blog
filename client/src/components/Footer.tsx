import "../styles/footer.css";
const Footer = () => {
    return ( 
        <div className="bg-black px-16 pb-8 mt-8 static footer">
            <h2 className="text-white footer-logo text-3xl pt-8">Chronicles</h2>
            <div className="flex justify-evenly footer-info">
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
        </div>
     );
}
 
export default Footer;