import { Label, TextInput, Button, Alert, Table, TableHead, TableHeadCell, TableRow, TableBody, TableCell } from "flowbite-react"
import { ModalBase } from "../utils/Modals/ModalBase";
import { useEffect, useState } from "react";
import { useErrorModal } from "../../hooks/useErrorModal";
import { EstadosPedidos } from "../utils/EstadosPedidos";
import { usePedidos } from "../../hooks/usePedidos";
import { ProductSearch } from "./ProductSearch";
import { H3 } from "../utils/headers/H3";
export const PedidoModal = ({ data, modal, setData, closeModal }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [nombreInputColor, setNombreInputColor] = useState("")
    const [newPedidoData, setNewPedidoData] = useState({ id: 0, nombre: "", direccion: "", detalles: [] });
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
        if (data.nombre === '') {
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
            setNombreInputColor("failure");
            return;
        }

        if (data.nombreCliente === '') {
            setShowAlert(true);
            return;
        }

        if (data.direccion === '') {
            setShowAlert(true);
            return;
        }

        if (modal.update) {
            if (data.nombreCliente === newPedidoData.nombreCliente && data.direccion === newPedidoData.direccion) {
                closeAndResetValues();
                return;
            }

            // If the user only changed one of the values, we only send that value to the backend
            const newPedidoObject = {};
            newPedidoObject.id = data.id;
            newPedidoObject.nombreCliente = data.nombreCliente;
            newPedidoObject.direccion = data.direccion;

            updatePedido(newPedidoObject);
        }
        else {
            addPedido({ nombreCliente: data.nombreCliente, direccion: data.direccion });
        }
        closeAndResetValues();
    }

    const closeAndResetValues = () => {
        setShowAlert(false);
        setNombreInputColor("");
        closeModal();
    }

    return (
        <>
            <ModalBase title={modal.new ? "Agregar un pedido" : "Editar pedido"} open={modal.new || modal.update} closeModal={closeAndResetValues} onKeyDown={handleKeyDown}>
                <Alert color="red" className={`mb-6 ${showAlert === true ? "" : "hidden"}`}>
                    <p>Los campos no pueden estar vacios</p>
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

                    <div className="sm:p-3 rounded-md bg-slate-50 overflow-x-auto ">
                        <ProductSearch />
                        <Table className="sm:mt-2 rounded-md bg-white">
                            <TableHead className="hidden sm:table-header-group">
                                <TableHeadCell>Producto</TableHeadCell>
                                <TableHeadCell>Cantidad</TableHeadCell>
                                <TableHeadCell>Total</TableHeadCell>
                            </TableHead>
                            <TableBody>
                                <TableRow className="border-b">
                                    <TableCell>Hamburguesa Tradicional</TableCell>
                                    <TableCell> <TextInput type="number" value={100} className="w-20 max-w-full text-center" onChange={() => { }} /> </TableCell>
                                    <TableCell>30000</TableCell>
                                </TableRow>

                                <TableRow className="border-b">
                                    <TableCell>Hamburguesa Tradicional</TableCell>
                                    <TableCell> <TextInput type="number" value={100} className="w-20 max-w-full text-center" onChange={() => { }} /> </TableCell>
                                    <TableCell>30000</TableCell>
                                </TableRow>
                                <TableRow className="border-b">
                                    <TableCell>Hamburguesa Tradicional</TableCell>
                                    <TableCell> <TextInput type="number" value={100} className="w-20 max-w-full text-center" onChange={() => { }} /> </TableCell>
                                    <TableCell>30000</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className=" bg-yellow-50 text-yellow-700 p-3 sm:mx-10 rounded-md shadow-xl">
                        <div className="grid grid-cols-2 sm:px-3 text-center">
                            <span className="text-xl font-bold">Total</span>
                            <p>Gs. <span className="text-xl font-bold">60000</span></p>
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