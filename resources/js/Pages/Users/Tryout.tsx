import HeaderApp from "@/Components/App/HeaderApp";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcump";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Link } from "@inertiajs/react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiBookOpen } from "react-icons/fi";
import { HiOutlineClock, HiOutlineNewspaper } from "react-icons/hi";
import { PiRanking } from "react-icons/pi";

const Tryout = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-[#F1F7FD] dark:bg-[#131414]">
            <HeaderApp />
            <div className="max-w-7xl mx-auto w-full px-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/app/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Tryout</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 mt-6 ">
                <h1 className="font-semibold text-xl">Try Out</h1>
                {/* add description */}
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Uji pemahaman kamu dengan mengerjakan latihan soal dan try
                    out.
                </p>

                <div className="flex flex-row gap-2 mt-4 items-center bg-background border-[2px] px-4 py-1 rounded-md">
                    <AiOutlineSearch />
                    <input
                        className="bg-transparent border-none outline-none w-full py-1"
                        placeholder="Ketik untuk mencari try out.."
                    />
                </div>
            </div>

            <div className="sticky left-0 top-16 mt-4 z-[88] bg-[#F1F7FD] dark:bg-[#131414] px-4 max-w-7xl w-full mx-auto">
                <Tabs
                    defaultValue="Bela Negara"
                    className="flex flex-wrap bg-transparent p-0"
                >
                    <TabsList className="bg-transparent w-full md:w-fit">
                        <TabsTrigger
                            className="data-[state=active]:text-cyan-500 data-[state=active]:bg-transparent data-[state=active]:font-semibold w-full data-[state=active]:border-b-4 border-cyan-500"
                            value="Bela Negara"
                        >
                            <span className="">Bela Negara</span>
                        </TabsTrigger>
                        <TabsTrigger
                            className="data-[state=active]:text-cyan-500 data-[state=active]:bg-transparent data-[state=active]:font-semibold w-full data-[state=active]:border-b-4 border-cyan-500"
                            value="Pilar Negara"
                        >
                            <span className="">
                                Pilar Negara
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-4 mt-6">
                <CardTryout />
                <CardTryout />
                <CardTryout />
                <CardTryout />
            </div>
        </div>
    );
};

const CardTryout = () => {
    return (
        <div className="flex flex-col border-[2px] p-4 bg-background w-full rounded-md">
            <div className="flex flex-row gap-2 items-center">
                <div className="w-8 h-8 p-2 flex justify-center items-center rounded-md bg-cyan-500">
                    <FiBookOpen className="text-white" />
                </div>
                <div>
                    <h1 className="font-semibold">
                        Try Out SKD 2024 - Premium#1
                    </h1>
                    <div className="flex gap-3 items-center text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex gap-1 items-center">
                            <HiOutlineNewspaper />
                            <p>100 Soal</p>
                        </div>
                        <div className="flex gap-1 items-center">
                            <HiOutlineClock />
                            <p>60 Menit</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <Button className="mt-4 bg-cyan-100 hover:bg-cyan-200 text-cyan-600 w-full">
                    Kerjakan
                </Button>
                <Button className="mt-4 bg-cyan-100 hover:bg-cyan-200 text-cyan-600 w-full flex gap-2 items-center">
                    <PiRanking className="" />
                    <p>Ranking</p>
                </Button>
            </div>
        </div>
    );
};

export default Tryout;
