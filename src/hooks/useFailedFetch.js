import { useContext } from "react"
import { AppContext } from "../store/appContext"

export const useFailedFetch = () => {
    const { state, dispatch } = useContext(AppContext);

    const { failedFetch } = state;

    const failedFetchTrue = () => {
        dispatch({ type: 'failedFetchTrue' })
    }

    const failedFetchFalse = () => {
        dispatch({ type: 'failedFetchFalse' })
    }

    return { failedFetchTrue, failedFetchFalse, failedFetchState: failedFetch }

}