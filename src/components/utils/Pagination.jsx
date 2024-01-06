import { Pagination } from "flowbite-react";
import { usePageDate } from "../../hooks/usePageData";
import { useNavigate, useLocation } from "react-router-dom";
export const PaginationFooter = () => {
    const { page, totalPages } = usePageDate();

    const location = useLocation();
    const navigation = useNavigate();


    const handlePageChange = (page) => {
        navigation(`${page}`);
    }

    return (
        <div className="flex flex-col items-center pt-3">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} showIcons nextLabel="Siguiente" previousLabel="Anterior" />
            <p className="mt-2">Página <b>{page}</b> de <b>{totalPages}</b></p>
        </div>
    );
}; 