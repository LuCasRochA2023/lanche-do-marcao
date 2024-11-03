import React from "react"
import { RxAvatar } from "react-icons/rx";
import styles from "./Header.module.scss"
import { Link } from "react-router-dom";
import  logo from "./logoMarcao.png"
import OffCanvas from "../OffCanvas";
import { Col, Container, Row } from "react-bootstrap";
const Header = ({nomeUsuario = ""}) => {
    return (
        <header>
            
                
                
                <div className={styles.container}>
                <Container>
                <Row >
                    <Col md={3 } sm={3} xl={4} xxl={4} >
                        <div className={styles.firist_icon}>
                            <img src={logo} alt="logo marcao"/>
                        </div>
                    </Col>
                    <Col md={4} sm={4} xl={3}>
                        <h1 className={styles.titulo}>Lanche do Marcão</h1>
                    </Col>
                    <Col md={3} sm={2}xl={2 } xxl={3}>
                
                        <h2>{nomeUsuario}</h2>
                    </Col>
                    <Col sm={1} md={1} xl={1}  xxl={1} >
                    <Link to={'/login'}>
                        <RxAvatar className={styles.decoration} size={36}  />
                    </Link>
                    </Col>
                   <Col sm={1} md={1} xl={1} xxl={1}>
                        <OffCanvas/> 
                    </Col>
                        
                     
                
               
                
                </Row>
                </Container>
            </div>

            <div className={styles.segundo__container}>
                <h2>Os melhores lanches da cidade!</h2>
            </div>
        </header>
    )
}
export default Header;