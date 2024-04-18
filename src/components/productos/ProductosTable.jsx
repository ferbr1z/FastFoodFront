import { Button, Table, TableHead, TableHeadCell, TableCell, TableBody, TableRow, ButtonGroup } from "flowbite-react"
import { useProducts } from "../../hooks/useProducts";
import { RemoveModal } from "../utils/Modals/EraseModal";
import { useState } from "react";
import { HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { PaginationFooter } from "../utils/Pagination";
import { useParams } from "react-router-dom"
import { ProductoModal } from "./ProductModal";
import { ListEmpty } from "../utils/ListEmpty";
import { NoMoreItems } from "../utils/NoMoreItems";

export const ProductosTable = () => {
    const { page } = useParams();

    const { productos, deleteProducto, failedState } = useProducts();
    const [modal, setModal] = useState({ new: false, update: false, remove: false });
    const [productoData, setProductoData] = useState({ id: 0, nombre: "", precio: "" });

    const removeFuntion = async (id) => {
        await deleteProducto(id);
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


    const ShowItems = () => {
        return (<>
            <div className="flex justify-center md:justify-end">
                <Button className="mb-3" onClick={handleNew}>
                    <HiPlus className="mx-1 w-3 h-3" />
                    Agregar un producto
                </Button>
            </div>
            <Table className="bg-white overflow-x-auto" hoverable>
                <TableHead>
                    <TableHeadCell>Nombre</TableHeadCell>
                    <TableHeadCell>Precio</TableHeadCell>
                    <TableHeadCell className="w-0"></TableHeadCell>
                </TableHead>
                <TableBody>
                    {productos.map((producto) => {
                        return (<TableRow key={producto.id} className="border-b">
                            <TableCell>{producto.nombre}</TableCell>
                            <TableCell>{producto.precio}</TableCell>
                            <TableCell className="flex gap-2 w-25">
                                <Button color="light" className="inline" outline onClick={() => handleEdit(producto)}>
                                    <HiPencil className="w-4 h-4 mx-0 md:mr-1" />
                                    <span className="hidden md:block">Editar</span></Button>
                                <Button color="red" className="inline" onClick={() => handleErase(producto)}>
                                    <HiTrash className="w-4 h-4 mx-0 md:mr-1" />
                                    <span className="hidden md:block"> Borrar</span>
                                </Button>
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
            return page > 1 ? <NoMoreItems /> : <ListEmpty message="No hay productos para mostrar" buttonText="Agregar un producto" functionToCall={handleNew} />;
        }
        return ShowItems();
    }

    return (<>
        {render()}
        <RemoveModal data={productoData} open={modal.remove} closeModal={closeModal} removeFunction={removeFuntion} failedState={failedState} />
        <ProductoModal data={productoData} setData={setProductoData} modal={modal} closeModal={closeModal} />
    </>)
}