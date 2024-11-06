import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Initial () {

    const [state, setState] = useState(false)

    // Replace javascript:void(0) path with your path
    const navigation = [
        { title: "Partners", path: "javascript:void(0)" },
        { title: "Customers", path: "javascript:void(0)" },
        { title: "Team", path: "javascript:void(0)" },

    ]

    return (
        <>
            <nav className="relative flex items-center justify-between w-full pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 md:space-x-6">
                <div className="flex justify-between w-full md:w-auto">
                    <a href="javascript:void(0)">
                        <img
                            src="https://www.floatui.com/logo.svg"
                            width={120}
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

            <section className="py-28 w-full">
                <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
                    <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
                        <h1 className="text-sm text-indigo-600 font-medium">
                            Over 200 successful deals
                        </h1>
                        <h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl">
                            Seu assistente inteligente para potenciar suas análises
                        </h2>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
                        </p>
                        <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                            <a href="javascript:void(0)" className="block py-2 px-4 text-center text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none">
                                Let's get started
                            </a>
                            <a href="javascript:void(0)" className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex">
                                Get access
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-14 md:mt-0 md:max-w-xl">
                        <img src="/messageframe.svg" alt="Icon" className="w-3/4 h-1/4" />

                    </div>
                </div>
                <div className="flex justify-center items-center mt-14 px-4 md:px-8">
                    <button>
                        <ChevronDown className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </section>
        </>
    )
}