import { Table, TableBody, TableRow, TextInput, TableCell } from "flowbite-react";
import { useEffect, useState } from "react"
import { useProducts } from "../../hooks/useProducts";
import { PaginationFooter } from "../utils/Pagination";
import { Loading } from "../utils/Loading";
import { HighlightSearchResult } from "../utils/HighlightSearchResult";

export const ProductSearch = ({ pedido, setPedido }) => {

    const [productoNombre, setProductoNombre] = useState("");
    const [productoSearchPage, setProductoSearchPage] = useState(1);
    const { productos, findProductByName, loadedState } = useProducts();

    const handleSearch = (e) => {
        setProductoNombre(e.target.value);
    }

    const handleProductClick = (producto) => {
        setPedido({ ...pedido, pedidoDetalle: [...pedido.pedidoDetalle, { producto: producto, cantidad: 1 }] });
        setProductoNombre("");
        setProductoSearchPage(1);
    }

    useEffect(() => {
        if (productoNombre.length < 3) return;
        findProductByName(productoNombre, productoSearchPage);
    }, [productoNombre, productoSearchPage]);

    const searchResult = () => {

        
        if (loadedState === false) return <Loading minimal />;
        if (productos.length === 0) return <p className="text-center m-3 font-bold text-gray-500">No se han encontrado coincidencias.</p>;

        return (<>
            <Table className="drop-shadow-none">
                <TableBody>
                    {productos.map((producto, i) => {
                        return <TableRow key={producto.id} onClick={() => handleProductClick(producto)} className={`hover:bg-gray-50 active:bg-gray-200 ${i < (productos.length - 1) ? "border-b" : ""}`}>
                            <TableCell>
                                <HighlightSearchResult text={producto.nombre} highlightText={productoNombre} />
                            </TableCell>
                            <TableCell>Gs. <span className="font-bold text-red-600">{producto.precio}</span> </TableCell>
                        </TableRow>
                    })
                    }
                </TableBody>
            </Table>
            <PaginationFooter className="mt-0" search handlePageChange={(page) => setProductoSearchPage(page)} /></>)
    }

    return (
        <>
            <div className="relative">
                <TextInput color="light" type="search" id="productoSearch" value={productoNombre} onChange={handleSearch} placeholder="Escribe el nombre del producto que deseas buscar..." />

                {/* Resultado de búsqueda */}
                <div className={`absolute z-40 bg-white w-full mt-1 p-2 rounded-md  shadow-lg ${productoNombre.length < 3 ? "hidden" : ""} `}>
                    {searchResult()}
                </div>
            </div>
        </>
    );




}