import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Cards.module.scss";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function Cards() {
  return (
    <Row xs={1} md={12} className="g-4">
    <CardGroup className={styles.card_group}>
      <Card bg='light'>
        <Card.Img  variant="top" src="image2.jpg" />
        <Card.Body className={styles.corpo}>
          <Card.Title>Opala 6 Cilindros</Card.Title>
          <Card.Text>
            Pão,batata palha, calabresa,bacon,alface e ovo.
          </Card.Text>
 di       </Card.Body>
        <Card.Footer className={styles.card_footer}>
          <small className="text-muted">R$ 24,99</small>
          <FaShoppingCart/>
        </Card.Footer>
      </Card>
      <Card bg='light'>
        <Card.Img variant="top" src="image4.jpg" />
        <Card.Body>
          <Card.Title>Chevette turbo</Card.Title>
          <Card.Text>
          Pão,ervilha,calabresa,bacon,milho e tiras de alcatra.
          </Card.Text>
        </Card.Body>

          <Card.Footer className={styles.card_footer}>
          <small className="text-muted">R$ 30,00</small>
          <FaShoppingCart/>
        </Card.Footer>
        
      </Card>
      <Card bg='light'>
        <Card.Img variant="top" src="image3.jpg" />
        <Card.Body>
          <Card.Title>Maverick com coca-cola</Card.Title>
          <Card.Text>
          Pão, 2ovos, salsicha, 2 hamburgueres, bacon e alface.          </Card.Text>
        </Card.Body>

          <Card.Footer className={styles.card_footer}>
          <small className="text-muted">R$ 40,00</small>
          <FaShoppingCart/>
        </Card.Footer>
      </Card>
      <Card bg='light'>
        <Card.Img variant="top" src="image5.jpg" />
        <Card.Body>
          <Card.Title>2 Voyage</Card.Title>
          <Card.Text>
          Pão de hot-dog, 2 salsichaS, milho, tomate picado,
          batata palha e maionese         </Card.Text>
        </Card.Body>

          <Card.Footer className={styles.card_footer}>
          <small className="text-muted">R$ 25,00</small>
          <FaShoppingCart/>
        </Card.Footer>
        </Card>
    </CardGroup>
    </Row>
  );
}

export default Cards;