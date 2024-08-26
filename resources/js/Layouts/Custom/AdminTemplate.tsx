import Sidebar from "@/Components/Admin/Sidebar";
import { Button } from "@/Components/ui/button";
import { ModeToggle } from "@/Components/ui/mode-toggle";
import useAdminStore from "@/stores/useAdminStore";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const AdminTemplate = ({ children }: { children: ReactNode }) => {
    const adminStore = useAdminStore();

    return (
        <div className="min-h-[100dvh] bg-bgWhite dark:bg-background flex flex-row">
            <Sidebar />
            <div
                className={clsx(
                    "flex flex-col w-full duration-300 ease-in-out",
                    adminStore.sidebarCollapsed
                        ? "md:pl-[350px]"
                        : "md:pl-[80px]"
                )}
            >
                <div className="w-full flex flex-row px-4 py-4 sticky top-0 bg-background border-b-2">
                    <div className="flex items-center gap-1 flex-1">
                        <Button
                            onClick={() => adminStore.handleSidebar()}
                            className={clsx(
                                "bg-transparent border-none text-foreground hover:bg-background flex md:hidden"
                            )}
                        >
                            <RxHamburgerMenu />
                        </Button>
                        <h1>{adminStore.title}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                    </div>
                </div>
                <div className="h-[2000px] p-4">{children}</div>
            </div>
        </div>
    );
};

export default AdminTemplate;
