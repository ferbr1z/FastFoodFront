import { Label, TextInput, Button, Alert } from "flowbite-react"
import { ModalBase } from "../utils/Modals/ModalBase";
import { useProducts } from "../../hooks/useProducts";
import { useEffect, useState } from "react";
import { useErrorModal } from "../../hooks/useErrorModal";
export const ProductoModal = ({ data, modal, setData, closeModal }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [nombreInputColor, setNombreInputColor] = useState("")
    const [precioInputColor, setPrecioInputColor] = useState("")
    const [newProductoData, setNewProductoData] = useState({ id: 0, nombre: "", precio: "" });
    const { addProducto, updateProducto, failedState } = useProducts();
    const { showErrorModal } = useErrorModal();

    const handleNombreChange = (e) => {
        setData({ ...data, nombre: e.target.value });
    }

    const handlePrecioChange = (e) => {
        setData({ ...data, precio: e.target.value });
    }

    useEffect(() => {
        if (showAlert === false) return;
        if (data.nombre === '') {
            setNombreInputColor("failure");
        } else {
            setNombreInputColor("");
        }

        if (data.precio === '') {
            setPrecioInputColor("failure");
        } else {
            setPrecioInputColor("");
        }

    }, [showAlert, data]);

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

        if (data.nombre === '' && data.precio === '') {
            setShowAlert(true);
            setNombreInputColor("failure");
            setPrecioInputColor("failure");
            return;
        }

        if (data.nombre === '') {
            setShowAlert(true);
            return;
        }

        if (data.precio === '') {
            setShowAlert(true);
            return;
        }

        if (modal.update) {
            if (data.nombre === newProductoData.nombre && data.precio === newProductoData.precio) {
                closeAndResetValues();
                return;
            }

            updateProducto(data);
        }
        else {
            addProducto({ nombre: data.nombre, precio: data.precio });
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
            <ModalBase title={ modal.new? "Agregar un producto" : "Editar producto" } open={modal.new || modal.update} closeModal={closeAndResetValues} onKeyDown={handleKeyDown}>
                <Alert color="red" className={`mb-6 ${showAlert === true ? "" : "hidden"}`}>
                    <p>Los campos no pueden estar vacios</p>
                </Alert>
                <div className="mb-8 space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="nombre" value="Nombre:" />
                            <span className="text-red-500">*</span>
                        </div>
                        <TextInput color={nombreInputColor} id="nombre" value={data.nombre} onChange={handleNombreChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="precio" value="Precio:" />
                            <span className="text-red-500">*</span>
                        </div>
                        <div className="flex items-center">
                            <Label value="Gs." /> <TextInput color={precioInputColor} type="number" className="w-full" id="precio" value={data.precio} onChange={handlePrecioChange} required />
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