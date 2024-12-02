import React, { useState } from "react";
import styled from "styled-components";

// Funciones para calcular rutas
function calcularRutaMasCorta(numNodos, grafo, metodo) {
  try {
    switch (metodo) {
      case "Dijkstra":
        return calcularConDijkstra(numNodos, grafo);
      case "Floyd-Warshall":
        return calcularConFloydWarshall(numNodos, grafo);
      case "Bellman-Ford":
        return calcularConBellmanFord(numNodos, grafo);
      default:
        throw new Error("Método desconocido");
    }
  } catch (error) {
    console.error("Error al calcular la ruta más corta:", error);
    return { distancias: [], rutas: [] };
  }
}

// Funciones para cada método (aquí solo dejo Floyd-Warshall como ejemplo)
function calcularConFloydWarshall(numNodos, grafo) {
  const distancias = Array.from({ length: numNodos }, () =>
    Array(numNodos).fill(Infinity)
  );
  const rutas = Array.from({ length: numNodos }, () =>
    Array(numNodos).fill(null)
  );

  for (let i = 0; i < numNodos; i++) {
    distancias[i][i] = 0;
  }

  for (let i = 0; i < numNodos; i++) {
    for (let j = 0; j < numNodos; j++) {
      if (grafo[i][j] !== 0) {
        distancias[i][j] = grafo[i][j];
        rutas[i][j] = i;
      }
    }
  }

  for (let k = 0; k < numNodos; k++) {
    for (let i = 0; i < numNodos; i++) {
      for (let j = 0; j < numNodos; j++) {
        if (distancias[i][j] > distancias[i][k] + distancias[k][j]) {
          distancias[i][j] = distancias[i][k] + distancias[k][j];
          rutas[i][j] = rutas[k][j];
        }
      }
    }
  }

  return { distancias, rutas };
}

export function Pdinamica() {
  const [numNodos, setNumNodos] = useState(4);
  const [grafo, setGrafo] = useState([
    [0, 3, Infinity, Infinity],
    [3, 0, 1, 6],
    [Infinity, 1, 0, 2],
    [Infinity, 6, 2, 0],
  ]);
  const [metodo, setMetodo] = useState("Floyd-Warshall");
  const [distancias, setDistancias] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [error, setError] = useState("");

  const manejarCambioNumNodos = (e) => {
    const nuevosNumNodos = parseInt(e.target.value);
    setNumNodos(nuevosNumNodos);
    setGrafo(
      Array.from({ length: nuevosNumNodos }, (_, i) =>
        Array.from({ length: nuevosNumNodos }, (_, j) => (i === j ? 0 : Infinity))
      )
    );
  };

  const manejarCambioGrafo = (i, j, valor) => {
    const nuevoGrafo = [...grafo];
    nuevoGrafo[i][j] = parseInt(valor);
    setGrafo(nuevoGrafo);
  };

  const manejarCambioMetodo = (e) => {
    setMetodo(e.target.value);
  };

  const resolverRutaMasCorta = () => {
    try {
      const { distancias, rutas } = calcularRutaMasCorta(numNodos, grafo, metodo);
      setDistancias(distancias);
      setRutas(rutas);
      setError("");
    } catch (error) {
      setError("Hubo un error al calcular la ruta más corta.");
      console.error(error);
    }
  };

  const reconstruirRuta = (origen, destino) => {
    let ruta = [];
    let actual = origen;
    while (actual !== destino) {
      ruta.push(actual);
      actual = rutas[actual][destino];
    }
    ruta.push(destino);
    return ruta;
  };

  return (
    <Contenedor>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Número de Nodos
          <Input
            type="number"
            value={numNodos}
            onChange={manejarCambioNumNodos}
            min={1}
            required
          />
        </Etiqueta>

        <Etiqueta>
          Método de Resolución
          <Select value={metodo} onChange={manejarCambioMetodo}>
            <option value="Dijkstra">Dijkstra</option>
            <option value="Floyd-Warshall">Floyd-Warshall</option>
            <option value="Bellman-Ford">Bellman-Ford</option>
          </Select>
        </Etiqueta>

        <form onSubmit={(e) => e.preventDefault()}>
          <Tabla>
            <thead>
              <tr>
                <th></th>
                {Array.from({ length: numNodos }, (_, i) => (
                  <th key={i}>{String.fromCharCode(65 + i)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grafo.map((fila, i) => (
                <tr key={i}>
                  <td>{String.fromCharCode(65 + i)}</td>
                  {fila.map((valor, j) => (
                    <td key={j}>
                      <InputTabla
                        type="number"
                        value={valor === Infinity ? "" : valor}
                        onChange={(e) =>
                          manejarCambioGrafo(i, j, e.target.value)
                        }
                        placeholder={valor === Infinity ? "∞" : ""}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Tabla>
          <Boton type="button" onClick={resolverRutaMasCorta}>
            Calcular Ruta Más Corta
          </Boton>
        </form>
      </FormularioContainer>

      <ResultadosContainer>
        {error && (
          <ResultadoWrapper style={{ color: "red" }}>
            <h3>Error</h3>
            <p>{error}</p>
          </ResultadoWrapper>
        )}

        {distancias.length > 0 && !error && (
          <Resultados>
            <h3>Resultados</h3>
            <h4>Distancias Más Cortas</h4>
            <TablaResultados>
              <thead>
                <tr>
                  <th></th>
                  {Array.from({ length: numNodos }, (_, i) => (
                    <th key={i}>{String.fromCharCode(65 + i)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {distancias.map((fila, i) => (
                  <tr key={i}>
                    <td>{String.fromCharCode(65 + i)}</td>
                    {fila.map((dist, j) => (
                      <td key={j}>{dist === Infinity ? "∞" : dist}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </TablaResultados>
            <h4>Rutas</h4>
            <TablaResultados>
              <thead>
                <tr>
                  <th>De</th>
                  <th>A</th>
                  <th>Ruta</th>
                </tr>
              </thead>
              <tbody>
                {distancias.map((fila, i) => (
                  <tr key={i}>
                    {fila.map((_, j) => (
                      <td key={j}>
                        {i === j
                          ? "-"
                          : `${String.fromCharCode(65 + i)} → ${String.fromCharCode(
                              65 + j
                            )}`}
                      </td>
                    ))}
                    <td>{reconstruirRuta(i, j).map((nodo) => String.fromCharCode(65 + nodo)).join(" → ")}</td>
                  </tr>
                ))}
              </tbody>
            </TablaResultados>
          </Resultados>
        )}
      </ResultadosContainer>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  display: flex;
  padding: 30px;
  font-family: "Roboto", sans-serif;
  color: #495057;
`;

const FormularioContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.15);
`;

const ResultadosContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #343a40;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;