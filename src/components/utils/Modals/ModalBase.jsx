import { Modal } from "flowbite-react"

export const ModalBase = ({ children, title, closeModal, onKeyDown, open }) => {

    return (<>
        <Modal dismissible show={open} onClose={closeModal} onKeyDown={onKeyDown} className="shadow-lg ">
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    </>)
}