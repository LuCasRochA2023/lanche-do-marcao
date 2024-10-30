import styles from "./BotaoForm.module.scss"
export const BotaoForm = ({texto, type}) => {
    return (
        <button type={type} className={styles.botao}>
            {texto}
        </button>
    )
}