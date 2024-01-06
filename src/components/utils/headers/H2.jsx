export const H2 = ({ children, color }) => {

    const classes = `ms-2 font-semibold text-3xl ${color === "gray" ? "text-gray-500 dark:text-gray-400" : ""}`

    return <h2 className={classes}>{children}</h2>
}