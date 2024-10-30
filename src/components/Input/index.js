import styles from "./Input.module.scss"
import classNames from "classnames"
import React, { forwardRef } from "react"; // Importe forwardRef

export const Input = forwardRef(({ $error  , placeholder, id, type, ...props}, ref) => {
    const inputClass = classNames(styles.input, {
        [styles.inputError] : $error,
        [styles.inputFocusError] : $error
    })
    return (
        <input className={inputClass} placeholder={placeholder} type={type} id={id} ref={ref} {...props}/>
            
    )
})