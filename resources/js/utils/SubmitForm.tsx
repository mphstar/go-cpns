import Swal from "sweetalert2";
import HitApi from "./HitApi";
import { text } from "stream/consumers";

interface TypeSubmitForm {
    onError?: () => void;
    onSuccess?: (result: any) => void;
    formOption: string;
    hitUrl: string;
    isFormData: boolean;
    body: any;
    textConfirmation?: string;
}

const SubmitForm = ({
    onError = () => {},
    onSuccess = () => {},
    formOption,
    hitUrl,
    isFormData,
    body,
    textConfirmation,
}: TypeSubmitForm) => {
    Swal.fire({
        title: "Konfirmasi",
        text:
            textConfirmation ||
            `Apakah anda yakin ingin ${
                formOption == "tambah" ? "menambahkan" : "mengubah"
            } data ini?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Loading",
                html: '<div class="body-loading"><div class="loadingspinner"></div></div>', // add html attribute if you want or remove
                allowOutsideClick: false,
                showConfirmButton: false,
            });

            HitApi({
                isFormData: isFormData,
                url: hitUrl,
                method: "POST",
                body: body,
                onSuccess: (result) => {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: result.message || "Data berhasil ditambahkan",
                        showConfirmButton: true,
                        timer: 1500,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        timerProgressBar: true,
                        didClose: () => {
                            Swal.close();
                        },
                    });

                    onSuccess(result);
                },
                onError: () => {
                    // Swal.fire("Gagal", "Data gagal ditambahkan", "error");
                    onError();
                },
            });
        }
    });
};

export default SubmitForm;
