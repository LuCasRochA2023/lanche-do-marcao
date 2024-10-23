import React from "react";
import styles from "./Footer.module.scss";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { TbHexagonLetterMFilled } from "react-icons/tb"

const Footer = () => {
    return(
        <footer className={styles.footer}>
            
            <div className={styles.container_m}>
                <TbHexagonLetterMFilled className={styles.icon} size={24}/>
            
                
                <ul className={styles.container__redes__span}>
                    <div className={styles.container__redes}>
                        <li>
                            <BsTwitterX size={24}/>
                        </li>
                        <li>
                            <FaInstagram size={24}/>
                        </li>
                        <li>
                            <FaYoutube size={24}/>
                        </li>
                        <li>
                            <FaLinkedin size={24}/>
                        </li>
                        
                    </div>
                    </ul>

                </div>
                <ul className={styles.spans}>
                <li>
                    <p>Comidas</p>
                </li>
                <li>
                    <span>Hambúrguer</span>
                </li>
                <li>
                    <span>Pizza</span>
                </li>
                <li>
                    <span>Hot Dog</span>
                </li>
                <li>
                    <span>Espeto</span>
                </li>
                <li>
                    <span>Churrasco</span>
                </li>
                <li>
                    <span>Frango Assado</span>
                </li>
                <li>
                    <span>Carne artezanal </span>
                </li>
               
            </ul>
           <ul>
            <li>
                <p>
                    Bebidas
                </p>
            </li>
            <li>
                <span>
                    Coca-Cola
                </span>
            </li>
            <li>
                <span>
                    Suco Natural
                </span>
            </li>
            <li>
                <span>
                    Suco Prats
                </span>
            </li>
            <li>
                <span>
                    Pepsi
                </span>
            </li>
            <li>
                <span>
                    Guaraná Antártica
                </span>
            </li>
            <li>
                <span>
                    Brahma
                </span>
            </li>
            <li>
                <span>
                    Skol
                </span>
            </li>
           </ul>
            
        </footer>
    )
}
export default Footer;