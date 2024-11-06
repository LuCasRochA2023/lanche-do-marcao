import Banner from '../../components/Banner';
import Cards from '../../components/Cards';
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import { useLocation } from 'react-router-dom';
import Lanche from '../../components/utils';

function Home() {
  const location = useLocation();
  const nome = location.state?.nome || "Usuário";
  localStorage.getItem("user_nome",nome)
  return (
    <div >
      <Header nomeUsuario={`Bem vindo ${nome}`}/>
      <Banner/>
      <Lanche/>
      <Footer/>
    </div>
  );
}

export default Home;
