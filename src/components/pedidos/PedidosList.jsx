import { Button, ButtonGroup, Label, Radio, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"
import { useEffect, useState } from "react"
import { Loading } from "../utils/Loading"
import { H2 } from "../utils/headers/H2"
import { PedidoModal } from "./PedidoModal"
import { useParams } from "react-router-dom"
import { PaginationFooter } from "../utils/Pagination"
import { HiPlus, HiEye, HiXCircle, HiFilter } from "react-icons/hi";
import { RemoveModal } from "../utils/Modals/EraseModal"
import { usePedidos } from "../../hooks/usePedidos"


export const PedidosList = () => {

    const { page } = useParams();
    const { pedidos, getAllPedidos, getPedidoById, getPedidosEntregados, deletePedido, loadedState, failedState, failedOnLoadState } = usePedidos();
    const [modal, setModal] = useState({ new: false, update: false, remove: false });
    const [pedidoData, setPedidoData] = useState({ id: 0, nombreCliente: "", estado: "", direccion: "", pedidoDetalle: [] });

    const getAll = async () => {
        await getAllPedidos(page);
    }

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

    useEffect(() => {
        getAll();
    }, [page])

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

                return <div className="h-100 w-100 flex items-center justify-center my-80"><center>
                    <H2 color="gray">No hay pedidos todavía</H2>
                    <Button className="m-3" onClick={() => handleNew()}>
                        <HiPlus />
                        Nuevo pedido
                    </Button>
                </center></div>
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
        <div className="flex justify-center md:justify-between mb-3">
            <fieldset className="flex flex-row gap-4">
                <div className="text-gray-700 inline-flex items-center">
                    <HiFilter className="w-4 h-4 mx-0" /> Filtros:</div>
                <div className="flex items-center gap-2">
                    <Radio id="pendientes_filter" name="estado" onChange={() => getAllPedidosEntregados(page)} defaultChecked />
                    <Label htmlFor="pendientes_filter">Pendientes</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="entregados_filter" name="estado" onChange={() => getAllPedidosEntregados(page)} />
                    <Label htmlFor="entregados_filter">Entregados</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Radio id="cancelados_filter" name="estado" onChange={() => getAllPedidosEntregados(page)} />
                    <Label htmlFor="cancelados_filter">Cancelados</Label>
                </div>
            </fieldset>
            <Button className="" onClick={handleNew}>
                <HiPlus className="mx-1 w-3 h-3" />
                Nuevo pedido
            </Button>
        </div>
        <div className="drop-shadow-md rounded-md overflow-auto">
            <Table className="bg-white" hoverable>
                <TableHead className="w-full">
                    <TableHeadCell>Nombre de Cliente</TableHeadCell>
                    <TableHeadCell>Direccion</TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody>
                    {pedidos.map((pedido) => {
                        return (<TableRow key={pedido.id} className=" border-b">
                            <TableCell>{pedido.nombreCliente}</TableCell>
                            <TableCell className="">{pedido.direccion}</TableCell>
                            <TableCell>
                                <div className="inline-flex sm:gap-2">
                                    <Button color="light" outline onClick={() => handleEdit(pedido)}>
                                        <HiEye className="w-4 h-4 mx-0 md:mr-1" />
                                        <span className="hidden md:block">Ver</span></Button>
                                    <Button color="failure" outline onClick={() => handleErase(pedido)}>
                                        <HiXCircle className="w-4 h-4 mx-0 md:mr-1" />
                                        <span className="hidden md:block"> Cancelar</span>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table></div>
        <PaginationFooter /></>)

    return <>
        {showMessage()}
        <PedidoModal modal={modal} data={pedidoData} setData={setPedidoData} closeModal={closeModal} />
        <RemoveModal data={pedidoData} borrarTitulo={`el pedido de ${pedidoData.nombreCliente}?`} closeModal={closeModal} removeFunction={removeFuntion} open={modal.remove} failedState={failedState} />
    </>
}