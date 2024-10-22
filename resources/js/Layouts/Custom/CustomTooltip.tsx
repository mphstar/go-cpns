import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import clsx from "clsx";
import React from "react";

interface TypeTooltip {
    children: React.ReactNode;
    content: string;
}

const CustomTooltip = ({ children, content }: TypeTooltip) => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent
                    side="top"
                    className={clsx("bg-slate-900 text-white")}
                >
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default CustomTooltip;
