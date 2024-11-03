import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import PaginaBase from '../PaginaBase';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { BotaoForm } from '../../components/BotaoForm';
import { useState } from 'react';
const Login = () => {
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    function logar(user, senha) {
      
    }
    return (
        <PaginaBase>
            <div className={styles.conteudo}>
                <h1 className={styles.titulo}>
                    Login
                </h1>
                <form className={styles.form}>
                    <Label texto="Usuario"/>
                        <Input type="text" valor={(user)} onChange={(e) => setUser(e.target.value)}/>

                    <Label texto="Senha"/>
                        <Input type="password"
                        valor={(senha)} onChange={(e) => setSenha(e.target.value)}/>
                <div className={styles.div_botao}>

               
                    <Link to={'/'}>
                        <BotaoForm onCLick={logar()} texto="Entrar"/>
                    </Link>
                </div>
                </form>   
                <Link to={'/cadastro'}>
                    <span className={styles.span} >
                        Não possui conta?
                    </span>
                </Link>
            </div>
        </PaginaBase>
    )
}
export default Login;