import { Badge } from "@/Components/ui/badge";
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
import { Link } from "@inertiajs/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDownload } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { mutate } from "swr";
import { z } from "zod";

const formSchema = z.object({
    judul: z.string().min(3).max(100),
    jenis_soal: z.enum(["bela_negara", "pilar_negara"]),
    waktu_pengerjaan: z.string().regex(/^\d+$/, "Please enter a valid number"), // Menit ke detik
    status: z.enum(["aktif", "tidak_aktif"]),
    batas_nilai_twk: z.string().regex(/^\d+$/, "Please enter a valid number"), // Cek jika hanya angka yang diterima
    batas_nilai_tiu: z.string().regex(/^\d+$/, "Please enter a valid number"), // Cek jika hanya angka yang diterima
    batas_nilai_tkp: z.string().regex(/^\d+$/, "Please enter a valid number"), // Cek jika hanya angka yang diterima
});

const FormDialog = () => {
    const store = useAdminStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            judul: "",
            jenis_soal: undefined,
            status: undefined,
            waktu_pengerjaan: "",
            batas_nilai_twk: "",
            batas_nilai_tiu: "",
            batas_nilai_tkp: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        SubmitForm({
            body: values,
            formOption: "tambah",
            hitUrl: `/api/bank-soal/create`,
            isFormData: false,
            onSuccess(result) {
                store.setIsOpenModal(false);
                mutate(store.refreshUrl);
                form.reset();
            },
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full py-4 gap-5"
            >
                <FormField
                    control={form.control}
                    name="judul"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>Judul Soal</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="jenis_soal"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>Jenis Soal</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Pilih Jenis Soal" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bela_negara">
                                            Bela Negara
                                        </SelectItem>
                                        <SelectItem value="pilar_negara">
                                            Pilar Negara
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* waktu pengerjaan */}
                <FormField
                    control={form.control}
                    name="waktu_pengerjaan"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>Waktu Pengerjaan</FormLabel>
                            <FormControl>
                                <div className="flex gap-2 items-center">
                                    <Input type="number" {...field} />
                                    <span className="text-sm font-medium">
                                        Menit
                                    </span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* status */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="aktif">
                                            Aktif
                                        </SelectItem>
                                        <SelectItem value="tidak_aktif">
                                            Tidak Aktif
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* batas nilai twk, tiu, tkp, jadikan satu div */}
                <FormLabel>Batas Nilai</FormLabel>
                <div className="flex gap-2 border-2 p-3 rounded">
                    <FormField
                        control={form.control}
                        name="batas_nilai_twk"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>TWK</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="batas_nilai_tiu"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>TIU</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="batas_nilai_tkp"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>TKP</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

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

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const url = `/api/bank-soal?page=${page}&search=${search}`;

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

    useEffect(() => {
        store.setTitle("Bank Soal");
        store.setTitleModal("Tambah Materi");
        store.setBodyModal(<FormDialog />);
        store.setClassNameModal("w-[600px]");

        store.setRefreshUrl(url);

        return () => {
            store.reset();
        };
    }, []);

    const handleDelete = (id: string) => {
        SubmitForm({
            body: { id },
            formOption: "hapus",
            hitUrl: `/api/bank-soal/delete`,
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
            <div className="flex flex-col  min-h-[80dvh]">
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
                                store.setIsOpenModal(true);
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
                                    <TableHead>Judul</TableHead>
                                    <TableHead>Jenis Soal</TableHead>
                                    <TableHead>Jumlah Soal</TableHead>
                                    <TableHead>Waktu Pengerjaan</TableHead>
                                    <TableHead>Status</TableHead>
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
                                            <TableCell>{item.judul}</TableCell>
                                            <TableCell>
                                                {item.jenis_soal ==
                                                "bela_negara"
                                                    ? "Bela Negara"
                                                    : "Pilar Negara"}
                                            </TableCell>
                                            <TableCell>80</TableCell>
                                            <TableCell>
                                                {item.waktu_pengerjaan} Menit
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <Badge
                                                        className={`${
                                                            item.status ==
                                                            "aktif"
                                                                ? "bg-green-500 hover:bg-green-500"
                                                                : "bg-red-500 hover:bg-red-500"
                                                        } whitespace-nowrap`}
                                                    >
                                                        {item.status == "aktif"
                                                            ? "Aktif"
                                                            : "Tidak Aktif"}
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
