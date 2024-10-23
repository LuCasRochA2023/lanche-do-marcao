import React from "react"
import { TbHexagonLetterMFilled } from "react-icons/tb"
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Header.module.scss"
const Header = () => {
    return (
        <header>
            <div className={styles.container}>
                <TbHexagonLetterMFilled size={36}/>
                <h1 className={styles.titulo}>Lanche do Marcão</h1>
                <FaShoppingCart size={36}/>
            </div>

            <div className={styles.segundo__container}>
                <h2>Os melhores lanches da cidade!</h2>
            </div>
        </header>
    )
}
export default Header;