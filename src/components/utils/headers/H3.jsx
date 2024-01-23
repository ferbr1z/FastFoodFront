export const H3 = ({ children, color }) => {

    const classes = `ms-2 font-semibold text-2xl ${color === "gray" ? "text-gray-500 dark:text-gray-400" : ""}`

    return <h2 className={classes}>{children}</h2>
}