import styles from './ErrorMessage.module.scss';
const ErrorMessage = ({children}) => {
    return (
        <span className={styles.span}>
            {children}
        </span>
    )
}
export default ErrorMessage;