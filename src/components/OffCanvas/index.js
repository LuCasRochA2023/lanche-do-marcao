import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaShoppingCart } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as React from 'react';

function OffCanvasExample({ name, ...props }) {
    const [open, setOpen] = React.useState(false);  // Para Snackbar
    const [show, setShow] = useState(false);  // Para Offcanvas

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
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="./image4.jpg" />
                        <Card.Body>
                            <Card.Title>Chevette turbo</Card.Title>
                            <Card.Text>
                                Pão, batata palha, calabresa, bacon, alface e ovo.
                            </Card.Text>

                            <Button onClick={()=> {
                                handleSnackbarOpen(); handleOffcanvasClose()
                            }}  variant="primary">
                                Finalizar compra
                            </Button>

                            <IoIosRemoveCircleOutline size={36} color="blue" className="m-2" />
                            <IoIosAddCircleOutline size={36} color="blue" />
                        </Card.Body>
                    </Card>
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
