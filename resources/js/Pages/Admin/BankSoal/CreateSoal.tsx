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
import { Controller, useForm } from "react-hook-form";

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
import { MdOutlineFileUpload } from "react-icons/md";
import CustomTooltip from "@/Layouts/Custom/CustomTooltip";
import useFetch from "@/utils/Fetcher";
import NoDataTable from "@/Layouts/Custom/NoDataTable";
import SubmitForm from "@/utils/SubmitForm";
import Swal from "sweetalert2";

const formSchema = z.object({
    judul: z.string().min(3).max(100),
    jenis_soal: z.enum(["bela_negara", "pilar_negara"]),
    waktu_pengerjaan: z.string().regex(/^\d+$/, "Please enter a valid number"), // Menit ke detik
    status: z.enum(["aktif", "tidak_aktif"]),
    batas_nilai_twk: z.string().regex(/^\d+$/, "Please enter a valid number"), // Cek jika hanya angka yang diterima
    batas_nilai_tiu: z.string().regex(/^\d+$/, "Please enter a valid number"), // Cek jika hanya angka yang diterima
    batas_nilai_tkp: z.string().regex(/^\d+$/, "Please enter a valid number"), // Cek jika hanya angka yang diterima
});

const kuisSchema = z.object({
    soal: z.string().min(1).max(255),
    gambar_soal: z
        .union([z.instanceof(File), z.string()])
        .refine((file) => {
            if (typeof file === "string") return true;
            const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
            return validImageTypes.includes(file.type);
        }, "File harus berupa gambar (jpeg, jpg, png)")
        .optional()
        .nullable(),
    tipe_soal: z.enum(["twk", "tiu", "tkp"]),
    jawaban: z.array(
        z.object({
            id_jawaban: z.string().optional().nullable(),
            option: z.enum(["A", "B", "C", "D"]),
            jawaban: z.string().min(1).max(255),
            gambar_jawaban: z
                .union([z.instanceof(File), z.string()])
                .refine((file) => {
                    if (typeof file === "string") return true;
                    const validImageTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                    ];
                    return validImageTypes.includes(file.type);
                }, "File harus berupa gambar (jpeg, jpg, png)")
                .optional()
                .nullable(),
            score: z.string().optional().nullable(),
        })
    ),
});

const Index = (props: any) => {
    const store = useAdminStore();

    const [jumlahSoal, setJumlahSoal] = useState(
        props.data.soal.length == 0 ? 1 : props.data.soal.length
    );

    const [soal, setSoal] = useState(1);
    const [idSoal, setIdSoal] = useState(props.data.soal[0]?.id ?? 0);

    const url = `/api/bank-soal/get-soal?id_soal=${idSoal}`;

    const { data, error, isLoading } = useFetch(url);

    console.log(idSoal);

    useEffect(() => {
        store.setTitle("Bank Soal");

        return () => {
            store.reset();
        };
    }, []);

    const abjad = ["A", "B", "C", "D"];

    const [tab, setTab] = useState("soal");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: {
            judul: props.data.judul,
            waktu_pengerjaan: props.data.waktu_pengerjaan.toString(),
            status: props.data.status,
            jenis_soal: props.data.jenis_soal,
            batas_nilai_twk: props.data.batas_nilai_twk.toString(),
            batas_nilai_tiu: props.data.batas_nilai_tiu.toString(),
            batas_nilai_tkp: props.data.batas_nilai_tkp.toString(),
        },
    });

    const kuisForm = useForm<z.infer<typeof kuisSchema>>({
        resolver: zodResolver(kuisSchema),
        values: {
            soal: data?.result?.soal ?? "",
            tipe_soal: data?.result?.tipe_soal ?? "",
            gambar_soal: data?.result?.gambar_soal ?? "",
            jawaban: data?.result?.jawaban
                ? data?.result?.jawaban.map((item: any, i: Number) => {
                      return {
                          id_jawaban: item.id.toString(),
                          option: item.opsi,
                          jawaban: item.jawaban,
                          score: item.nilai.toString(),
                          gambar_jawaban: item.gambar_jawaban,
                      };
                  })
                : [
                      {
                          option: "A",
                          jawaban: "",
                          score: "",
                      },
                      {
                          option: "B",
                          jawaban: "",
                          score: "",
                      },
                      {
                          option: "C",
                          jawaban: "",
                          score: "",
                      },
                      {
                          option: "D",
                          jawaban: "",
                          score: "",
                      },
                  ],
        },
    });

    // console.log(kuisForm.formState.errors);

    function onSubmitKuisForm(values: z.infer<typeof kuisSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const formData = new FormData();

        formData.append("bank_soal_id", props.data.id);

        formData.append("id", idSoal);
        formData.append("soal", values.soal);
        formData.append("tipe_soal", values.tipe_soal);

        formData.append("jawaban", JSON.stringify(values.jawaban));

        if (values.jawaban.some((item: any) => item.gambar_jawaban)) {
            values.jawaban.forEach((item: any, i: number) => {
                if (item.gambar_jawaban) {
                    formData.append(
                        `gambar_jawaban_${abjad[i]}`,
                        item.gambar_jawaban
                    );
                }
            });
        }

        if (values.gambar_soal) {
            formData.append("gambar_soal", values.gambar_soal);
        }

        SubmitForm({
            body: formData,
            formOption: "tambah",
            hitUrl: `/api/bank-soal/update-soal`,
            isFormData: true,
            onSuccess(result) {
                console.log("id soal: " + idSoal);

                // refresh page
                if (idSoal == "0") {
                    window.location.reload();
                }
            },
        });
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        SubmitForm({
            body: {
                ...values,
                id_bank_soal: props.data.id,
            },
            formOption: "ubah",
            hitUrl: `/api/bank-soal/update`,
            isFormData: false,
            onSuccess(result) {
            },
        });
    }

    return (
        <AdminTemplate>
            <div className="flex flex-col min-h-[80dvh]">
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
                    <NoDataTable
                        isLoading={isLoading}
                        isEmpty={false}
                        isError={error}
                    >
                        {" "}
                        <>
                            <Alert>
                                <LightbulbIcon className="h-4 w-4" />
                                <AlertTitle>Informasi</AlertTitle>
                                <AlertDescription>
                                    Isi score jawaban jika memiliki poin
                                </AlertDescription>
                            </Alert>
                            <div className="flex flex-col-reverse md:flex-row gap-4 mt-4 relative">
                                <Form {...kuisForm}>
                                    <form
                                        onSubmit={kuisForm.handleSubmit(
                                            onSubmitKuisForm
                                        )}
                                        className="space-y-4 w-full"
                                        encType="multipart/form-data"
                                    >
                                        <div className="flex flex-col w-full">
                                            <div className="flex flex-col bg-background shadow p-6 rounded w-full h-fit">
                                                <div className="w-full mb-4">
                                                    <p className="mb-3 font-semibold">
                                                        Pilih Tipe Soal
                                                    </p>

                                                    <FormField
                                                        control={
                                                            kuisForm.control
                                                        }
                                                        name="tipe_soal"
                                                        render={({ field }) => (
                                                            <FormItem className="px-1">
                                                                <FormControl>
                                                                    <RadioGroup
                                                                        className="flex gap-4"
                                                                        onValueChange={(
                                                                            e
                                                                        ) =>
                                                                            field.onChange(
                                                                                e
                                                                            )
                                                                        }
                                                                        {...field}
                                                                    >
                                                                        <div className="flex items-center space-x-2">
                                                                            <RadioGroupItem
                                                                                value="twk"
                                                                                id="twk"
                                                                            />
                                                                            <Label htmlFor="twk">
                                                                                TWK
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex items-center space-x-2">
                                                                            <RadioGroupItem
                                                                                value="tiu"
                                                                                id="tiu"
                                                                            />
                                                                            <Label htmlFor="tiu">
                                                                                TIU
                                                                            </Label>
                                                                        </div>
                                                                        <div className="flex items-center space-x-2">
                                                                            <RadioGroupItem
                                                                                value="tkp"
                                                                                id="tkp"
                                                                            />
                                                                            <Label htmlFor="tkp">
                                                                                TKP
                                                                            </Label>
                                                                        </div>
                                                                    </RadioGroup>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <h1 className="font-semibold mb-2 mt-2">
                                                    Soal No {soal}
                                                </h1>

                                                <FormField
                                                    control={kuisForm.control}
                                                    name="soal"
                                                    render={({ field }) => (
                                                        <FormItem className="px-1">
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Masukkan soal"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* input gambar optional */}
                                                <div className="flex flex-col gap-2 mt-6 items-center h-48 w-48 border-2 border-dashed rounded relative">
                                                    <CustomTooltip content="Hapus">
                                                        <Button
                                                            type="button"
                                                            onClick={() => {
                                                                kuisForm.setValue(
                                                                    "gambar_soal",
                                                                    undefined
                                                                );
                                                            }}
                                                            className="bg-red-500 hover:bg-red-700 absolute -top-2 -right-2 w-6 h-6 z-10"
                                                        >
                                                            x
                                                        </Button>
                                                    </CustomTooltip>
                                                    <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none">
                                                        <MdOutlineFileUpload
                                                            size={24}
                                                        />
                                                        <span className="font-medium mt-2">
                                                            Upload
                                                        </span>
                                                        <p className="text-xs text-gray-500">
                                                            Masukkan gambar
                                                            disini
                                                        </p>
                                                    </div>

                                                    <input
                                                        onChange={(e) =>
                                                            kuisForm.setValue(
                                                                "gambar_soal",
                                                                e.target
                                                                    .files?.[0]
                                                            )
                                                        }
                                                        type="file"
                                                        className="absolute w-full h-full opacity-0"
                                                    />

                                                    <Controller
                                                        name="gambar_soal"
                                                        control={
                                                            kuisForm.control
                                                        }
                                                        render={({ field }) => {
                                                            // console.log("ini dia: " + field.value);

                                                            return field.value ? (
                                                                <img
                                                                    className="absolute w-full h-full object-cover pointer-events-none"
                                                                    src={
                                                                        field.value instanceof
                                                                        File
                                                                            ? URL.createObjectURL(
                                                                                  field.value
                                                                              )
                                                                            : `/uploads/soal/${field.value}`
                                                                    }
                                                                    alt="Preview Image"
                                                                />
                                                            ) : (
                                                                <div></div>
                                                            );
                                                        }}
                                                    />
                                                </div>

                                                {kuisForm.formState.errors
                                                    .gambar_soal && (
                                                    <p className="text-red-500 text-sm">
                                                        {
                                                            kuisForm.formState
                                                                .errors
                                                                .gambar_soal
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                                <Controller
                                                    name="jawaban"
                                                    control={kuisForm.control}
                                                    render={({ field }) => (
                                                        <>
                                                            {field.value.map(
                                                                (item, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="flex flex-col bg-background shadow p-6 rounded w-full h-fit "
                                                                    >
                                                                        <div className="flex items-center gap-2 border-b-[2px] pb-6 mb-4">
                                                                            <h1 className="w-full font-medium">
                                                                                Jawaban{" "}
                                                                                {
                                                                                    item.option
                                                                                }
                                                                            </h1>
                                                                            <div className="flex items-center gap-2">
                                                                                <Input
                                                                                    type="number"
                                                                                    placeholder="Score (0-5)"
                                                                                    value={
                                                                                        item.score?.toString() ??
                                                                                        ""
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        const newJawaban =
                                                                                            [
                                                                                                ...field.value,
                                                                                            ];
                                                                                        newJawaban[
                                                                                            i
                                                                                        ].score =
                                                                                            e.target.value;
                                                                                        field.onChange(
                                                                                            newJawaban
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <Textarea
                                                                            placeholder={`Masukkan jawaban ${item.option}`}
                                                                            value={
                                                                                field
                                                                                    .value[
                                                                                    i
                                                                                ]
                                                                                    .jawaban
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                const newJawaban =
                                                                                    [
                                                                                        ...field.value,
                                                                                    ];
                                                                                newJawaban[
                                                                                    i
                                                                                ].jawaban =
                                                                                    e.target.value;
                                                                                field.onChange(
                                                                                    newJawaban
                                                                                );
                                                                            }}
                                                                        />

                                                                        {kuisForm
                                                                            .formState
                                                                            .errors
                                                                            .jawaban &&
                                                                            kuisForm
                                                                                .formState
                                                                                .errors
                                                                                .jawaban[
                                                                                i
                                                                            ]
                                                                                ?.jawaban && (
                                                                                <p className="text-red-500 text-sm">
                                                                                    {
                                                                                        kuisForm
                                                                                            .formState
                                                                                            .errors
                                                                                            .jawaban[
                                                                                            i
                                                                                        ]
                                                                                            .jawaban
                                                                                            .message
                                                                                    }
                                                                                </p>
                                                                            )}

                                                                        {/* input gambar optional */}
                                                                        <div className="flex flex-col gap-2 mt-6 items-center h-48 w-48 border-2 border-dashed rounded relative">
                                                                            <CustomTooltip content="Hapus">
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        const newJawaban =
                                                                                            [
                                                                                                ...field.value,
                                                                                            ];
                                                                                        newJawaban[
                                                                                            i
                                                                                        ].gambar_jawaban =
                                                                                            undefined;
                                                                                        field.onChange(
                                                                                            newJawaban
                                                                                        );
                                                                                    }}
                                                                                    className="bg-red-500 hover:bg-red-700 absolute -top-2 -right-2 w-6 h-6 z-10"
                                                                                >
                                                                                    x
                                                                                </Button>
                                                                            </CustomTooltip>
                                                                            <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none">
                                                                                <MdOutlineFileUpload
                                                                                    size={
                                                                                        24
                                                                                    }
                                                                                />
                                                                                <span className="font-medium mt-2">
                                                                                    Upload
                                                                                </span>
                                                                                <p className="text-xs text-gray-500">
                                                                                    Masukkan
                                                                                    gambar
                                                                                    disini
                                                                                </p>
                                                                            </div>

                                                                            <input
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    const newJawaban =
                                                                                        [
                                                                                            ...field.value,
                                                                                        ];
                                                                                    newJawaban[
                                                                                        i
                                                                                    ].gambar_jawaban =
                                                                                        e.target.files?.[0];
                                                                                    field.onChange(
                                                                                        newJawaban
                                                                                    );
                                                                                }}
                                                                                type="file"
                                                                                className="absolute w-full h-full opacity-0"
                                                                            />

                                                                            {item?.gambar_jawaban && (
                                                                                <img
                                                                                    className="absolute w-full h-full object-cover pointer-events-none"
                                                                                    src={
                                                                                        item.gambar_jawaban instanceof
                                                                                        File
                                                                                            ? URL.createObjectURL(
                                                                                                  item.gambar_jawaban
                                                                                              )
                                                                                            : `/uploads/jawaban/${item.gambar_jawaban}`
                                                                                    }
                                                                                    alt="Preview Image"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                        {kuisForm
                                                                            .formState
                                                                            .errors
                                                                            .jawaban &&
                                                                            kuisForm
                                                                                .formState
                                                                                .errors
                                                                                .jawaban[
                                                                                i
                                                                            ]
                                                                                ?.gambar_jawaban && (
                                                                                <p className="text-red-500 text-sm">
                                                                                    {
                                                                                        kuisForm
                                                                                            .formState
                                                                                            .errors
                                                                                            .jawaban[
                                                                                            i
                                                                                        ]
                                                                                            .gambar_jawaban
                                                                                            .message
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                    </div>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            <div className="flex mt-4">
                                                <Button
                                                    type="submit"
                                                    className="bg-green-500 hover:bg-green-600 w-fit"
                                                >
                                                    Simpan Perubahan
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                                <div className="flex flex-col h-fit md:sticky md:top-28 md:right-0">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {/* button tambah dan hapus soal */}
                                        <Button
                                            onClick={() => {
                                                setJumlahSoal(jumlahSoal + 1);
                                                setSoal(jumlahSoal + 1);
                                                setIdSoal("0");
                                            }}
                                            className="bg-green-500 hover:bg-green-600 w-full"
                                        >
                                            Tambah Soal
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                console.log(idSoal);

                                                if (idSoal == "0") {
                                                    Swal.fire({
                                                        title: "Gagal",
                                                        text: "Soal belum disimpan",
                                                        icon: "error",
                                                    });
                                                } else {
                                                    SubmitForm({
                                                        body: { id: idSoal },
                                                        formOption: "hapus",
                                                        hitUrl: `/api/bank-soal/soal/delete`,
                                                        textConfirmation:
                                                            "Apakah anda yakin ingin menghapus soal ini?",
                                                        isFormData: false,
                                                        onError() {
                                                            Swal.fire(
                                                                "Gagal",
                                                                "Data gagal dihapus",
                                                                "error"
                                                            );
                                                        },
                                                        onSuccess(result) {
                                                            window.location.reload();
                                                        },
                                                    });
                                                }
                                            }}
                                            className="bg-red-500 hover:bg-red-600 w-full"
                                        >
                                            Hapus Soal
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-4 xl:grid-cols-5 gap-2 w-full">
                                        {Array.from({ length: jumlahSoal }).map(
                                            (_, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() => {
                                                        setSoal(index + 1);
                                                        setIdSoal(
                                                            props.data.soal[
                                                                index
                                                            ]?.id ?? 0
                                                        );
                                                    }}
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
                    </NoDataTable>
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
                                        name="jenis_soal"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Jenis Kuis
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={(e) =>
                                                            field.onChange(e)
                                                        }
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
                                        name="waktu_pengerjaan"
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
                                                                    id="aktif"
                                                                />
                                                                <Label htmlFor="aktif">
                                                                    Aktif
                                                                </Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem
                                                                    value="tidak_aktif"
                                                                    id="tidak_aktif"
                                                                />
                                                                <Label htmlFor="tidak_aktif">
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
                                    <div className="h-1"></div>
                                    <FormLabel>Batas Nilai</FormLabel>
                                    <div className="flex gap-2 border-2 p-3 rounded">
                                        <FormField
                                            control={form.control}
                                            name="batas_nilai_twk"
                                            render={({ field }) => (
                                                <FormItem className="px-1 w-full">
                                                    <FormLabel>TWK</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="batas_nilai_tiu"
                                            render={({ field }) => (
                                                <FormItem className="px-1 w-full">
                                                    <FormLabel>TIU</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="batas_nilai_tkp"
                                            render={({ field }) => (
                                                <FormItem className="px-1 w-full">
                                                    <FormLabel>TKP</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
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
