import { z } from "zod";
import PaginaBase from "../PaginaBase"
import styles from "./Cadastro.module.scss"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { BotaoForm } from "../../components/BotaoForm";
import ErrorMessage from "../../components/ErrorMessage";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


const esquemaCadastroUsuario = z.object({
    nome: z.string().min(5, "O nome deve ter no mínimo 5 caracteres"),
    email: z.string().min(1, "O campo é obrigatório!")
    .email("O email não é válido"),
    senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
     cep: z.string().length(8, "Informe um CEP válido"),
    rua: z.string().min(1, "Informe uma rua válida!"),
    numero: z.coerce.number().min(1, "Informe um número válido"),
    bairro: z.string().min(1, "Informe um bairro válido!"),
    localidade: z.string().min(1, "Informe uma localidade válida"),
    senhaVerificada: z.string().min(1, "Este campo não pode ser vazio"),
  })
  .refine((dados) => dados.senha === dados.senhaVerificada, {
    message: "As senhas não coincidem",
    path: ["senhaVerificada"],
  

})

const Cadastro = () => {
    const {  register, setError, setValue, handleSubmit,watch, formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(esquemaCadastroUsuario),
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
            cep: "",
            rua: "",
            bairro: "",
            numero: "",
            localidade: "",
            senhaVerificada: ""
        }
    });

    const fetchEndereco = async (cep) => {
        setError("cep", { type: "manual", message: "" });
        if (cep.length !== 8) {
            setError("cep", {
                type: "manual",
                message: "Cep inválido",
            });
            return;
        }
        try {
            const response = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (response.ok) {
                setValue("rua", data.logradouro);
                setValue("localidade", `${data.localidade}, ${data.uf}`);
                setValue("bairro", data.bairro);
            } else {
                setError("cep", { type: "manual", message: "Cep não encontrado" });
            }
        } catch (error) {
            console.error(error);
        }
    };
    const cepValue = watch("cep")
    const aoSubmeter = (dados) => {
        console.log("Formulário submetido");
        console.log("Dados submetidos:", dados);
        if (Object.keys(errors).length > 0) {
            console.log("Erros encontrados:", errors);
        } else {
            console.log("Submissão bem-sucedida");
        }
    }


    return (
        
        <PaginaBase>
          
            <div className={styles.conteudo}>
            <h1  className={styles.titulo}>
                    Cadastro
                </h1>
                <form className={styles.form} onSubmit={handleSubmit(aoSubmeter)}>
                    <Container>

                    
                    <Row >

                        <Col>
                        
                        
                        <Label htmlFor="campo-nome" texto="Nome" />
                        <Input placeholder="Digete seu nome completo"
                            id="campo-nome"
                            type="text"
                            $error={errors.nome}
                            {...register("nome")}
                        />
                        {errors.nome && <ErrorMessage >{errors.nome.message}</ErrorMessage>}
                        
                        </Col>
                        <Col>
                        <Label htmlFor="campo-email" texto="Email" />
                        <Input placeholder="Digite seu Email"
                            type="email"
                            id="campo-email"
                            $error={errors.email}
                            {...register("email")}
                        />
                        </Col>
                        </Row>
                        {errors.email && <ErrorMessage >{errors.email.message}</ErrorMessage>}
                        <Row>
                        <Col>
                        <Label htmlFor="campo-senha" texto="Senha" />
                        <Input placeholder="Digite sua senha"
                            type="password"
                            id="campo-senha"
                            $error={errors.senha}
                            {...register("senha")}
                        />

                        {errors.senha && <ErrorMessage >{errors.senha.message}</ErrorMessage>}
                        </Col> 
                        <Col>
                        <Label htmlFor="campo-senha-confirmacao" texto="Confirme a senha"/>
                        <Input
                            id="campo-senha-confirmacao"
                            placeholder="Repita a senha anterior"
                            type="password"
                            $error={!!errors.senhaVerificada}
                            {...register("senhaVerificada")}
                        />
                        {errors.senhaVerificada && (
                            <ErrorMessage>{errors.senhaVerificada.message}</ErrorMessage>
                        )}
                        </Col>
                        </Row>
                        <Row>
                        <Col>
                        <Label htmlFor="campo-cep" texto="Cep"/>
                        <Input
                            id="campo-cep"
                            placeholder="Insira seu CEP"
                            type="text"
                            {...register("cep", { required: "O campo é obrigatório" })}
                            $error={errors.cep}
                            onBlur={() => {
                            
                                fetchEndereco(cepValue);
                                }}
                        />
                        {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
                    
                        </Col>
                        <Col>  
                        <Label htmlFor="campo-rua" texto="Rua"/>
                        <Input
                            id="campo-rua"
                            placeholder="Rua Agarikov"
                            type="text"
                            $error={!!errors.rua}
                            {...register("rua", { required: "O campo é obrigatório" })}
                        />
                        {errors.rua && <ErrorMessage>{errors.rua.message}</ErrorMessage>}
                    

                        </Col>     
                        </Row>
                        <Row>
                            <Col>
                            <Label htmlFor="campo-numero-rua" texto="Número"/>
                            <Input
                                id="campo-numero-rua"
                                placeholder="Ex: 1440"
                                type="text"
                                $error={!!errors.numero}
                                {...register("numero", { required: "O campo é obrigatório" })}
                            />
                            {errors.numero && (
                                <ErrorMessage>{errors.numero.message}</ErrorMessage>
                            )}
                            </Col>
                            <Col>
                            <Label htmlFor="campo-bairro" texto="Bairro"/>
                            <Input
                                id="campo-bairro"
                                placeholder="Vila Mariana"
                                type="text"
                                $error={!!errors.bairro}
                                {...register("bairro", { required: "O campo é obrigatório" })}
                            />
                            {errors.bairro && (
                                <ErrorMessage>{errors.bairro.message}</ErrorMessage>
                            )}
                            </Col>
                        </Row>
                    
                        <Label htmlFor="campo-localidade" texto="Complemento"/>
                        <Input
                            id="campo-localidade"
                            placeholder="São Paulo, SP"
                            type="text"
                            $error={!!errors.localidade}
                            {...register("localidade", { required: "O campo é obrigatório" })}
                        />
                        {errors.localidade && (
                            <ErrorMessage>{errors.localidade.message}</ErrorMessage>
                        )}
                    <div className={styles.div_botao}>
                        <BotaoForm type="submit" texto="Cadastrar" />
                    </div>    
                </Container>
            </form>
           
        </div>
       </PaginaBase >
        )
}

export default Cadastro;