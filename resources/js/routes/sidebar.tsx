import { FaRegUser, FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { HiOutlineBookOpen } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiNotebookLight } from "react-icons/pi";

type SidebarType = {
    name: string;
    icon: React.ReactNode;
    path: string;
};

const sidebar: SidebarType[] = [
    {
        name: "Dashboard",
        icon: <GoHome size={18} />,
        path: "/dashboard",
    },
    {
        name: "Management User",
        icon: <FiUser size={18} />,
        path: "/users",
    },
    {
        name: "Materi",
        icon: <HiOutlineBookOpen size={18} />,
        path: "/materi",
    },
    {
        name: "Bank Soal",
        icon: <PiNotebookLight size={18} />,
        path: "/bank-soal",
    },
    {
        name: "Pengaturan",
        icon: <IoSettingsOutline size={18} />,
        path: "/pengaturan",
    },
];

export default sidebar;
