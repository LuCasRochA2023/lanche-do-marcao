import React from "react"
import { RxAvatar } from "react-icons/rx";
import styles from "./Header.module.scss"
import { Link } from "react-router-dom";
import  logo from "./logoMarcao.png"
import OffCanvas from "../OffCanvas";
const Header = () => {
    return (
        <header>
            <div className={styles.container}>
                <div className={styles.firist_icon}>
                    <img src={logo} alt="logo marcao"/>
                </div>
          
                <h1 className={styles.titulo}>Lanche do Marcão</h1>
                <div className={styles.icons}>
                    
                    <Link to={'/login'}>
                        <RxAvatar size={36}  />
                    </Link>
                     <OffCanvas/> 
               
                </div>
                
            </div>

            <div className={styles.segundo__container}>
                <h2>Os melhores lanches da cidade!</h2>
            </div>
        </header>
    )
}
export default Header;