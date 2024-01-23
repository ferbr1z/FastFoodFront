import { Table, TableBody, TableRow, TextInput, TableCell, TableHead, TableHeadCell } from "flowbite-react";
import { useEffect, useState } from "react"
import { useProducts } from "../../hooks/useProducts";
import { PaginationFooter } from "../utils/Pagination";
import { H3 } from "../utils/headers/H3";
import { Loading } from "../utils/Loading";
import { HighlightSearchResult } from "../utils/HighlightSearchResult";

export const ProductSearch = () => {

    const [productoNombre, setProductoNombre] = useState("");
    const [productoSearchPage, setProductoSearchPage] = useState(1);
    const { productos, findProductByName, loadedState } = useProducts();

    const handleSearch = (e) => {
        setProductoNombre(e.target.value);
    }

    useEffect(() => {
        if (productoNombre.length < 3) return;
        findProductByName(productoNombre, productoSearchPage);
    }, [productoNombre, productoSearchPage]);

    const searchResult = () => {
    
        if (productos.length === 0) return <p className="text-center m-3 font-bold text-gray-500">No se han encontrado coincidencias.</p>;

        if (loadedState === false) return <Loading minimal />;

        return (<>
            <Table className="drop-shadow-none">
                <TableBody>
                    {productos.map((producto) => {
                        return <TableRow key={producto.id} className="hover:bg-gray-50">
                            <TableCell>
                                <HighlightSearchResult text={producto.nombre} highlightText={productoNombre} />
                            </TableCell>
                            <TableCell className="font-bold text-red-600">{producto.precio}</TableCell>
                        </TableRow>
                    })
                    }
                </TableBody>
            </Table>
            <PaginationFooter className="mt-0" search handlePageChange={(page)=>setProductoSearchPage(page)} /></>)
    }

    return (
        <>
            <div className="relative">
                <TextInput type="search" id="productoSearch" value={productoNombre} onChange={handleSearch} />

                {/* Resultado de búsqueda */}
                <div className={`absolute z-40 bg-white w-full mt-1 p-2 rounded-md  shadow-lg ${productoNombre.length < 3 ? "hidden" : ""} `}>
                    {searchResult()}
                </div>
            </div>
        </>
    );




}