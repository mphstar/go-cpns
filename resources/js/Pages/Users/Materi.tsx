import HeaderApp from "@/Components/App/HeaderApp";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcump";
import { Input } from "@/Components/ui/input";
import { AiOutlineSearch } from "react-icons/ai";

const Materi = () => {
    return (
        <div className="w-full min-h-screen flex flex-col bg-[#F1F7FD] dark:bg-[#131414]">
            <HeaderApp />
            <div className="max-w-7xl mx-auto w-full px-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Materi</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="max-w-7xl mx-auto w-full px-4 mt-6">
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 mt-6">
                <div className="flex flex-col bg-background overflow-hidden group">
                    <img
                        className="w-full rounded-md h-64 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        src="/assets/images/book.jpg"
                        alt="Book"
                    />
                    <div className="px-4 py-2 pb-6">
                        <p className="font-medium mt-2">Materi Belajar</p>
                        <p className="text-gray-500 dark:text-gray-300 text-sm">
                            Rangkuman materi pembelajaran
                        </p>
                    </div>
                </div>
                <div className="flex flex-col bg-background overflow-hidden group">
                    <img
                        className="w-full rounded-md h-64 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        src="/assets/images/quiz.jpg"
                        alt="Quiz"
                    />
                    <div className="px-4 py-2 pb-6">
                        <p className="font-medium mt-2">Try Out</p>
                        <p className="text-gray-500 dark:text-gray-300 text-sm">
                            Tantang diri kamu untuk meraih skor tertinggi dari
                            pengguna lain.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col bg-background overflow-hidden group">
                    <img
                        className="w-full rounded-md h-64 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        src="/assets/images/history.jpg"
                        alt="History"
                    />
                    <div className="px-4 py-2 pb-6">
                        <p className="font-medium mt-2">Riwayat Kuis</p>
                        <p className="text-gray-500 dark:text-gray-300 text-sm">
                            Lihat dan pelajari kembali jawaban try out yang
                            pernah kamu kerjakan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Materi;
