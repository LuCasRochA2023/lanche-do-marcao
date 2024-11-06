import { useContext, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaShoppingCart } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import React from 'react';
import { CarrinhoContext } from '../../context/ProdutoContext';
import { BotaoForm } from '../BotaoForm';
import styles from "./OffCanvas.module.scss"
import { NavItem } from 'react-bootstrap';
function OffCanvasExample({ name, ...props }) {
    const {carrinhoItens, aumentarQuantidadeDoProduto, diminuirQuantidadeDoProduto} = useContext(CarrinhoContext);
    const [open, setOpen] = useState(false);  
    const [show, setShow] = useState(false);  
 
    const valorTotal = carrinhoItens.reduce((total, item) => {
        return  total + (item.preco * item.quantidade);
    }, 0)

    const handleSnackbarOpen = () => {
        setOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleOffcanvasClose = () => setShow(false);
    const handleOffcanvasShow = () => setShow(true);

    return (
        <>
            <Button variant="" onClick={handleOffcanvasShow} style={{ padding: 0 }}>
                <FaShoppingCart size={36} /> {name}
            </Button>

            <Offcanvas show={show} onHide={handleOffcanvasClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Carrinho</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    {carrinhoItens.map((itens,index) => (
                       
                    <Card key={index} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={itens.imagem} />
                        <Card.Body>
                            <Card.Title>{itens.quantidade} {itens.nome}</Card.Title>
                            <Card.Text>
                                {itens.descricao}
                            </Card.Text>

                           <div className={styles.div}>
                                <IoIosRemoveCircleOutline onClick={() => diminuirQuantidadeDoProduto(itens.id)}size={36} color="blue" className="m-2" />
                                <IoIosAddCircleOutline  onClick={() => aumentarQuantidadeDoProduto(itens.id)}size={36} color="blue" />
                                <h5>{itens.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' })}</h5>
                            </div>
                        </Card.Body>
                    </Card>
                     
                    ))}
                   <div className={styles.botao}>

                   { carrinhoItens.length > 0 ? 
                   <><h2>Total: {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </h2><Button onClick={() => {
                                handleSnackbarOpen(); handleOffcanvasClose();
                            } } variant="primary">
                                Finalizar compra
                            </Button></> : <h2> Carrinho vazio</h2>}
                    </div>
                </Offcanvas.Body>
                

            </Offcanvas>

            <Snackbar
                anchorOrigin={{
                    vertical:"bottom",
                    horizontal:"center"

                }}
                size={300}
                open={open}
                autoHideDuration={10000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '50vw', height: '10vh', fontSize:'24px'}}
                    
                >
                    Seu pedido foi gerado com sucesso e chegará em breve!
                </Alert>
            </Snackbar>
        </>
    );
}

function OffCanvas() {
    return (
        <>
            {['end'].map((placement, idx) => (
                <OffCanvasExample key={idx} placement={placement} />
            ))}
        </>
    );
}

export default OffCanvas;
