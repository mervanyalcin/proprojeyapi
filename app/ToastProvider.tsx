"use client";

import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    const contextClass = {
        success: "bg-white",
        error: "bg-white",
        info: "bg-white",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
        dark: "bg-white-600 font-gray-300",
    };

    return (
        <>
            {children}
            <ToastContainer
                toastClassName={(context) =>
                    contextClass[context?.type || "default"] +
                    " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
                }
                bodyClassName={() => "text-sm font-white font-med block p-3 flex text-black"}
                position="top-right"
                autoClose={3000}
            />
        </>
    );
}