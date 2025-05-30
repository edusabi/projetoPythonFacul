import MapaBrasil from '../../Components/MapaBrasil';
import style from "./Home.module.css";

const Home = () => {
  
  return (
    <div className={style.containerHome}>
      <h2>Olá, aqui você pode ver o censo de 2022 e a população de cada estado!</h2>
      <p style={{margin:"1rem 0"}}>Para ver mais detalhes sobre o estado, basta apenas clicar!</p>
      <MapaBrasil />
    </div>


  );
};

export default Home;