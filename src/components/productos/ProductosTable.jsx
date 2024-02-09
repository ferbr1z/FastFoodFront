import { Button, Table, TableHead, TableHeadCell, TableCell, TableBody, TableRow } from "flowbite-react"
import { useProducts } from "../../hooks/useProducts";
import { RemoveModal } from "../utils/Modals/EraseModal";
import { useState } from "react";
import { HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { PaginationFooter } from "../utils/Pagination";
import { H2 } from "../utils/headers/H2";
import { useParams } from "react-router-dom"
import { ProductoModal } from "./ProductModal";

export const ProductosTable = () => {
    const { page } = useParams();

    const { productos, failedState } = useProducts();
    const [modal, setModal] = useState({ new: false, update: false, remove: false });
    const [productoData, setProductoData] = useState({ id: 0, nombre: "", precio: "" });

    const removeFuntion = async (id) => {
        deleteProducto(id);
    }

    const handleNew = () => {
        setModal({ ...modal, new: true });
        setProductoData({
            id: 0,
            nombre: "",
            precio: "",
        });
    }

    const handleEdit = (producto) => {
        setProductoData({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
        });
        setModal({ ...modal, update: true });
    }

    const handleErase = (producto) => {
        setProductoData({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
        });
        setModal({ ...modal, remove: true });
    }

    const closeModal = () => { setModal({ update: false, remove: false }) };

    const WithoutItems = () => {
        return (<div className="h-100 w-100 flex items-center justify-center my-80"><center>
            <H2 color="gray">No hay productos todavía</H2>
            <Button className="m-3" onClick={() => handleNew()}>
                <HiPlus />
                Agregar un producto
            </Button>
        </center></div>)
    }

    const NoMoreItems = () => {
        return (<center><>
            <H2 color="gray">No hay más productos que mostrar</H2></>
            <PaginationFooter />
        </center>)
    }

    const ShowItems = () => {
        return (<>
            <div className="flex justify-center md:justify-end">
                <Button className="mb-3" onClick={handleNew}>
                    <HiPlus className="mx-1 w-3 h-3" />
                    Agregar un producto
                </Button>
            </div>
            <Table className="bg-white" hoverable>
                <TableHead>
                    <TableHeadCell>Nombre</TableHeadCell>
                    <TableHeadCell>Precio</TableHeadCell>
                    <TableHeadCell></TableHeadCell>
                </TableHead>
                <TableBody>
                    {productos.map((producto) => {
                        return (<TableRow key={producto.id} className="border-b">
                            <TableCell>{producto.nombre}</TableCell>
                            <TableCell>{producto.precio}</TableCell>
                            <TableCell>
                                <div className="inline-flex sm:gap-2">
                                    <Button color="light" outline onClick={() => handleEdit(producto)}>
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
            <PaginationFooter />

        </>)
    }

    const render = () => {
        if (productos.length === 0) {
            return page > 1 ? NoMoreItems() : WithoutItems();
        }
        return ShowItems();
    }

    return (<>
        {render()}
        <RemoveModal data={productoData} open={modal.remove} closeModal={closeModal} removeFunction={removeFuntion} failedState={failedState} />
        <ProductoModal data={productoData} setData={setProductoData} modal={modal} closeModal={closeModal} />
    </>)
}