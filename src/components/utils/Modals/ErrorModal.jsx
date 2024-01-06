import { ModalBase } from "./ModalBase"
import { HiX } from "react-icons/hi";
import {Button} from "flowbite-react"

export const ErrorModal = ({ modalData, closeModal }) => {
    return <ModalBase title="Error" open={modalData} closeModal={closeModal}>
        <div className="text-center">
            <HiX className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Ha ocurrido un error, intentalo nuevamente.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={closeModal}>
                Aceptar
              </Button>
            </div>
        </div>
    </ModalBase>
}