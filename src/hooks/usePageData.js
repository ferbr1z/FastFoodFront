import { useContext } from "react";
import { AppContext } from "../store/appContext";

export const usePageDate = () => {
    const { state } = useContext(AppContext);
    const { page, recordsPerPage, totalRecords, totalPages } = state;

    return { page, recordsPerPage, totalRecords, totalPages };
}