import { Spinner } from 'flowbite-react'
export const Loading = ({ minimal }) =>
    <>
        <center>
            <Spinner size="xl" /> <p> {minimal ? "" : "Cargando"} </p>
        </center>
    </>