import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import PaginaBase from '../PaginaBase';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { BotaoForm } from '../../components/BotaoForm';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Login = ( ) => {
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const location = useLocation();
    const nome = location.state?.nome || "" ;
    const navigate = useNavigate();
    localStorage.setItem("user_nome",nome);
    async function logar(data) {
        data.preventDefault();
    
        // Verifique se os campos não estão vazios
        if (!user || !senha) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: 'Email e senha são obrigatórios!',
            });
            return;
        }
    
        const dadosLogin = {
            email: user, 
            senha: senha
        };
    
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosLogin),
            });
    
            if (response.ok) {
                const { token } = await response.json(); // Obtenha o token da resposta
                localStorage.setItem("TOKEN_KEY", token); // Armazene o token
                setUser('');
                setSenha('');
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: `Bem-vindo ${nome}!`,
                    confirmButtonText: 'Ir para a página inicial'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/' , {state: { nome }});
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
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro de Conexão',
                text: 'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
            });
        }
    }
    

    return (
        <PaginaBase>
            <div className={styles.conteudo}>
                <h1 className={styles.titulo}>Login</h1>
                <form onSubmit={logar} className={styles.form}>
                    <Label texto="Usuário" />
                    <Input type="text" valor={user} onChange={(e) => setUser(e.target.value)} />

                    <Label texto="Senha" />
                    <Input type="password" valor={senha} onChange={(e) => setSenha(e.target.value)} />
                    
                    <div className={styles.div_botao}>
                        <BotaoForm type="submit" texto="Entrar" />
                    </div>
                </form>
                <Link to={'/cadastro'}>
                    <span className={styles.span}>Não possui conta?</span>
                </Link>
            </div>
        </PaginaBase>
    );
};

export default Login;
