import { useContext } from "react";
import { ModalContext } from "@/app/components/modal4"
export const useModal = () => {
    const { open, close } = useContext(ModalContext);
    return { open, close };
}