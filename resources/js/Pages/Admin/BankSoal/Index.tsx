import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AdminTemplate from "@/Layouts/Custom/AdminTemplate";
import CustomPagination from "@/Layouts/Custom/CustomPaginate";
import CustomTooltip from "@/Layouts/Custom/CustomTooltip";
import useAdminStore from "@/stores/useAdminStore";
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";

const FormDialog = () => {
    return (
        <div className="flex flex-col w-full py-4 gap-5">
            <div className="grid w-full items-center gap-1.5 px-1">
                <Label htmlFor="nama">Nama Materi</Label>
                <Input id="nama" type="text" className="" />
            </div>
            <div className="grid w-full items-center gap-1.5 px-1">
                <Label htmlFor="email">File</Label>
                <Input id="email" type="file" className="" />
            </div>
        </div>
    );
};

const Index = () => {
    const store = useAdminStore();

    useEffect(() => {
        store.setTitle("Bank Soal");
        store.setTitleModal("Tambah Materi");
        store.setBodyModal(<FormDialog />);

        return () => {
            store.reset();
        };
    }, []);

    return (
        <AdminTemplate>
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row mb-3 justify-between gap-2">
                    <div>
                        <Input type="text" placeholder="Search..." />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button
                            onClick={() => {
                                store.setIsOpenModal(true);
                            }}
                            className="ml-2 bg-green-500 hover:bg-green-600 dark:text-white"
                        >
                            Tambah
                        </Button>
                    </div>
                </div>
                <Table className="bg-background shadow rounded-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Judul</TableHead>
                            <TableHead>Jenis Soal</TableHead>
                            <TableHead>Jumlah Soal</TableHead>
                            <TableHead>Waktu Pengerjaan</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>Kuis 1</TableCell>
                            <TableCell>Bela Negara</TableCell>
                            <TableCell>80</TableCell>
                            <TableCell>60 Menit</TableCell>
                            <TableCell>
                                <div>
                                    <Badge className="bg-green-500 hover:bg-green-500 whitespace-nowrap">
                                        Tidak Aktif
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex gap-2 w-full justify-end">
                                    <Link href="/bank-soal/create">
                                        <CustomTooltip content="Edit Data">
                                            <Button
                                                variant="default"
                                                className="bg-orange-400 hover:bg-orange-500 aspect-square overflow-hidden p-0"
                                            >
                                                <MdOutlineModeEditOutline />
                                            </Button>
                                        </CustomTooltip>
                                    </Link>
                                    <CustomTooltip content="Hapus Data">
                                        <Button
                                            variant="destructive"
                                            className="aspect-square overflow-hidden p-0"
                                        >
                                            <AiOutlineDelete />
                                        </Button>
                                    </CustomTooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <CustomPagination />
            </div>
        </AdminTemplate>
    );
};

export default Index;
