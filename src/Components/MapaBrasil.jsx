import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { useNavigate } from "react-router-dom";

const geoUrl =
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

const MapaBrasil = () => {
  const [populationData, setPopulationData] = useState([]);
  const [activeUF, setActiveUF] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pjpythonfacu.discloud.app/api/population_by_uf")
      .then((res) => res.json())
      .then((data) => setPopulationData(data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  const getPopulation = (uf) => {
    const estado = populationData.find((item) => item.sigla_uf === uf);
    return estado ? estado.populacao : null;
  };

  return (
    <div style={{ maxWidth: 550, margin: "2.5rem auto" }}>
      <ComposableMap
        projection="geoMercator"
        width={1200}
        height={900}
        style={{ width: "100%", height: "auto" }}
        projectionConfig={{
          scale: 1300,
          center: [-52, -15],
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const uf = geo.properties.sigla;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setActiveUF(uf)}
                    onMouseLeave={() => setActiveUF(null)}
                    onClick={() => navigate(`/estado/${uf}`)}
                    style={{
                      default: { fill: "#D6D6DA", outline: "none" },
                      hover: { fill: "red", outline: "none", cursor: "pointer" },
                      pressed: { fill: "red", outline: "none" },
                    }}
                  />
                );
              })}

              {geographies.map((geo) => {
                const uf = geo.properties.sigla;
                const pop = getPopulation(uf);
                const centroid = geoCentroid(geo);
                const isActive = activeUF === uf;

                if (!isActive || !pop) return null;

                return (
                  <Marker
                    key={`marker-${geo.rsmKey}`}
                    coordinates={centroid}
                  >
                    <text
                      textAnchor="middle"
                      style={{
                        fontFamily: "Arial",
                        fontSize: 40,
                        fill: "#000",
                        fontWeight: "bold",
                        pointerEvents: "none",
                        userSelect: "none",
                        textShadow: "0 0 3px #fff",
                      }}
                    >
                      <tspan x="0" dy="0">
                        {uf}
                      </tspan>
                      <tspan x="0" dy="1.2em">
                        {pop.toLocaleString()} hab
                      </tspan>
                    </text>
                  </Marker>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapaBrasil;
