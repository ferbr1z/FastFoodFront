export const reducerFunction = (state, action) => {
    switch (action.type) {
        case 'addProducto':
            console.log(state);
            return {
                ...state,
                productos: [...state.productos, action.payload],
            };
        case 'getAllProduct':
            return {
                ...state,
                productos: action.payload.data,
                page: action.payload.page,
                recordsPerPage: action.payload.recordsPerPage,
                totalRecords: action.payload.totalRecords,
                totalPages: action.payload.totalPages,
            };

        case 'updateProducto':
            return {
                ...state,
                productos: state.productos.map(producto => producto.id === action.payload.id ? {...producto, ...action.payload} : producto)
            };
        case 'deleteProducto':
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== action.payload)
            };

        case 'getAllPedidos':
            return {
                ...state,
                pedidos: action.payload.data,
                page: action.payload.page,
                recordsPerPage: action.payload.recordsPerPage,
                totalRecords: action.payload.totalRecords,
                totalPages: action.payload.totalPages,
            };

        case 'showModal':
            return {
                ...state,
                errorModalState: true
            };
        case 'hideModal':
            return {
                ...state,
                errorModalState: false
            };

        case 'failedFetchTrue':
            return {
                ...state,
                failedFetch: true
            };
        case 'failedFetchFalse':
            return {
                ...state,
                failedFetch: false
            };
        default:
            return state;
    }
};