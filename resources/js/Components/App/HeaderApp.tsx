import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ModeToggle } from "../ui/mode-toggle";
import { LuUser } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const HeaderApp = () => {
    return (
        <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto w-full sticky top-0 z-[100] bg-[#F1F7FD] dark:bg-[#131414]">
            <div className="flex items-center">
                <span className="text-2xl font-bold text-cyan-500">GO</span>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    CPNS
                </span>
            </div>
            <div className="hidden md:flex space-x-4">
                <div className="flex items-center gap-2">
                    <ModeToggle />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex gap-2 items-center hover:bg-gray-200 dark:hover:bg-gray-800 px-3 py-2 rounded-md cursor-pointer">
                            <p>Mphstar</p>
                            <IoIosArrowDown />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-56 p-2 shadow-none flex flex-col rounded-2xl"
                    >
                        <div className="flex gap-2 items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md cursor-pointer">
                            <LuUser className="" />
                            <p className="text-sm">Akun Saya</p>
                        </div>
                        <div className="flex gap-2 items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md cursor-pointer">
                            <IoExitOutline className="" />
                            <p className="text-sm">Keluar</p>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default HeaderApp;
