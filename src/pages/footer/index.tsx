import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {

    return (
        <footer className="text-gray-500 bg-gradient px-4 py-5 w-full mx-auto md:px-8">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <img src="https://www.floatui.com/logo.svg" className="w-32 sm:mx-auto" />
                <p className="leading-relaxed mt-2 text-[15px]">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <div className="mt-8 py-6 border-t border-slate-700 items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0">
                    &copy; 2022 Float UI All rights reserved.
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                        <li className="w-10 h-10  flex items-center justify-center">
                            <a href="https://instagram.com">
                                <FaInstagram className="text-white w-6 h-6" />
                            </a>
                        </li>
                        <li className="w-10 h-10  flex items-center justify-center">
                            <a href="https://linkedin.com">
                                <FaLinkedin className="text-white w-6 h-6" />
                            </a>
                        </li>
                        <li className="w-10 h-10  flex items-center justify-center">
                            <a href="mailto:your-email@example.com">
                                <FaEnvelope className="text-white w-6 h-6" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
