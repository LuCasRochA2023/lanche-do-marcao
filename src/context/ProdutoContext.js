import { createContext, useState } from "react"

export const CarrinhoContext = createContext();
export const ProdutoCarrinhoContext = ({children}) => {
    const [carrinhoItens, setCarrinhoItens] = useState([]);
        const adicionar = (novoItem) => {
        setCarrinhoItens((prevItens) => {
            const itemExistente = prevItens.find(item => item.id === novoItem.id);

            if(itemExistente) {
                return prevItens.map(item => 
                    item.id === novoItem.id ? { ...item, quantidade: item.quantidade + 1} : item
                );
            }else{
                    return[...prevItens, {...novoItem, quantidade: 1} ];

                }
        });
        
    };
    const aumentarQuantidadeDoProduto = (id) => {
        setCarrinhoItens((prevItens) =>
            prevItens.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantidade: item.quantidade + 1,
                      }
                    : item
                      
            )
        );
    };
    const diminuirQuantidadeDoProduto = (id) => {
        setCarrinhoItens((prevItens => 
             prevItens.map(item => {
                if(item.id === id) {
                    if(item.quantidade > 1){
                        return { ... item,
                            quantidade: item.quantidade - 1,
                        } }else{
                            return null;
                        } 
                    }
                 return item;
            }
        ).filter(item => item!== null)
            )
        )
    }
    return (
        <CarrinhoContext.Provider value={{ carrinhoItens, adicionar, aumentarQuantidadeDoProduto, diminuirQuantidadeDoProduto}}>
            {children}
        </CarrinhoContext.Provider>
    )
}
