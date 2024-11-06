import React from "react";
import { RxAvatar } from "react-icons/rx";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import logo from "./logoMarcao.png";
import OffCanvas from "../OffCanvas";
import { Col, Container, Row } from "react-bootstrap";

const Header = ({ nomeUsuario = "" }) => {
  return (
    <>
    <header className={styles.header}>
        <img src={logo} alt="logo marcao" className={styles.logo} />
     
       
              <h1 className={styles.titulo}>Lanche do Marcão</h1>
           
            
              <h2 className={styles.username}>{nomeUsuario}</h2>
            
          
              <Link to="/login">
                <RxAvatar className={styles.avatarIcon} size={36} />
              </Link>
           
              <OffCanvas />
            
        
         
      
      
      <div className={styles.subContainer}>
        <h2>Os melhores lanches da cidade!</h2>
      </div>
    </header>
    </>
  );
};

export default Header;
