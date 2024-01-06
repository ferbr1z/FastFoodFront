import { HiTrash, HiX } from "react-icons/hi"
import { ModalBase } from "./ModalBase"
import { Button } from "flowbite-react"
import { useErrorModal } from "../../../hooks/useErrorModal";
import { useEffect } from "react";
export const RemoveModal = ({ title, modalData, closeModal, removeFunction, isOpen, failedState }) => {

    const { showErrorModal } = useErrorModal();

    const removeHandler = () => {
        removeFunction(modalData.id);
        closeModal();
    }
    useEffect(() => {
        if (failedState === true) {
            showErrorModal();
        }
    }, [failedState]);
    

    return <ModalBase title={title || "Borrar"} open={modalData.remove} closeModal={closeModal} isOpen={isOpen}>
        <div className="text-center">
            <HiTrash className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-2xl font-normal text-gray-500 dark:text-gray-400">
                ¿Estas seguro que quieres borrar <br /> <b>{modalData.nombre}</b>?
            </h3>
            <div className="flex justify-center gap-4">
                <Button color="failure" onClick={removeHandler}>
                    <HiTrash className="w-4 h-4 mx-0 md:mr-1" />
                    Borrar
                </Button>
                <Button color="gray" onClick={closeModal}>
                    Cancelar
                </Button>
            </div>
        </div>
    </ModalBase>
}