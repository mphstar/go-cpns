import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import useAdminStore from "@/stores/useAdminStore";
import React from "react";

interface TypeModal {
    title: string;
    description: string;
    body: React.ReactNode;
}

const CustomDialog = ({ title, description, body }: TypeModal) => {
    const store = useAdminStore();

    return (
        <Dialog open={store.isOpenModal} onOpenChange={store.setIsOpenModal}>
            <DialogContent className="sm:max-w-md max-h-[90%] flex flex-col h-fit">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col overflow-y-auto">{body}</div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;
