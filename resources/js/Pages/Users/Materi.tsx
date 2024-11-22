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

const Materi = () => {
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
                            <BreadcrumbPage>Materi</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 mt-6 ">
                <h1 className="font-semibold text-xl">Materi Belajar</h1>
                {/* add description */}
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Rangkuman materi pembelajaran
                </p>

                <div className="flex flex-row gap-2 mt-4 items-center bg-background border-[2px] px-4 py-1 rounded-md">
                    <AiOutlineSearch />
                    <input
                        className="bg-transparent border-none outline-none w-full py-1"
                        placeholder="Cari materi"
                    />
                </div>
            </div>

            <div className="sticky left-0 top-16 mt-4 z-[88] bg-[#F1F7FD] dark:bg-[#131414] px-4 max-w-7xl w-full mx-auto">
                <Tabs
                    defaultValue="Tes Wawasan Kebangsaan"
                    className="flex flex-wrap bg-transparent p-0"
                >
                    <TabsList className="bg-transparent w-full md:w-fit">
                        <TabsTrigger
                            className="data-[state=active]:text-cyan-500 data-[state=active]:bg-transparent data-[state=active]:font-semibold w-full data-[state=active]:border-b-4 border-cyan-500"
                            value="Tes Wawasan Kebangsaan"
                        >
                            <span className="block md:hidden">TWK</span>
                            <span className="hidden md:block">
                                Tes Wawasan Kebangsaan
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            className="data-[state=active]:text-cyan-500 data-[state=active]:bg-transparent data-[state=active]:font-semibold w-full data-[state=active]:border-b-4 border-cyan-500"
                            value="Tes Intelegensi Umum"
                        >
                            <span className="block md:hidden">TIU</span>
                            <span className="hidden md:block">
                                Tes Intelegensi Umum
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            className="data-[state=active]:text-cyan-500 data-[state=active]:bg-transparent data-[state=active]:font-semibold w-full data-[state=active]:border-b-4 border-cyan-500"
                            value="Tes Karakteristik Pribadi"
                        >
                            <span className="block md:hidden">TKP</span>
                            <span className="hidden md:block">
                                Tes Karakteristik Pribadi
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto w-full px-4 mt-6">
                <CardMateri />
                <CardMateri />
                <CardMateri />
                <CardMateri />
            </div>
        </div>
    );
};

const CardMateri = () => {
    return (
        <div className="flex flex-col border-[2px] p-4 bg-background w-full rounded-md">
            <div className="flex flex-row gap-2 items-center">
                <div className="w-8 h-8 p-2 flex justify-center items-center rounded-md bg-cyan-500">
                    <FiBookOpen className="text-white" />
                </div>
                <div>
                    <h1 className="font-semibold">Nama Materi</h1>
                    <p className="text-sm text-gray-500">
                        Tes Wawasan Kebangsaan
                    </p>
                </div>
            </div>
            <Button className="mt-4 bg-cyan-100 hover:bg-cyan-200 text-cyan-600">
                Lihat Materi
            </Button>
        </div>
    );
};

export default Materi;
