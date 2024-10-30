import styles from "./PaginaBase.module.scss";
const PaginaBase = ({children}) => {
    return(
        <main className={styles.container}>
            {children}
        </main>
    )
}
export default PaginaBase;