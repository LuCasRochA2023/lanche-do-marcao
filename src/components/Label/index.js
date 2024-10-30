import styles from "./Label.module.scss"
export const Label = ({texto}) => {
    return (
        <label className={styles.label} >
            {texto}
        </label>
    )
}