import { FaRegUser, FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GoHome } from "react-icons/go";

type SidebarType = {
    name: string;
    icon: React.ReactNode;
    path: string;
};

const sidebar: SidebarType[] = [
    {
        name: "Dashboard",
        icon: <GoHome size={18} />,
        path: "/",
    },
    {
        name: "Users",
        icon: <FiUser size={18} />,
        path: "/users",
    },
];

export default sidebar;
