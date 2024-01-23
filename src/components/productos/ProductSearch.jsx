import { Table, TableBody, TableRow, TextInput, TableCell} from "flowbite-react";
import { useEffect, useState } from "react"
import { useProducts } from "../../hooks/useProducts";

export const ProductSearch = () => {

    const [productoNombre, setProductoNombre] = useState("");

    const { productos } = useProducts();

    const handleSearch = (e) => {
    }

    useEffect(() => {
    }, [productoNombre]);

    return <>

        <TextInput type="search" id="productoSearch" value={productoNombre} onChange={handleSearch} />

        {/* {Resultado de busqueda} */}
        <Table className=" absolute z-50 shadow-md rounded-md mt-1 bg-white">
            <TableBody>
                <TableRow className="hover:bg-gray-50">
                    <TableCell><span className="font-bold bg-amber-200 text-yellow-800 rounded-md underline underline-offset-4">Hambur</span>guesa Tradicional</TableCell>
                    <TableCell className="font-bold text-red-600">15000</TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-50">
                    <TableCell><span className="font-bold bg-amber-200 text-yellow-800 rounded-md underline underline-offset-4">Hambur</span>guesa Tradicional</TableCell>
                    <TableCell className="font-bold text-red-600">15000</TableCell>
                </TableRow>
            </TableBody>
        </Table>

    </>

}