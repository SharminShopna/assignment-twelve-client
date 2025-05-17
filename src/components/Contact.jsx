import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import Swal from 'sweetalert2';
import SectionTitle from './SectionTitle';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_9sghgqq', 'template_xlngcjf', form.current, 'rxea47ehjWZO9-2G4')
            .then(
                () => {
                    //   console.log('SUCCESS!');
                    Swal.fire({
                        title: "Good job!",
                        text: "Message sent successfully!",
                        icon: "success"
                    });
                },
                (error) => {
                    console.error('FAILED...', error.text);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Message failed to send. Please try again later.",
                        footer: ''
                    });
                }
            );
    };

    return (
        <>
        <div className='my-10 mt-32'>
            <SectionTitle
                heading="Contact Us"
                subHeading="Feel free to ask us any questions, we’re here to help"
            ></SectionTitle>
            <section
                id="contact"
                className="py-8 lg:py-16 mx-auto max-w-screen-lg"
                data-aos="fade-up"
                data-aos-delay="400"
            >
                {/* <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Contact Me
                </h2> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="p-6 rounded-lg shadow-md bg-white dark:dark:bg-lime-700">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Send a Message</h3>
                        <form ref={form} onSubmit={sendEmail} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="user_name"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 dark:border-gray-700 dark:text-gray-900 dark:bg-white"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="user_email"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 dark:border-gray-700 dark:text-gray-900 dark:bg-white"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    className="w-full p-2 h-32 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 dark:border-gray-700 dark:text-gray-900 dark:bg-white"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="px-4 py-2 text-lime-700 bg-white rounded-lg hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-700 dark:bg-white dark:hover:bg-gray-50"
                            >
                                Send
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md dark:bg-lime-700">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                            Contact Information
                        </h3>
                        <ul className="space-y-4 text-gray-900 dark:text-gray-300">
                            <li>
                                <strong>Email:</strong>{' '}
                                <a
                                    href="mailto:sharminshopna149@gmail.com"
                                    className="text-cyan-700 dark:text-white hover:underline"
                                >
                                    sharminshopna149@gmail.com
                                </a>
                            </li>
                            <li>
                                <strong>Phone:</strong>{' '}
                                <a
                                    href="tel:8801303058388"
                                    className="text-cyan-700 dark:text-white hover:underline"
                                >
                                    +8801303058388
                                </a>
                            </li>
                            <li>
                                <strong>LinkedIn:</strong>{' '}
                                <a
                                    href="https://www.linkedin.com/in/sharmin-shopna/"
                                    className="text-cyan-700 dark:text-white hover:underline"
                                >
                                    Link
                                </a>
                            </li>
                            <li>
                                <strong>WhatsApp:</strong>{' '}
                                <a
                                    href="https://wa.me/01303058388"
                                    className="text-cyan-700 dark:text-white hover:underline"
                                >
                                    +8801303058388
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            </div>
        </>
    );
};

export default Contact;
