import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"
import { useProducts } from "../../hooks/useProducts"
import { useEffect, useState } from "react"
import { Loading } from "../utils/Loading"
import { H2 } from "../utils/headers/H2"
import { useParams } from "react-router-dom"
import { ProductosTable } from "./ProductosTable"


export const ProductosView = () => {

    const { page } = useParams();

    const { getAllProduct, loadedState, failedOnLoadState } = useProducts();
    const [modalData, setModalData] = useState({
        new: false,
        id: 0,
        nombre: "",
        precio: ""
    });

    const getAll = async () => {
        await getAllProduct(page);
    }

    useEffect(() => {
        getAll();
    }, [page])

    const render = () => {
        if (failedOnLoadState === true) {
            return <center><H2 color="gray">La conexión al servidor ha fallado</H2></center>
        }

        if (loadedState === true) {
        
            return <ProductosTable />
        }

        return (<Loading />)

    }


    return <>
        {render()}
    </>
}