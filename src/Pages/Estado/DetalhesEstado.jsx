import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./DetalhesEstado.module.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DetalhesEstado = () => {
  const { uf } = useParams();
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setDados(null);
    setErro(null);
    fetch(`http://localhost:5000/api/estado/${uf}`)
      .then((res) => {
        if (!res.ok) throw new Error("Estado não encontrado");
        return res.json();
      })
      .then((data) => setDados(data))
      .catch((err) => setErro(err.message));
  }, [uf]);

  if (erro) return <p>Erro: {erro}</p>;
  if (!dados) return <p>Carregando dados do estado {uf}...</p>;

  // Dados para o gráfico de pizza
  const restantePopulacao =
    dados.populacao - dados.populacao_indigena - dados.populacao_quilombola;

  const dataGrafico = [
    { name: "População Indígena", value: dados.populacao_indigena },
    { name: "População Quilombola", value: dados.populacao_quilombola },
    { name: "Restante da População", value: restantePopulacao },
  ];

  return (
    <div className={styles.containerDetails}>
      <NavLink to="/">
        <span className={styles.buttonBack}>Voltar</span>
      </NavLink>
      <h1 className={styles.tituloDetails}>Estado: {dados.uf}</h1>
      <p className={styles.texto}>
        Domicílios: {dados.domicilios.toLocaleString()}
      </p>
      <p className={styles.texto}>
        População: {dados.populacao.toLocaleString()}
      </p>
      <p className={styles.texto}>Área: {dados.area.toLocaleString()} km²</p>
      <p className={styles.texto}>
        Taxa de alfabetização: {dados.taxa_alfabetizacao}%
      </p>
      <p className={styles.texto}>Idade mediana: {dados.idade_mediana} anos</p>
      <p className={styles.texto}>Razão de sexo: {dados.razao_sexo}</p>
      <p className={styles.texto}>
        Índice de envelhecimento: {dados.indice_envelhecimento}
      </p>
      <p className={styles.texto}>
        População indígena: {dados.populacao_indigena.toLocaleString()}
      </p>
      <p className={styles.texto}>
        População indígena em terra indígena:{" "}
        {dados.populacao_indigena_terra_indigena.toLocaleString()}
      </p>
      <p className={styles.texto}>
        População quilombola: {dados.populacao_quilombola.toLocaleString()}
      </p>
      <p className={styles.texto}>
        População quilombola em território quilombola:{" "}
        {dados.populacao_quilombola_territorio_quilombola.toLocaleString()}
      </p>

      <h2 className={styles.subtituloDetails}>Distribuição da População</h2>
      <div className={styles.grafico}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataGrafico}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              fill="#8884d8"
              labelLine={false}
              minAngle={5} // pra forçar mostrar as pequenas, se quiser
            >
              {dataGrafico.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DetalhesEstado;
