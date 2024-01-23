import { useContext } from "react";
import { AppContext } from "../store/appContext";
import { ProductoApi } from "../api/productoApi";
import { useState } from "react";

export const useProducts = () => {
    const [loadedState, setLoadedState] = useState(false);
    const [failedState, setFailedState] = useState(false);
    const [failedOnLoadState, setFailedOnLoadState] = useState(false);
    const { state, dispatch } = useContext(AppContext);
    const { productos } = state;
    const addProducto = async (producto) => {
        try {
            setFailedState(false);
            const response = await ProductoApi.create(producto);
            dispatch({ type: 'addProducto', payload: producto });
        } catch (error) {
            setFailedState(true);
        }
    }

    const getAllProduct = async (page) => {
        try {
            setFailedState(false);
            const response = await ProductoApi.all(page);
            dispatch({ type: 'getAllProduct', payload: response.data });
            setLoadedState(true);
        } catch (error) {
            setFailedOnLoadState(true);
        }
    }

    const findProductByName = async (name, page) => {
        try {
            setLoadedState(false);
            setFailedOnLoadState(false);
            const response = await ProductoApi.findByName(name,page);
            dispatch({ type: 'findProductByName', payload: response.data });
            setLoadedState(true);
        } catch (error) {
            setFailedOnLoadState(true);
        }
    }

    const updateProducto = async (producto) => {
        try {
            setFailedState(false);
            const response = await ProductoApi.update(producto.id, producto);
            dispatch({ type: 'updateProducto', payload: response.data });
        } catch (error) {
            setFailedState(true);
        }
    }

    const deleteProducto = async (id) => {
        try {
            setFailedState(false);
            const response = await ProductoApi.delete(id);
            dispatch({ type: 'deleteProducto', payload: id });
        } catch (e) { setFailedState(true) }
    }

    return { productos, addProducto, getAllProduct, findProductByName, updateProducto, deleteProducto, loadedState, failedState, failedOnLoadState };
}