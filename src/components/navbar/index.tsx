import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const formatDate = () => {
        const today = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            day: "numeric",
            month: "long",
        };
        const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(today);

        const [weekday, rest] = formattedDate.split(", ");
        return { weekday, rest };
    };

    const { weekday, rest } = formatDate();

    return (
        <nav>
            <header className="flex items-center w-full fixed top-0 z-10 gap-2 p-3 text-zinc-900">
                <div className="flex flex-row gap-2 items-center">
                    <div className="p-2 rounded-lg bg-black">
                        <MoveLeft className="text-white" />
                    </div>
                    <Link href="/">
                        <button className=" hidden hover:bg-gray-200 md:p-1 rounded-lg duration-150">
                            Voltar
                        </button>
                    </Link>
                </div>

                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center font-medium">
                        <span className="text-sm md:text-lg text-gray-700">{weekday}, </span>
                        <span className=" text-sm md:text-lg text-blue-800">{rest}</span>
                    </div>
                </div>

                <div className="w-12"></div>
            </header>

        </nav>
    );
}
