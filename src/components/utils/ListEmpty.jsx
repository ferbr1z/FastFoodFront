import { Button } from "flowbite-react"
import { H2 } from "./headers/H2"
import { HiPlus } from "react-icons/hi"

export const ListEmpty = ({message, buttonText, functionToCall}) => {
    return (<div className="h-100 w-100 flex items-center justify-center my-80"><center>
        <H2 color="gray">{message}</H2>
        <Button className="m-3" onClick={functionToCall}>
            <HiPlus />
            {buttonText}
        </Button>
    </center></div>)
}