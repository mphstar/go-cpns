import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { Head, Link } from "@inertiajs/react";
import { MessageCircle } from "lucide-react";
import { IoClose } from "react-icons/io5";

const Welcome = () => {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Lapor APP FKIP UNEJ" />
            </Head>
            <div className="fixed bottom-8 right-8">
                <button className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>Halo kak, ada yang bisa dibantu?</span>
                </button>
            </div>
            <div className="w-full min-h-screen flex flex-col bg-[#F1F7FD] dark:bg-[#131414]">
                <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-cyan-500">
                            GO
                        </span>
                        <span className="text-2xl font-bold text-gray-800 dark:text-white">
                            CPNS
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
                        >
                            Tentang
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
                        >
                            Keunggulan
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
                        >
                            Testimoni
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
                        >
                            Paket
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900"
                        >
                            Blog
                        </a>
                    </div>
                </nav>
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <div className="order-2 md:order-1">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                                Bantu Kamu
                                <br />
                                Lulus Seleksi
                                <br />
                                <span className="text-cyan-500">CPNS!</span>
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Pemantapan materi, trik cepat
                                <br />
                                dan strategi belajar semua kamu dapetin di sini.
                            </p>
                            <p className="mb-8">
                                Cek{" "}
                                <a
                                    href="#"
                                    className="text-cyan-500 hover:underline"
                                >
                                    Paket AYOCPNS
                                </a>
                            </p>
                            <div className="flex space-x-4">
                                <Link href="/login">
                                    <button className="bg-cyan-500 text-white px-8 py-2 rounded-lg hover:bg-cyan-600 transition-colors">
                                        Masuk
                                    </button>
                                </Link>
                                <Link href="/register">
                                    <button className="bg-white text-gray-800 px-8 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                                        Daftar
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="relative order-1 md:order-2">
                            <div className="rounded-3xl p-4">
                                <img
                                    src="/assets/images/hero.png"
                                    alt="CPNS Mentor"
                                    className="rounded-2xl w-full"
                                />
                                {/* Feature Badges */}
                                <div className="absolute right-0 top-1/3 flex flex-col gap-4">
                                    <div className="bg-white px-6 py-2 rounded-l-full shadow-lg flex items-center gap-2">
                                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                                            <MessageCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="dark:text-black">
                                            Mulai No!
                                        </span>
                                    </div>
                                    <div className="bg-white px-6 py-2 rounded-l-full shadow-lg flex items-center gap-2">
                                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                                            <MessageCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="dark:text-black">
                                            Auto Paham!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full h-fit py-8 max-w-7xl mx-auto">
                    <p className="text-2xl md:text-4xl font-bold text-center text-[#636363] dark:text-gray-200">
                        FAQ
                    </p>
                    <div className="relative flex mt-6 items-center justify-center w-full">
                        <div className="h-[1px] absolute w-32 flex bg-[#DEDEDE] mt-6"></div>
                        <div className="h-[4px] absolute w-10 flex bg-cyan-500 mt-6"></div>
                    </div>
                    <div className="mx-auto container  flex px-6 flex-col max-w-[1000px] gap-4 mt-10">
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-start">
                                    Bagaimana cara membuat akun di GoCPNS?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Kamu bisa klik tombol Daftar, lalu mengisi
                                    form yang telah disediakan.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-start">
                                    Berapa lama masa berlaku paket yang saya
                                    beli?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Masa berlaku untuk paket CPNS adalah satu
                                    tahun dan paket BUMN 6 bulan terhitung sejak
                                    tanggal pembelian. Selama masa berlangganan
                                    masih aktif, kamu bisa menikmati seluruh
                                    fitur yang tersedia pada paket tersebut.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-start">
                                    Apakah saya bisa mengubah paket langganan?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Ya, kamu bisa mengubah paket langganan kapan
                                    saja melalui menu pengaturan akun.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-start">
                                    Bagaimana cara menghubungi layanan
                                    pelanggan?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Kamu bisa menghubungi layanan pelanggan
                                    melalui email support@gocpns.com atau
                                    melalui fitur live chat di aplikasi.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-start">
                                    Apakah data saya aman di GoCPNS?
                                </AccordionTrigger>
                                <AccordionContent>
                                    Kami menggunakan teknologi enkripsi terbaru
                                    untuk memastikan data kamu aman dan
                                    terlindungi.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <footer className="flex flex-row w-full justify-center mt-6 px-6 mb-4">
                    <div className="text-xs md:text-sm text-center">
                        Copyright © 2024 - All Right Reserved by X.
                    </div>
                </footer>
                {/* <footer className="footer items-center p-4 bg-neutral text-neutral-content">
                    <div className="container mx-auto footer items-center">
                        <aside className="items-center grid-flow-col">
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                className="fill-current"
                            >
                                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                            </svg>
                            <p className="flex flex-1">Copyright © 2023 - All right reserved</p>
                        </aside>
                        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current"
                                >
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </a>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current"
                                >
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                </svg>
                            </a>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current"
                                >
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </a>
                        </nav>
                    </div>
                </footer> */}
            </div>
        </>
    );
};

export default Welcome;
