import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
    const footerNavs = [
        { href: 'javascript:void()', name: 'About' },
        { href: 'javascript:void()', name: 'Blog' },
        { href: 'javascript:void()', name: 'Team' },
        { href: 'javascript:void()', name: 'Careers' },
        { href: 'javascript:void()', name: 'Support' }
    ];

    return (
        <footer className="text-gray-500 bg-gradient px-4 py-5 w-full mx-auto md:px-8">
            <div className="max-w-lg sm:mx-auto sm:text-center">
                <img src="https://www.floatui.com/logo.svg" className="w-32 sm:mx-auto" />
                <p className="leading-relaxed mt-2 text-[15px]">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
                {footerNavs.map((item, idx) => (
                    <li className="hover:text-gray-800" key={idx}>
                        <a href={item.href}>{item.name}</a>
                    </li>
                ))}
            </ul>
            <div className="mt-8 items-center justify-between sm:flex">
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
