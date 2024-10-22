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
import React, { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";

const FormDialog = () => {
    return (
        <div className="flex flex-col w-full py-4 gap-5">
            <div className="grid w-full items-center gap-1.5 px-1">
                <Label htmlFor="nama">Nama</Label>
                <Input id="nama" type="text" className="" />
            </div>
            <div className="grid w-full items-center gap-1.5 px-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="text" className="" />
            </div>
            <div className="grid w-full items-center gap-1.5 px-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" className="" />
            </div>
            {/* level */}
            <div className="grid w-full items-center gap-1.5 px-1">
                <Label htmlFor="level">Level</Label>
                <Select>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

const Index = () => {
    const store = useAdminStore();

    useEffect(() => {
        store.setTitle("Management User");
        store.setTitleModal("Tambah User");
        store.setDescriptionModal("Silahkan isi form berikut");
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
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>

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
                            <TableHead>Nama</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>Bintang</TableCell>
                            <TableCell>mphstar@gmail.com</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell className="text-right">
                                <div className="flex gap-2 w-full justify-end">
                                    <CustomTooltip content="Edit Data">
                                        <Button
                                            variant="default"
                                            className="bg-orange-400 hover:bg-orange-500 aspect-square overflow-hidden p-0"
                                        >
                                            <MdOutlineModeEditOutline />
                                        </Button>
                                    </CustomTooltip>
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
