import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function Navbar () {

    const [state, setState] = useState(false);
        const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    const navigation = [
        { title: "Partners", path: "javascript:void(0)" },
        { title: "Customers", path: "javascript:void(0)" },
        { title: "Team", path: "javascript:void(0)" },

    ]

    return (
        <>
                <nav className={`relative flex items-center justify-between w-full pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:space-x-6 transform transition-all duration-700 ease-in-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
        >
                    <div className="flex justify-between w-full md:w-auto">
                        <a href="javascript:void(0)">
                            <img
                                src="/mfdigitallaw.svg"
                                width={150}
                                height={50}
                                alt="Float UI logo"
                            />
                        </a>
                        <button
                            className="text-gray-500 outline-none md:hidden"
                            onClick={() => setState(!state)}
                        >
                            {state ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <ul
                        className={`flex items-center justify-end gap-6 md:text-sm md:font-medium md:flex md:mt-0 ${
                            state ? 'absolute inset-x-0 px-4 border-b bg-white md:border-none md:static' : 'hidden'
                        }`}
                    >
                        <div className="flex flex-col md:flex-row items-center space-y-5 mt-4 md:space-y-0 md:space-x-6">
                            {navigation.map((item, idx) => (
                                <li className="text-gray-500 hover:text-indigo-600" key={idx}>
                                    <a href={item.path}>{item.title}</a>
                                </li>
                            ))}
                        </div>
                        <li className="py-5 md:py-0">
                            <a
                                href="javascript:void(0)"
                                className="py-2 px-5 rounded-lg font-medium text-white text-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 duration-150 block md:py-3 md:inline"
                            >
                                Get started
                            </a>
                        </li>
                    </ul>
                </nav>
        </>
    )
}