import Cards from "../Cards"

const Lanche = () => {
    const lanche = [{
        "id": 1,
        "nome": "Opala 6 Cilindros",
        "preco": 24.99,
        "descricao": "pão,batata palha, calabresa,bacon,alface,ovo",
        "imagem": "/assets/image2.jpg"
      },
      {
        "id": 2,
        "nome": "Chevette turbo",
        "preco": 30.00,
        "descricao": "Pão, ervilha, calabresa, bacon, milho, tiras de alcatra",
        "imagem": "/assets/image4.jpg"
      },
      {
        "id": 3,
        "nome": "Maverick com coca-cola",
        "preco": 40.00,
        "descricao": "Pão, 2 ovos, salsicha, 2 hamburgueres, bacon, alface,",
        "imagem": "/assets/image3.jpg "
      },
      {
        "id": 4,
        "nome": "Voyage",
        "preco": 25.00,
        "descricao": "Pão de hot-dog, 2 salsicha, milho, tomate picado, batata palha e maionese",
        "imagem": "assets/image5.jpg"
      }
    ] 
    return(
        <>
            <Cards lanche={lanche}/>
        </>
    )
}
export default Lanche