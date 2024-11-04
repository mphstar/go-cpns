import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Textarea } from "@/Components/ui/textarea";
import AdminTemplate from "@/Layouts/Custom/AdminTemplate";
import useAdminStore from "@/stores/useAdminStore";
import { NotionLogoIcon } from "@radix-ui/react-icons";
import { LightbulbIcon, Terminal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

const formSchema = z.object({
    judul: z.string().min(2).max(50),
    durasi: z.string().min(1).max(120),
    status: z.enum(["aktif", "tidak aktif"]),
    jenis: z.string().min(2).max(50),
});

const Index = () => {
    const store = useAdminStore();

    useEffect(() => {
        store.setTitle("Bank Soal");

        return () => {
            store.reset();
        };
    }, []);

    const abjad = ["A", "B", "C", "D"];
    const [soal, setSoal] = useState(1);

    const [tab, setTab] = useState("soal");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            judul: "",
            durasi: "",
            status: "aktif",
            jenis: "bela_negara",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        alert(JSON.stringify(values, null, 2));
    }

    return (
        <AdminTemplate>
            <div className="flex flex-col">
                <div className="flex gap-2 mb-4">
                    <Button
                        onClick={() => setTab("soal")}
                        variant={tab === "soal" ? "default" : "outline"}
                    >
                        Soal
                    </Button>
                    <Button
                        onClick={() => setTab("pengaturan")}
                        variant={tab === "pengaturan" ? "default" : "outline"}
                    >
                        Pengaturan Kuis
                    </Button>
                </div>
                {tab === "soal" ? (
                    <>
                        <Alert>
                            <LightbulbIcon className="h-4 w-4" />
                            <AlertTitle>Informasi</AlertTitle>
                            <AlertDescription>
                                Isi score jawaban jika memiliki poin
                            </AlertDescription>
                        </Alert>
                        <div className="flex flex-col-reverse md:flex-row gap-4 mt-4">
                            <div className="flex flex-col w-full">
                                <div className="flex flex-col bg-background shadow p-6 rounded w-full h-fit">
                                    <div className="w-full mb-4">
                                        <p className="mb-3 font-semibold">
                                            Pilih Tipe Soal
                                        </p>
                                        <RadioGroup
                                            className="flex gap-4"
                                            defaultValue="comfortable"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="default"
                                                    id="r1"
                                                />
                                                <Label htmlFor="r1">TWK</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="comfortable"
                                                    id="r2"
                                                />
                                                <Label htmlFor="r2">TIU</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value="compact"
                                                    id="r3"
                                                />
                                                <Label htmlFor="r3">TKP</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <h1 className="font-semibold mb-2 mt-2">
                                        Soal No {soal}
                                    </h1>
                                    <Textarea placeholder="Masukkan soal" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                    {Array.from({ length: abjad.length }).map(
                                        (_, index) => (
                                            <div className="flex flex-col bg-background shadow p-6 rounded w-full h-fit ">
                                                <div className="flex items-center gap-2 border-b-[2px] pb-6 mb-4">
                                                    <h1 className="w-full font-medium">
                                                        Jawaban {abjad[index]}
                                                    </h1>
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            type="number"
                                                            placeholder="Score (0-5)"
                                                        />
                                                    </div>
                                                </div>
                                                <Textarea
                                                    placeholder={`Masukkan jawaban ${abjad[index]}`}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="flex mt-4">
                                    <Button className="bg-green-500 hover:bg-green-600 w-fit">
                                        Simpan Perubahan
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {/* button tambah dan hapus soal */}
                                    <Button className="bg-green-500 hover:bg-green-600 w-full">
                                        Tambah Soal
                                    </Button>
                                    <Button className="bg-red-500 hover:bg-red-600 w-full">
                                        Hapus Soal
                                    </Button>
                                </div>
                                <div className="grid grid-cols-5 gap-1">
                                    {Array.from({ length: 38 }).map(
                                        (_, index) => (
                                            <Button
                                                size={"lg"}
                                                onClick={() =>
                                                    setSoal(index + 1)
                                                }
                                                className=""
                                                variant={
                                                    index + 1 === soal
                                                        ? "default"
                                                        : "outline"
                                                }
                                            >
                                                {index + 1}
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="font-semibold mb-4">Edit Quiz</h1>
                        <div className="bg-background p-5 rounded-md shadow">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="judul"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Judul Kuis
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Masukkan judul"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                {/* <FormDescription>
                                                    This is your public display
                                                    name.
                                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="jenis"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Jenis Kuis
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(e) =>
                                                            field.onChange(e)
                                                        }
                                                        {...field}
                                                    >
                                                        <SelectTrigger className="">
                                                            <SelectValue />
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
                                                {/* <FormDescription>
                                                    This is your public display
                                                    name.
                                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="durasi"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Durasi</FormLabel>
                                                <FormControl>
                                                    <div className="flex gap-3 items-center">
                                                        <Input
                                                            type="number"
                                                            placeholder="Masukkan durasi"
                                                            {...field}
                                                        />
                                                        <p className="font-medium">
                                                            Menit
                                                        </p>
                                                    </div>
                                                </FormControl>
                                                {/* <FormDescription>
                                                    Contoh: 90
                                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={(e) =>
                                                            field.onChange(e)
                                                        }
                                                        {...field}
                                                    >
                                                        <div className="flex gap-4">
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem
                                                                    value="aktif"
                                                                    id="r1"
                                                                />
                                                                <Label htmlFor="r1">
                                                                    Aktif
                                                                </Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem
                                                                    value="tidak aktif"
                                                                    id="r2"
                                                                />
                                                                <Label htmlFor="r2">
                                                                    Tidak Aktif
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                {/* <FormDescription>
                                                    Contoh: 90
                                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="pt-4">
                                        <Button type="submit">Simpan</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </>
                )}
            </div>
        </AdminTemplate>
    );
};

export default Index;
