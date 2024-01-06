import { AppContext } from "../store/appContext";
import { useContext } from "react";

export const useErrorModal = () => {

    const { state, dispatch } = useContext(AppContext);

    const { errorModalState } = state;

    const showErrorModal = () => {
        dispatch({ type: 'showModal' });
    }

    const hideErrorModal = () => {
        dispatch({ type: 'hideModal' });
    }

    return { errorModalState, showErrorModal, hideErrorModal };

}