import { AppContext } from "./appContext";
import { reducerFunction } from "./reducerFunction";
import { useReducer } from "react";

export const Provider = ({ children }) => {
    const initialState = {
        productos: [],
        pedidos: [],
        page: 0,
        recordsPerPage: 0,
        totalRecords: 0,
        totalPages: 0,
        errorModalState: false ,
        failedFetch: false,
    };

    const [state, dispatch] = useReducer(reducerFunction, initialState);

    return (<AppContext.Provider value={{ state, dispatch }}>
        {children}
    </AppContext.Provider>);
}
