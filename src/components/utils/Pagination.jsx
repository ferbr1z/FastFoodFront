import { Pagination } from "flowbite-react";
import { usePageDate } from "../../hooks/usePageData";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
export const PaginationFooter = ({ className, search, handlePageChange }) => {
    const { page, totalPages, totalSearchPages } = usePageDate();

    const location = useLocation();
    const navigation = useNavigate();


    const handlePageChangeDefault = (page) => {
        navigation(`${page}`);
    }

    return (
        <div className={`flex flex-col items-center mt-3 ${className} ${search && totalSearchPages === 1 ? "hidden" : ""}`}>
            <Pagination currentPage={page} totalPages={!search ? totalPages : totalSearchPages} onPageChange={handlePageChange ?? handlePageChangeDefault} showIcons nextLabel="" previousLabel="" />
            {search ? "" : <p className="mt-2">Página <b>{page}</b> de <b>{totalPages}</b></p>}
        </div>
    );
}; 