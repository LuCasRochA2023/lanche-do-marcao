import { z } from "zod";
import PaginaBase from "../PaginaBase";
import styles from "./Cadastro.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { BotaoForm } from "../../components/BotaoForm";
import ErrorMessage from "../../components/ErrorMessage";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const esquemaCadastroUsuario = z.object({
    nome: z.string().min(5, "O nome deve ter no mínimo 5 caracteres"),
    email: z.string().min(1, "O campo é obrigatório!").email("O email não é válido"),
    senha: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
    cep: z.string().length(8, "Informe um CEP válido"),
    rua: z.string().min(1, "Informe uma rua válida!"),
    numero: z.coerce.number().min(1, "Informe um número válido"), 
    bairro: z.string().min(1, "Informe um bairro válido!"),
    localidade: z.string().min(1, "Informe uma localidade válida"),
    senhaVerificada: z.string().min(1, "Este campo não pode ser vazio"),
}).refine((dados) => dados.senha === dados.senhaVerificada, {
    message: "As senhas não coincidem",
    path: ["senhaVerificada"],
});

const Cadastro = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const { register, setError, setValue, handleSubmit, watch, formState: { errors } } = useForm({
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
            setError("cep", { type: "manual", message: "Cep inválido" });
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

    const aoSubmeter = async (data) => {
        const usuarioData = {
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            ativo: true,
            endereco: {
                cep: data.cep,
                rua: data.rua,
                numero: String(data.numero), 
                bairro: data.bairro,
                complemento: data.localidade,
            }
        };
        const token = localStorage.getItem("TOKEN_KEY"); 
        try {
            const response = await fetch('http://localhost:8080/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(usuarioData),
            });
            if (response.ok) {
                setMessage('Usuário cadastrado com sucesso!');
                Swal.fire({
                    icon: 'success',  
                    title: 'Sucesso!',
                    text: 'Usuário cadastrado com sucesso!',
                    confirmButtonText: 'Ir para login'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: `Erro: ${errorData.message}`,
                });
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setMessage("Erro ao cadastrar usuário. Tente novamente mais tarde.");
            Swal.fire({
                icon: 'error',
                title: 'Erro de Conexão',
                text: 'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
            });
        }
        console.log("Formulário submetido");
        console.log("Dados submetidos:", data);
    };
    
    return (
        <PaginaBase>
            <div className={styles.conteudo}>
                <h1 className={styles.titulo}>Cadastro</h1>
                {message && <div className={styles.message}>{message}</div>} 

                <form className={styles.form} onSubmit={handleSubmit(aoSubmeter      

                )}>
                    <Container>
                        <Row>
                            <Col>
                                <Label htmlFor="campo-nome" texto="Nome" />
                                <Input placeholder="Digite seu nome completo"
                                    id="campo-nome"
                                    type="text"
                                    $error={errors.nome}
                                    {...register("nome")}
                                />
                                {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
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
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        <Row>
                            <Col>
                                <Label htmlFor="campo-senha" texto="Senha" />
                                <Input placeholder="Digite sua senha"
                                    type="password"
                                    id="campo-senha"
                                    $error={errors.senha}
                                    {...register("senha")}
                                />
                                {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
                            </Col>
                            <Col>
                                <Label htmlFor="campo-senha-confirmacao" texto="Confirme a senha" />
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
                                <Label htmlFor="campo-cep" texto="Cep" />
                                <Input
                                    id="campo-cep"
                                    placeholder="Insira seu CEP"
                                    type="text"
                                    {...register("cep", { required: "O campo é obrigatório" })}
                                    $error={errors.cep}
                                    onBlur={() => fetchEndereco(watch("cep"))}   
                                />
                                {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
                            </Col>
                            <Col>
                                <Label htmlFor="campo-rua" texto="Rua" />
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
                                <Label htmlFor="campo-numero-rua" texto="Número" />
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
                                <Label htmlFor="campo-bairro" texto="Bairro" />
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
                        <Label htmlFor="campo-localidade" texto="Complemento" />
                        <Input
                            id="campo-localidade"
                            placeholder="Cidade e Estado"
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
        </PaginaBase>
    );
}

export default Cadastro;
