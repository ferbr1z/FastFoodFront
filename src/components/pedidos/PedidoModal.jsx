import { Label, TextInput, Button, Alert, Table, TableHead, TableHeadCell, TableRow, TableBody, TableCell } from "flowbite-react"
import { ModalBase } from "../utils/Modals/ModalBase";
import { useEffect, useState } from "react";
import { useErrorModal } from "../../hooks/useErrorModal";
import { EstadosPedidos } from "../utils/EstadosPedidos";
import { usePedidos } from "../../hooks/usePedidos";
import { ProductSearch } from "./ProductSearch";
import { H3 } from "../utils/headers/H3";
import { HiXCircle } from "react-icons/hi";
export const PedidoModal = ({ data, modal, setData, closeModal }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [nombreInputColor, setNombreInputColor] = useState("")
    const [alertMsg, setAlertMsg] = useState("");
    const { addPedido, updatePedido, failedState } = usePedidos();
    const { showErrorModal } = useErrorModal();

    const handleNombreClienteChange = (e) => {
        setData({ ...data, nombreCliente: e.target.value });
    }

    const handleEstadoChange = (e) => {
        setData({ ...data, direccion: e.target.value });
    }

    useEffect(() => {
        if (showAlert === false) return;
        if (data.nombreCliente === '') {
            setNombreInputColor("failure");
        } else {
            setNombreInputColor("");
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

        if (data.nombreCliente === '') {
            setShowAlert(true);
            setAlertMsg("El nombre del cliente no puede estar vacío.");
            setNombreInputColor("failure");
            return;
        }

        if (data.pedidoDetalle.length === 0) {
            setShowAlert(true);
            setAlertMsg("El pedido no puede estar vacío.");
            return;
        }

        if (data.nombreCliente === '') {
            setShowAlert(true);
            return;
        }



        if (modal.update) {
            // If the user only changed one of the values, we only send that value to the backend
            const newPedidoObject = {};
            newPedidoObject.id = data.id;
            newPedidoObject.nombreCliente = data.nombreCliente;
            newPedidoObject.direccion = data.direccion;
            newPedidoObject.pedidoDetalle = data.pedidoDetalle;

            updatePedido(newPedidoObject);
        }
        else {
            addPedido({ nombreCliente: data.nombreCliente, direccion: data.direccion });
        }
        closeAndResetValues();
    }

    const handleProductoCantidadChange = (e, producto) => {
        setData({
            ...data,
            pedidoDetalle: data.pedidoDetalle.map((detalle) => {
                if (detalle.producto.id === producto.id) {
                    return { ...detalle, cantidad: e.target.value };
                }
                return detalle;
            })
        })
    }

    const handleRemoveProducto = (id) => {
        setData({
            ...data,
            pedidoDetalle: data.pedidoDetalle.filter((detalle) => detalle.producto.id !== id)
        })
    }

    const closeAndResetValues = () => {
        setShowAlert(false);
        setNombreInputColor("");
        closeModal();
    }

    const pedidoTableEmpty = () => {
        return <div className="flex justify-center items-center p-4 sm:mt-2 rounded-md bg-white text-center">
            <H3 color="gray">Aún hay productos en el pedido</H3>
        </div>
    }

    const pedidoTable = () => {
        return <>
            <Table className="mt-2 rounded-md bg-white overflow-x-auto" hoverable>
                <TableHead className="hidden sm:table-header-group">
                    <TableHeadCell></TableHeadCell>
                    <TableHeadCell>Producto</TableHeadCell>
                    <TableHeadCell>Cantidad</TableHeadCell>
                    <TableHeadCell>Total</TableHeadCell>
                </TableHead>
                <TableBody>
                    {
                        data.pedidoDetalle.map((detalle) => {
                            return <TableRow className="border-b" key={detalle.producto.id}>
                                <TableCell className="px-2 py-1 md:px-6 md:py-4">
                                    <a className="hover:text-red-600 block p-3" title="Borrar de la lista" onClick={() => handleRemoveProducto(detalle.producto.id)} >
                                        <HiXCircle className="w-5 h-5 mx-0" />
                                    </a>
                                </TableCell>
                                <TableCell className="px-2 py-1 md:px-6 md:py-4">{detalle.producto.nombre}</TableCell>
                                <TableCell className="px-2 py-1 md:px-6 md:py-4"> <TextInput type="number" value={detalle.cantidad} className="w-20 max-w-full text-center" onChange={(e) => handleProductoCantidadChange(e, detalle.producto)} /> </TableCell>
                                <TableCell className="px-2 py-1 md:px-6 md:py-4">Gs.<b>{(detalle.producto.precio * detalle.cantidad)}</b></TableCell>

                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
            <div className=" bg-yellow-50 text-yellow-700 p-3 sm:mx-10 my-4 rounded-md shadow-xl">
                <div className="grid grid-cols-2 sm:px-3 text-center">
                    <span className="text-xl font-bold">Total</span>
                    <p>Gs. <span className="text-xl font-bold">
                        {
                            data.pedidoDetalle.reduce((pedido, suma) => (pedido + (suma.producto.precio * suma.cantidad)), 0
                            )}
                    </span></p>
                </div>
            </div>
        </>
    }

    const pedidoTableContent = () => {
        if (data.pedidoDetalle.length === 0) {
            return pedidoTableEmpty();
        }
        return pedidoTable();
    }

    return (
        <>
            <ModalBase title={modal.new ? "Agregar un pedido" : "Editar pedido"} open={modal.new || modal.update} closeModal={closeAndResetValues} onKeyDown={handleKeyDown}>
                <Alert color="red" className={`mb-6 ${showAlert === true ? "" : "hidden"}`}>
                    <p>{alertMsg}</p>
                </Alert>
                <div className="mb-8 space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="nombre" value="Nombre del Cliente:" />
                                <span className="text-red-500">*</span>
                            </div>
                            <TextInput color={nombreInputColor} id="nombre" value={data.nombreCliente} onChange={handleNombreClienteChange} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="direccion" value="Direccion:" />
                            </div>
                            <div className="flex items-center">
                                <TextInput color="" className="w-full" id="direccion" value={data.direccion} onChange={handleEstadoChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="sm:p-3 rounded-md bg-slate-50">
                        <ProductSearch pedido={data} setPedido={setData} />
                        {pedidoTableContent()}
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