import { Button } from "@/Components/ui/button";
import { DialogTrigger } from "@/Components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
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
import NoDataTable from "@/Layouts/Custom/NoDataTable";
import useAdminStore from "@/stores/useAdminStore";
import { debounce } from "@/utils/Debounce";
import useFetch from "@/utils/Fetcher";
import SubmitForm from "@/utils/SubmitForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { mutate } from "swr";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    file: z
        .instanceof(File)
        .refine((file) => file.size < 1024 * 1024 * 10)
        .refine((file) => file.type === "application/pdf")
        .optional()
        .nullable(),
});

const FormDialog = () => {
    const store = useAdminStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: {
            name: store.modalData.name || "",
            file: null,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const formData = new FormData();

        if (store.modalData.id) {
            formData.append("id", store.modalData.id);
        }

        formData.append("name", values.name);
        if (values.file) {
            formData.append("file", values.file);
        }

        SubmitForm({
            body: formData,
            formOption: store.modalData.id ? "ubah" : "tambah",
            hitUrl: `/api/materi/${store.modalData.id ? "update" : "create"}`,
            isFormData: true,
            onSuccess(result) {
                store.setIsOpenModal(false);
                form.reset();
                mutate(store.refreshUrl);
            },
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full py-4 gap-5"
                encType="multipart/form-data"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>File</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.files
                                                ? e.target.files[0]
                                                : null
                                        )
                                    }
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="sm:justify-end flex w-full">
                    <Button
                        onClick={() => {
                            store.setIsOpenModal(false);
                        }}
                        type="button"
                        variant="secondary"
                    >
                        Close
                    </Button>
                    <Button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const Index = () => {
    const store = useAdminStore();

    useEffect(() => {
        store.setTitle("Materi");
        store.setTitleModal("Tambah Materi");
        store.setBodyModal(<FormDialog />);

        return () => {
            store.reset();
        };
    }, []);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const url = `/api/materi?page=${page}&search=${search}`;

    const handleSearch = debounce((term) => {
        setSearch(term);
    }, 500);

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPage(1);
        handleSearch(value);
    };

    const { data, error, isLoading } = useFetch(url);

    // deteksi jika ada perubahan page dan search
    useEffect(() => {
        store.setRefreshUrl(url);
    }, [search, page]);

    const handleTambah = () => {
        store.setTitleModal("Tambah Materi");
        store.setIsOpenModal(true);
        store.setModalData({});
    };

    const handleEdit = (item: any) => {
        store.setTitleModal("Edit Materi");
        store.setIsOpenModal(true);
        store.setModalData(item);
    };

    const handleDelete = (id: string) => {
        SubmitForm({
            body: { id },
            formOption: "hapus",
            hitUrl: `/api/materi/delete`,
            textConfirmation: "Apakah anda yakin ingin menghapus data ini?",
            isFormData: false,
            onError() {
                Swal.fire("Gagal", "Data gagal dihapus", "error");
            },
            onSuccess(result) {
                mutate(url);
            },
        });
    };

    return (
        <AdminTemplate>
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row mb-3 justify-between gap-2">
                    <div>
                        <Input
                            onChange={handleChangeSearch}
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button
                            onClick={() => {
                                handleTambah();
                            }}
                            className="ml-2 bg-green-500 hover:bg-green-600 dark:text-white"
                        >
                            Tambah
                        </Button>
                    </div>
                </div>
                <NoDataTable
                    isLoading={isLoading}
                    isEmpty={!data?.result.data.length}
                    isError={error}
                >
                    <>
                        <Table className="bg-background shadow rounded-md">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        No
                                    </TableHead>
                                    <TableHead>Nama Materi</TableHead>
                                    <TableHead className="text-right">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.result.data.map(
                                    (item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                {data.result.from + index}
                                            </TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 w-full justify-end">
                                                    <CustomTooltip content="Download">
                                                        <a
                                                            href={`/uploads/materi/${item.file}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button
                                                                variant="default"
                                                                className="aspect-square overflow-hidden p-0"
                                                            >
                                                                <HiOutlineDownload />
                                                            </Button>
                                                        </a>
                                                    </CustomTooltip>
                                                    <CustomTooltip content="Edit Data">
                                                        <Button
                                                            onClick={() => {
                                                                handleEdit(
                                                                    item
                                                                );
                                                            }}
                                                            variant="default"
                                                            className="bg-orange-400 hover:bg-orange-500 aspect-square overflow-hidden p-0"
                                                        >
                                                            <MdOutlineModeEditOutline />
                                                        </Button>
                                                    </CustomTooltip>
                                                    <CustomTooltip content="Hapus Data">
                                                        <Button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                            variant="destructive"
                                                            className="aspect-square overflow-hidden p-0"
                                                        >
                                                            <AiOutlineDelete />
                                                        </Button>
                                                    </CustomTooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                        <CustomPagination
                            total={data?.result.total}
                            showItem={data?.result.data.length}
                            page={page}
                            setPage={setPage}
                            limit={data?.result.per_page}
                        />
                    </>
                </NoDataTable>
            </div>
        </AdminTemplate>
    );
};

export default Index;
