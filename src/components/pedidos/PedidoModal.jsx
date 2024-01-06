import { Label, TextInput, Button, Alert } from "flowbite-react"
import { ModalBase } from "../utils/Modals/ModalBase";
import { useProducts } from "../../hooks/useProducts";
import { useEffect, useState } from "react";
import { useErrorModal } from "../../hooks/useErrorModal";
export const ProductoModal = ({ modalData, setModalData, closeModal }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [nombreInputColor, setNombreInputColor] = useState("")
    const [precioInputColor, setPrecioInputColor] = useState("")
    const [newProductoData, setNewProductoData] = useState({ nombre: null, precio: null });
    const { addProducto, updateProducto, failedState } = useProducts();
    const { showErrorModal } = useErrorModal();
 
    const handleNombreChange = (e) => {
        setModalData({ ...modalData, nombre: e.target.value });
    }

    const handlePrecioChange = (e) => {
        setModalData({ ...modalData, precio: e.target.value });
    }

    useEffect(() => {
        if (showAlert === false) return;
        if (modalData.nombre === '') {
            setNombreInputColor("failure");
        } else {
            setNombreInputColor("");
        }

        if (modalData.precio === '') {
            setPrecioInputColor("failure");
        } else {
            setPrecioInputColor("");
        }

    }, [showAlert, modalData]);

    useEffect(() => {
        if (failedState == true) {
            showErrorModal();
        }
    }, [failedState]);


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    }

    const handleSave = () => {

        if (modalData.nombre === '' && modalData.precio === '') {
            setShowAlert(true);
            setNombreInputColor("failure");
            setPrecioInputColor("failure");
            return;
        }

        if (modalData.nombre === '') {
            setShowAlert(true);
            return;
        }

        if (modalData.precio === '') {
            setShowAlert(true);
            return;
        }

        if (modalData.update) {
            if (modalData.nombre === newProductoData.nombre && modalData.precio === newProductoData.precio) {
                closeAndResetValues();
                return;
            } 

            // If the user only changed one of the values, we only send that value to the backend
            const newProductoObject = {};
            if(modalData.nombre !== newProductoData.nombre) newProductoObject.nombre = modalData.nombre;
            if(modalData.precio !== newProductoData.precio) newProductoObject.precio = modalData.precio;

            updateProducto({ id: modalData.id, nombre: newProductoObject.nombre, precio: newProductoObject.precio });
        }
        else {
            addProducto({ nombre: modalData.nombre, precio: modalData.precio });
        }
        closeAndResetValues();
    }

    const closeAndResetValues = () => {
        setShowAlert(false);
        setNombreInputColor("");
        setPrecioInputColor("");
        closeModal();
    }

    return (
        <>
            <ModalBase title="Agregar un producto" open={modalData.new || modalData.update} setModalData={setModalData} closeModal={closeAndResetValues} onKeyDown={handleKeyDown}>
                <Alert color="red" className={`mb-6 ${showAlert===true ? "" : "hidden"}`}>
                    <p>Los campos no pueden estar vacios</p>
                </Alert>
                <div className="mb-8 space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nombre" value="Nombre:" />
                            <span className="text-red-500">*</span>
                        </div>
                        <TextInput color={nombreInputColor} id="nombre" value={modalData.nombre} onChange={handleNombreChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="precio" value="Precio:" />
                            <span className="text-red-500">*</span>
                        </div>
                        <div className="flex items-center">
                            <Label value="Gs." /> <TextInput color={precioInputColor} type="number" className="w-full" id="precio" value={modalData.precio} onChange={handlePrecioChange} required />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <Button onClick={handleSave}>Guardar</Button>
                    <Button color="gray" onClick={closeAndResetValues}>
                        Cancelar
                    </Button>
                </div>
            </ModalBase>
        </>)
}