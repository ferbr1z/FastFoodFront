import { Button, Label, Radio, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"
import { useEffect, useState } from "react"
import { Loading } from "../utils/Loading"
import { H2 } from "../utils/headers/H2"
import { PedidoModal } from "./PedidoModal"
import { useParams } from "react-router-dom"
import { PaginationFooter } from "../utils/Pagination"
import { HiPlus, HiEye, HiXCircle, HiFilter, HiOutlineCheckCircle } from "react-icons/hi";
import { RemoveModal } from "../utils/Modals/EraseModal"
import { usePedidos } from "../../hooks/usePedidos"


export const PedidosView = () => {

    const { page } = useParams();
    const { pedidos, getAllPedidos, getPedidoById, getPedidosEntregados, getPedidosCancelados, deletePedido, entregarPedido, cancelarPedido, loadedState, failedState, failedOnLoadState } = usePedidos();
    const [modal, setModal] = useState({ new: false, update: false, remove: false });
    const [pedidoData, setPedidoData] = useState({ id: 0, nombreCliente: "", estado: "", direccion: "", pedidoDetalle: [] });
    const [fetchEstado, setFetchEstado] = useState("pendientes");

    const closeModal = () => { setModal({ ...modal, new: false, update: false, remove: false }) };

    const handleNew = () => {
        setModal({ ...modal, new: true })
        setPedidoData({
            id: 0,
            nombreCliente: "",
            estado: "",
            direccion: "",
            pedidoDetalle: [],
        });
    }


    const handleEdit = async (producto) => {
        setModal({ ...modal, update: true });
        const pedido = await getPedidoById(producto.id);
        setPedidoData({ ...pedido, pedidoDetalle: pedido.pedidoDetalle });
    }

    const handleErase = (producto) => {
        setModal({ ...modal, remove: true });
        setPedidoData({
            ...pedidoData,
            id: producto.id,
            nombreCliente: producto.nombreCliente,
        });
    }

    const removeFuntion = async (id) => {
        deletePedido(id);
    }

    const getPedidos = async (page) => {
        switch (fetchEstado) {
            case "":
                await getAllPedidos(page);
                break;
            case "pendientes":
                await getAllPedidos(page);
                break;
            case "entregados":
                await getPedidosEntregados(page);
                break;
            case "cancelados":
                await getPedidosCancelados(page);
                break;
            default:
                break;
        }
    }

    const handleEstadoChange = (estado) => {
        setFetchEstado(estado);
    }

    useEffect(() => {
        getPedidos(page);
    }, [page, fetchEstado])

    const showMessage = () => {
        if (failedOnLoadState === true) {
            return <center><H2 color="gray">La conexión al servidor ha fallado</H2></center>
        }

        if (loadedState === true) {
            if (pedidos.length === 0) {
                if (page > 1)
                    return <center><>
                        <H2 color="gray">No hay más pedidos que mostrar</H2></>
                        <PaginationFooter />
                    </center>

                if (fetchEstado === "") {
                    return <div className="h-100 w-100 flex items-center justify-center my-80"><center>
                        <H2 color="gray">No hay pedidos todavía</H2>
                        <Button className="m-3" onClick={() => handleNew()}>
                            <HiPlus />
                            Nuevo pedido
                        </Button>
                    </center></div>
                } else if (fetchEstado === "entregados" || fetchEstado === "cancelados") {
                    return <>
                        <div className="h-100 w-100 flex items-center justify-center my-80">
                            <center>
                                <H2 color="gray">Nada por aqui</H2>
                            </center>
                        </div>
                    </>
                }

            }
            return renderContent();
        }

        return (<Loading />)

    }

    const renderContent = () => {
        return <>
            {renderTable()}
        </>
    }

    const renderTable = () => (<>
        <div className="rounded-md overflow-auto">
            <Table className="bg-white" hoverable>
                <TableHead className="w-full">
                    <TableHeadCell>Cliente</TableHeadCell>
                    <TableHeadCell>Total</TableHeadCell>
                    <TableHeadCell className="hidden sm:table-cell">Direccion</TableHeadCell>
                    <TableHeadCell className="w-0"></TableHeadCell>
                </TableHead>
                <TableBody>
                    {pedidos?.map((pedido) => {
                        return (<TableRow key={pedido.id} className="border-b last:border-none">
                            <TableCell>{pedido.nombreCliente}</TableCell>
                            <TableCell>{pedido.total}</TableCell>
                            <TableCell  className="hidden sm:table-cell">{pedido.direccion}</TableCell>
                            <TableCell className="flex sm:gap-2">

                                    <Button className="p-0 py-1" color="light" onClick={() => handleEdit(pedido)}>
                                        <HiEye className="w-4 h-4 mx-0 md:mr-1" />
                                        <span className="hidden md:block">Ver</span></Button>
                                    
                                    {fetchEstado==="pendientes" ?  (<><Button className="p-0 py-1" color="green" onClick={()=>entregarPedido(pedido.id)}>
                                        <HiOutlineCheckCircle className="w-4 h-4 mx-0 md:mr-1" /><span className="hidden md:block"> Entregado</span>
                                    </Button>
                                    <Button className="p-0 py-1" color="red" onClick={() => cancelarPedido(pedido.id)}>
                                        <HiXCircle className="w-4 h-4 mx-0 md:mr-1" />
                                        <span className="hidden md:block"> Cancelar</span>
                                    </Button></>) : <></>}
                                    
                            </TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table></div>
        <PaginationFooter /></>)

    return <>
        <><div className="flex flex-col items-center md:flex-row justify-center md:justify-between mb-3">
            <Button className={`mb-3 md:order-2 md:mb-0 ${fetchEstado === "pendientes" ? "" : "invisible"}`} onClick={handleNew}>
                <HiPlus className="mx-1" />
                Nuevo pedido
            </Button>

            <fieldset className="flex flex-row gap-4">
                <div className="flex items-center gap-2">
                    <Radio id="pendientes_filter" name="estado" onChange={() => handleEstadoChange("pendientes")} defaultChecked />
                    <Label htmlFor="pendientes_filter">Pendientes</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="entregados_filter" name="estado" onChange={() => handleEstadoChange("entregados")} />
                    <Label htmlFor="entregados_filter">Entregados</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="cancelados_filter" name="estado" onChange={() => handleEstadoChange("cancelados")} />
                    <Label htmlFor="cancelados_filter">Cancelados</Label>
                </div>
            </fieldset>

        </div></>
        {showMessage()}
        <PedidoModal modal={modal} data={pedidoData} setData={setPedidoData} closeModal={closeModal} />
        <RemoveModal data={pedidoData} borrarTitulo={`el pedido de ${pedidoData.nombreCliente}?`} closeModal={closeModal} removeFunction={removeFuntion} open={modal.remove} failedState={failedState} />
    </>
}