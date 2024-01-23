import { useContext } from "react";
import { AppContext } from "../store/appContext";

export const usePageDate = () => {
    const { state } = useContext(AppContext);
    const { page, recordsPerPage, totalRecords, totalPages, totalSearchPages } = state;

    return { page, recordsPerPage, totalRecords, totalPages, totalSearchPages };
}