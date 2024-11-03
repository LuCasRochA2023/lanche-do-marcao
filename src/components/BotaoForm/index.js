import styles from "./BotaoForm.module.scss"
export const BotaoForm = ({texto, type, onCLick}) => {
    return (
        <button type={type} className={styles.botao} onClick={onCLick}>
            {texto}
        </button>
    )
}