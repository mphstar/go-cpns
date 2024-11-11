import { Button } from "@/Components/ui/button";
import {
    DialogClose,
    DialogFooter,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
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
import useAdminStore from "@/stores/useAdminStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
    ChangeEvent,
    ChangeEventHandler,
    useEffect,
    useState,
} from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { HiDownload } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { optional, z } from "zod";
import Swal from "sweetalert2";
import SubmitForm from "@/utils/SubmitForm";
import useFetch from "@/utils/Fetcher";
import { debounce } from "@/utils/Debounce";
import { mutate } from "swr";
import NoDataTable from "@/Layouts/Custom/NoDataTable";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(3).max(255).optional(),
    level: z.enum(["admin", "user"]),
});

const FormDialog = () => {
    const store = useAdminStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: {
            name: store.modalData.name || "",
            email: store.modalData.email || "",
            password: store.modalData.id ? "password" : "",
            level: store.modalData.role || "admin",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        SubmitForm({
            body: {
                ...values,
                id: store.modalData.id ?? "",
            },
            formOption: store.modalData.id ? "ubah" : "tambah",
            hitUrl: `/api/users/${store.modalData.id ? "update" : "create"}`,
            isFormData: false,
            onSuccess(result) {
                store.setIsOpenModal(false);
                mutate(store.refreshUrl);
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
                    name="email"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {store.modalData.id ? null : (
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem className="px-1">
                            <FormLabel>Level</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="user">
                                            User
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const url = `/api/users?page=${page}&search=${search}&filter=${filter}`;

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
        store.setTitle("Management User");
        store.setTitleModal("Tambah User");
        store.setDescriptionModal("Silahkan isi form berikut");
        store.setBodyModal(<FormDialog />);
        store.setRefreshUrl(url);

        return () => {
            store.reset();
        };
    }, []);

    const handleTambah = () => {
        store.setTitleModal("Tambah User");
        store.setIsOpenModal(true);
        store.setModalData({});
    };

    const handleEdit = (item: any) => {
        store.setTitleModal("Edit User");
        store.setIsOpenModal(true);
        store.setModalData(item);
    };

    const handleDelete = (id: string) => {
        SubmitForm({
            body: { id },
            formOption: "hapus",
            hitUrl: `/api/users/delete`,
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
            <div className="flex flex-col min-h-[80dvh]">
                <div className="flex flex-col md:flex-row mb-3 justify-between gap-2">
                    <div>
                        <Input
                            onChange={handleChangeSearch}
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Select
                            value={filter}
                            onValueChange={(e) => setFilter(e)}
                        >
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
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Level</TableHead>
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
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.role}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 w-full justify-end">
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
