import Swal from "sweetalert2";

interface TypeHitApi {
    onFinally?: () => void;
    onSuccess?: (result: any) => void;
    onError?: () => void;
    url: string;
    method: string;
    body: any;
    option?: any;
    isFormData?: boolean;
}

const HitApi = async ({
    onFinally = () => {},
    onSuccess = (result) => {},
    onError = () => {},
    url,
    method,
    body,
    option,
    isFormData = false,
}: TypeHitApi) => {
    try {
        const storeData = await fetch(url, {
            body: isFormData ? body : JSON.stringify(body),
            method: method,
            headers: !isFormData ? { "Content-Type": "application/json" } : {},
        });

        const result = await storeData.json();
        if (storeData.status === 201 || storeData.status === 200) {
            onSuccess(result);
        } else {
            Swal.fire({
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                icon: "error",
                title: "Gagal",
                text: result.errors,
            });

            onError();
        }
    } catch (error) {
        onError();
    } finally {
        onFinally();
    }
};

export default HitApi;
