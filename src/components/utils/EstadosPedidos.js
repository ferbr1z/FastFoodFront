export const EstadosPedidos = (valor) =>{
    switch (valor) {
        case 0:
            return 'Pendiente';
        case 1:
            return 'Entregado';
        case 2:
            return 'Cancelado';
        default:
            return null;
    }
}