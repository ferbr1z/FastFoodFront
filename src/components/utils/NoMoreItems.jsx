import { PaginationFooter } from "./Pagination"
import { H2 } from "./headers/H2"

export const NoMoreItems = () => {
    return (<center><>
        <H2 color="gray">No hay más items que mostrar</H2></>
        <PaginationFooter />
    </center>)
}