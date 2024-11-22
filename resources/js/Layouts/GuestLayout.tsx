import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-cyan-500">
                            GO
                        </span>
                        <span className="text-2xl font-bold text-gray-800">
                            CPNS
                        </span>
                    </div>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-8 shadow bg-background overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
