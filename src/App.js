import "./index.scss";
import Banner from './components/Banner';
import Cards from './components/Cards';
import Header from './components/Header';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header/>
      <Banner/>
      <Cards/>
      <Footer/>
    </div>
  );
}

export default App;
