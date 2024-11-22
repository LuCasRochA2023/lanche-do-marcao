import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Cards.module.scss";
import Row from 'react-bootstrap/Row';
import { useContext } from 'react';
import { CarrinhoContext } from '../../context/ProdutoContext';
function Cards({lanche} ) {
  const {adicionar} = useContext(CarrinhoContext);

  const adicionaAoCarrinho = (item) => {
    adicionar(item);
  }
  return (

    <Row xs={1} md={12}  className="g-4">
      
      <CardGroup className={styles.card_group}>
      {lanche.map((lanches)=> (

          <Card key={lanches.id} bg='light'>
          <Card.Img variant="top" src={lanches.imagem} />
          <Card.Body>
            <Card.Title>{lanches.nome}  </Card.Title>
            <Card.Text>
            {lanches.descricao}
            </Card.Text>
          </Card.Body>
  
            <Card.Footer className={styles.card_footer}>
            <small className="text-muted">{lanches.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL' })}</small>
            
            <FaShoppingCart style={{cursor:"pointer"}} size={26} onClick={()=> adicionaAoCarrinho(lanches)}/>
          </Card.Footer>
         
        </Card>

      ))}
    
    </CardGroup>
    </Row>
  );
}

export default Cards;