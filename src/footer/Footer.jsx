import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
        <footer className="w-full flex relative bottom-0 justify-center mx-auto border-t border-[theme(--color-dark-turquoise))] py-16 ">
            <div className="flex w-3/5 justify-between">
                <p>Copyright © 2025</p>
                <p>
                <Link to="/about-us" className="hover:text-[theme(--color-dark-turquoise)]">
                    About us
                </Link>                    
                </p>
                <p>
                <Link to='/privacy-policy' className="hover:text-[theme(--color-dark-turquoise)]" >
                    Privacy Policy
                </Link>                    
                </p>
                <p>
                    <Link to='/terms-and-conditions' className="hover:text-[theme(--color-dark-turquoise)]">
                    Terms of Use
                    </Link>
                </p>
                <p>
                    <Link to='/contact-us' className="hover:text-[theme(--color-dark-turquoise)]">
                    Contact Us
                    </Link>
                </p>
            </div>

        </footer>
        </>
    )
}

export default Footer;