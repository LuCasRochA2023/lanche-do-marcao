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
        import styles from "./OffCanvas.module.scss";

        function OffCanvasExample({ name, ...props }) {
            const { carrinhoItens, aumentarQuantidadeDoProduto, diminuirQuantidadeDoProduto } = useContext(CarrinhoContext);
            const [open, setOpen] = useState(false);
            const [show, setShow] = useState(false);
            const [erroOpen, setErroOpen] = useState(false);  
            const valorTotal = carrinhoItens.reduce((total, item) => {
                return total + (item.preco * item.quantidade);
            }, 0);


            const cadastrarPedido = async () => {
                if (carrinhoItens.some(item => !item.nome || !item.descricao || item.preco == null || item.quantidade == null)) {
                    console.log("Um ou mais itens têm valores nulos ou inválidos:", carrinhoItens);
                    setErroOpen(true);
                    return;
                }
                
            
                for (const item of carrinhoItens) {
                    if (!item.nome || !item.descricao || !item.preco || item.preco <= 0 || item.quantidade <= 0) {
                        setErroOpen(true);
                        return;
                    }
                }
            
                const pedidoTeste = carrinhoItens.map(item => ({
                    nome: item.nome || "Nome não informado", 
                    descricao: item.descricao || "Descrição não informada",
                    preco: item.preco ? Number(item.preco.toFixed(2)) : 0, // Garantindo que o preço seja um número com 2 casas decimais
                    quantidade: item.quantidade || 1
                }));
                
                try {
                    console.log("Pedido enviado:", JSON.stringify(pedidoTeste))
                    console.log(carrinhoItens)
                    
                    const response = await fetch("http://localhost:8080/lanche", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        
                        body: JSON.stringify(pedidoTeste),
                    });
            
                    if (response.ok) {
                        handleSnackbarOpen();
                    } else {
                        const errorData = await response.json();
                        console.log("Erro ao enviar pedido", errorData);
                        setErroOpen(true); 
                    }
                } catch (error) {
                    console.error("Erro de rede:", error);
                    setErroOpen(true);
                }
            };
            
            
            const handleSnackbarOpen = () => {
                setOpen(true);
            };

            const handleSnackbarClose = (event, reason) => {
                if (reason === 'clickaway') return;
                setOpen(false);
            };

            const handleErroClose = () => {
                setErroOpen(false);
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
                            {carrinhoItens.map((itens, index) => (
                                <Card key={index} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={itens.imagem} />
                                    <Card.Body>
                                        <Card.Title>{itens.quantidade} {itens.nome}</Card.Title>
                                        <Card.Text>{itens.descricao}</Card.Text>

                                        <div className={styles.div}>
                                            <IoIosRemoveCircleOutline onClick={() => diminuirQuantidadeDoProduto(itens.id)} size={36} color="blue" className="m-2" />
                                            <IoIosAddCircleOutline onClick={() => aumentarQuantidadeDoProduto(itens.id)} size={36} color="blue" />
                                            <h5>{itens.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}

                            <div className={styles.botao}>
                                {carrinhoItens.length > 0 ?
                                    <>
                                        <h2>Total: {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                                        <Button onClick={() => {
                                            handleOffcanvasClose();
                                            cadastrarPedido();
                                        }} variant="primary">
                                            Finalizar compra
                                        </Button>
                                    </>
                                    : <h2>Carrinho vazio</h2>}
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>

                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        open={open}
                        autoHideDuration={10000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '50vw', height: '10vh', fontSize: '24px' }}>
                            Seu pedido foi gerado com sucesso e chegará em breve!
                        </Alert>
                    </Snackbar>

            
                    <Snackbar
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        open={erroOpen}
                        autoHideDuration={10000}
                        onClose={handleErroClose}
                    >
                        <Alert onClose={handleErroClose} severity="error" variant="filled" sx={{ width: '50vw', height: '10vh', fontSize: '24px' }}>
                            Ocorreu um erro ao tentar finalizar o pedido. Tente novamente.
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
