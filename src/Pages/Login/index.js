import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import PaginaBase from '../PaginaBase';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { BotaoForm } from '../../components/BotaoForm';
const Login = () => {
    return (
        <PaginaBase>
            <div className={styles.conteudo}>
                <h1 className={styles.titulo}>
                    Login
                </h1>
                <form className={styles.form}>
                    <Label texto="Usuario"/>
                        <Input />
                
                    <Label texto="Senha"/>
                        <Input />
                <div className={styles.div_botao}>

               
                    <Link to={'/'}>
                        <BotaoForm texto="Entrar"/>
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