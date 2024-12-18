import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import useAdminStore from "@/stores/useAdminStore";
import { CgAtlasian } from "react-icons/cg";
import { GoHome } from "react-icons/go";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import sidebar from "@/routes/sidebar";
import { Link } from "@inertiajs/react";

const Sidebar = () => {
    const adminStore = useAdminStore();

    return (
        <>
            <div
                className={clsx(
                    "bg-background border-r-2 flex flex-col px-4 fixed top-0 left-0 min-h-full duration-300 ease-in-out flex-nowrap whitespace-nowrap",
                    adminStore.sidebarCollapsed
                        ? "md:w-[250px]"
                        : "md:w-[80px] ",
                    "w-[70%] z-[22]",
                    adminStore.showSidebar
                        ? "translate-x-0"
                        : "-translate-x-full",
                    "md:translate-x-0"
                )}
            >
                <div className="absolute right-0 h-full md:flex items-center translate-x-4 hidden">
                    <Button
                        onClick={() => adminStore.handleSidebarCollapsed()}
                        className="rounded-full z-[5]"
                        variant="outline"
                        size="icon"
                    >
                        <MdOutlineKeyboardDoubleArrowRight className="h-4 w-4" />
                    </Button>
                </div>

                <div
                    className={clsx(
                        adminStore.sidebarCollapsed ? "" : "overflow-x-hidden",
                        ""
                    )}
                >
                    <div className="flex items-center gap-1 px-4 py-3 mb-6 justify-center duration-300 ease-in-out">
                        <div className="">
                            <CgAtlasian size={42} className="" />
                        </div>

                        <div
                            className={clsx(
                                "flex-1 font-semibold text-lg",
                                adminStore.sidebarCollapsed
                                    ? "md:block"
                                    : "md:hidden"
                            )}
                        >
                            <span className="text-2xl font-bold text-cyan-500">
                                GO
                            </span>
                            <span className="text-2xl font-bold text-gray-800">
                                CPNS
                            </span>
                        </div>
                    </div>
                    {sidebar.map((item, index) => (
                        <Link key={index} href={item.path}>
                            <div
                                className={clsx(
                                    "h-full flex items-center rounded-md gap-3 duration-300 ease-in-out px-4 py-2 cursor-pointer text-sm",
                                    adminStore.sidebarCollapsed
                                        ? "md:justify-normal"
                                        : "md:justify-center",
                                    adminStore.title === item.name
                                        ? "bg-cyan-500 text-white"
                                        : "hover:bg-slate-100 dark:hover:bg-slate-900"
                                )}
                            >
                                <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div>{item.icon}</div>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="right"
                                            className={clsx(
                                                "hidden",
                                                adminStore.sidebarCollapsed
                                                    ? "md:hidden"
                                                    : "md:block",
                                                "bg-slate-900 text-white"
                                            )}
                                        >
                                            <p>{item.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <span
                                    className={clsx(
                                        !adminStore.sidebarCollapsed
                                            ? "md:hidden"
                                            : "md:block"
                                    )}
                                >
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* backdrop */}
            <div
                onClick={() => adminStore.handleSidebar()}
                className={clsx(
                    "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[21] duration-300 ease-in-out",
                    adminStore.showSidebar
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            ></div>
        </>
    );
};

export default Sidebar;
