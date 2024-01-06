import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"
import { useProducts } from "../../hooks/useProducts"
import { useEffect, useState } from "react"
import { Loading } from "../utils/Loading"
import { H2 } from "../utils/headers/H2"
import { ProductoModal } from "./ProductModal"
import { useParams } from "react-router-dom"
import { PaginationFooter } from "../utils/Pagination"
import { HiPlus, HiTrash, HiPencil } from "react-icons/hi";
import { RemoveModal } from "../utils/Modals/EraseModal"


// import { CreateProductoModal } from "../utils/Modals/CreateProductModal"
export const ProductosList = () => {

    const { page } = useParams();

    const { productos, getAllProduct, loadedState, failedState, deleteProducto, failedOnLoadState } = useProducts();
    const [modalData, setModalData] = useState({
        new: false,
        update: false,
        remove: false,
        id: 0,
        nombre: "",
        precio: ""
    });

    const getAll = async () => {
        await getAllProduct(page);
    }

    const closeModal = () => { setModalData({ ...modalData, new: false, update: false, remove: false }) };

    const handleEdit = (producto) => {
        setModalData({
            update: true,
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            new: true,
        });
    }

    const handleErase = (producto) => {
        setModalData({
            ...modalData,
            remove: true,
            id: producto.id,
            nombre: producto.nombre,
        });
    }

    const removeFuntion = async (id) => {
        deleteProducto(id);
    }

    const handleOpenModal = () => {
        setModalData({ ...modalData, new: true })
        setModalData({
            new: true,
            nombre: "",
            precio: ""
        });
    }

    useEffect(() => {
        getAll();
    }, [page])

    const showMessage = () => {
        if (failedOnLoadState === true) {
            return <center><H2 color="gray">La conexión al servidor ha fallado</H2></center>
        }

        if (loadedState === true) {
            if (productos.length === 0) {
                if (page > 1)
                    return <center><>
                        <H2 color="gray">No hay más productos que mostrar</H2></>
                        <PaginationFooter />
                    </center>

                return <div className="h-100 w-100 flex items-center justify-center my-80"><center>
                    <H2 color="gray">No hay productos todavía</H2>
                    <Button className="m-3" onClick={() => handleOpenModal()}>
                        <HiPlus />
                        Agregar un producto
                    </Button>
                </center></div>
            }
            return renderTable();
        }

        return (<Loading />)

    }

    const renderTable = () => (<>
        <div className="flex justify-center md:justify-end">
            <Button className="mb-3" onClick={handleOpenModal}>
                <HiPlus className="mx-1 w-3 h-3" />
                Agregar un producto
            </Button>
        </div>
        <Table>
            <TableHead>
                <TableHeadCell><b>#</b></TableHeadCell>
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Precio</TableHeadCell>
                <TableHeadCell>Actiones</TableHeadCell>
            </TableHead>
            <TableBody>
                {productos.map((producto) => {
                    return (<TableRow key={producto.id} className=" border-b">
                        <TableCell>{producto.id}</TableCell>
                        <TableCell>{producto.nombre}</TableCell>
                        <TableCell>{producto.precio}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Button color="info" outline onClick={() => handleEdit(producto)}>
                                    <HiPencil className="w-4 h-4 mx-0 md:mr-1" />
                                    <span className="hidden md:block">Editar</span></Button>
                                <Button color="failure" outline onClick={() => handleErase(producto)}>
                                    <HiTrash className="w-4 h-4 mx-0 md:mr-1" />
                                    <span className="hidden md:block"> Borrar</span>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    )
                })}
            </TableBody>
        </Table>
        <PaginationFooter /></>)

    return <>
        {showMessage()}
        <ProductoModal modalData={modalData} setModalData={setModalData} closeModal={closeModal} />
        <RemoveModal failedState={failedState} title={`Borrar ${modalData.nombre}`} modalData={modalData} setModalData={setModalData} closeModal={closeModal} removeFunction={removeFuntion} isOpen={modalData.remove} />
    </>
}