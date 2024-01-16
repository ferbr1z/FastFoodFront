import { useContext } from "react";
import { AppContext } from "../store/appContext";
import { PedidoApi } from "../api/pedidoApi";
import { useState } from "react";

export const usePedidos = () => {
    const [loadedState, setLoadedState] = useState(false);
    const [failedState, setFailedState] = useState(false);
    const [failedOnLoadState, setFailedOnLoadState] = useState(false);
    const { state, dispatch } = useContext(AppContext);
    const { pedidos } = state;
    const addPedido = async (pedido) => {
        try {
            setFailedState(false);
            const response = await PedidoApi.create(pedido);
            dispatch({ type: 'addPedido', payload: pedido });
        } catch (error) {
            setFailedState(true);
        }
    }

    const getAllPedidos = async (page) => {
        try {
            setFailedState(false);
            const response = await PedidoApi.all(page);
            dispatch({ type: 'getAllPedidos', payload: response.data });
            setLoadedState(true);
        } catch (error) {
            setFailedOnLoadState(true);
        }
    }

    const getAllPedidosEntregados = async (page) => {
        try {
            setFailedState(false);
            const response = await PedidoApi.all(page);
            dispatch({ type: 'getAllPedidosEntregados', payload: response.data });
            setLoadedState(true);
        } catch (error) {
            setFailedOnLoadState(true);
        }
    }

    const updatePedido = async (pedido) => {
        try {
            setFailedState(false);
            const response = await PedidoApi.update(pedido.id, pedido);
            dispatch({ type: 'updatePedido', payload: response.data });
        } catch (error) {
            setFailedState(true);
        }
    }

    const deletePedido = async (id) => {
        try {
            setFailedState(false);
            const response = await PedidoApi.delete(id);
            dispatch({ type: 'deletePedido', payload: id });
        } catch (e) { setFailedState(true) }
    }

    return { pedidos, addPedido, getAllPedidos, getAllPedidosEntregados, updatePedido, deletePedido, loadedState, failedState, failedOnLoadState };
}