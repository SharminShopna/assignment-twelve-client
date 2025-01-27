
import React from 'react';
import logo from '../../../assets/logo2.jpg'
import { Link } from 'react-router-dom';
// import logo from '../assets/logo2.png'
const Footer = () => {
    return (
        <>
            <footer className="footer bg-lime-50 text-base-content p-10">
                <aside>
                    <div className='flex items-center text-center'>
                    <img src={logo} alt="" className='h-24 w-24 rounded-full' />
                    <h2 className='text-5xl text-lime-700 font-bold italic'>HOUSE BOX</h2>
                    </div>
                    <p>
                        HouseBox is a dynamic real estate platform offering users<br></br> the ability to browse, wishlist, and purchase properties,<br></br> while agents and admins manage listings and reviews<br></br> seamlessly.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Explore</h6>
                    <Link to="/allProperties" className="link link-hover">All Property</Link>
                    <Link to="/contactUs" className="link link-hover">Contact Us</Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Contact</h6>
                    <a className="link link-hover">Natural House</a>
                    <a className="link link-hover">Tejgaon Industrial Area,</a>
                    <a className="link link-hover">Dhaka-1208</a>
                    <a className="link link-hover">Bangladesh</a>
                    <a className="link link-hover">Mobile: 01965848803</a>
                    <a className="link link-hover">sharminshopna95@gmail.com</a>
                </nav>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-auto">
                    <a href="https://www.linkedin.com/in/sharmin-shopna/" className="text-sky-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path
                                d="M20.447 20.452H16.89v-5.568c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.137 1.447-2.137 2.94v5.665h-3.554V9h3.415v1.561h.05c.476-.9 1.635-1.852 3.366-1.852 3.6 0 4.268 2.37 4.268 5.452v6.291zM5.337 7.433c-1.144 0-2.067-.926-2.067-2.066 0-1.141.922-2.066 2.067-2.066s2.067.926 2.067 2.066c0 1.141-.923 2.066-2.067 2.066zM6.875 20.452H3.8V9h3.075v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.454C23.208 24 24 23.227 24 22.273V1.727C24 .774 23.208 0 22.225 0z"
                            ></path>
                        </svg>
                    </a>

                    <a href="https://x.com/?lang=en" className="text-sky-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                    </a>
                    <a href="https://www.youtube.com/" className="text-red-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/" className="text-blue-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </nav>
            </footer>
            <hr></hr>
            <footer className="footer footer-center bg-lime-50 text-base-content p-4">
                <aside>
                    <p>Copyright© 2024 HouseBox - All rights reserved by Real estate Platform Ltd.</p>
                </aside>
            </footer>
        </>
    );
};

export default Footer;






