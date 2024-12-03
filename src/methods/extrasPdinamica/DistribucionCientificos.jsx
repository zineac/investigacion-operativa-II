import React, { useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

// Registro de Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Componente principal
export function DistribucionCientificos() {
  const [numCientificos, setNumCientificos] = useState(2); // Científicos disponibles
  const [numEquipos, setNumEquipos] = useState(3); // Equipos
  const [tablaDatos, setTablaDatos] = useState([
    [1.0, 0.40, 0.60, 0.80], // Equipo 1 (Probabilidad de éxito = 1 - P(fracaso))
    [1.0, 0.20, 0.40, 0.50], // Equipo 2
    [1.0, 0.15, 0.20, 0.30], // Equipo 3
  ]);
  const [resultados, setResultados] = useState(null);

  // Actualizar datos en la tabla
  const manejarCambioDatos = (equipo, cientifico, valor) => {
    const nuevaTabla = [...tablaDatos];
    nuevaTabla[equipo][cientifico] = parseFloat(valor) || 1.0;
    setTablaDatos(nuevaTabla);
  };

  // Algoritmo de programación dinámica
  const calcularOptimo = () => {
    const f = Array.from({ length: numEquipos }, () =>
      Array(numCientificos + 1).fill(1.0)
    ); // Matriz de resultados (inicializar con 1.0 para minimizar)
    const decision = Array.from({ length: numEquipos }, () =>
      Array(numCientificos + 1).fill(0)
    ); // Matriz de decisiones

    // Programación dinámica hacia atrás
    for (let etapa = numEquipos - 1; etapa >= 0; etapa--) {
      for (let s = 0; s <= numCientificos; s++) {
        let minValor = Infinity;
        let mejorDecision = 0;

        // Probar todas las asignaciones posibles
        for (let x = 0; x <= s; x++) {
          const valorActual =
            tablaDatos[etapa][x] *
            (etapa < numEquipos - 1 ? f[etapa + 1][s - x] : 1);

          if (valorActual < minValor) {
            minValor = valorActual;
            mejorDecision = x;
          }
        }

        f[etapa][s] = minValor;
        decision[etapa][s] = mejorDecision;
      }
    }

    // Reconstrucción de la solución
    const asignacion = [];
    let estado = numCientificos;
    for (let etapa = 0; etapa < numEquipos; etapa++) {
      asignacion.push(decision[etapa][estado]);
      estado -= decision[etapa][estado];
    }

    setResultados({
      asignacion,
      probabilidadFracaso: f[0][numCientificos],
      f,
      decision,
    });
  };

  // Preparar datos para gráficos
  const generarGrafico = () => {
    if (!resultados) return {};

    const datasets = resultados.f.map((fila, idx) => ({
      label: `Equipo ${idx + 1}`,
      data: fila,
      borderColor: `rgba(${50 * idx}, ${100 - 20 * idx}, 255, 1)`,
      fill: false,
    }));

    return {
      labels: Array.from({ length: numCientificos + 1 }, (_, i) => i),
      datasets,
    };
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Distribución de Científicos entre Equipos</h2>
        <Etiqueta>
          Número de Científicos:
          <Input
            type="number"
            value={numCientificos}
            onChange={(e) => setNumCientificos(parseInt(e.target.value) || 1)}
            min={1}
          />
        </Etiqueta>
        <Etiqueta>
          Número de Equipos:
          <Input
            type="number"
            value={numEquipos}
            onChange={(e) => setNumEquipos(parseInt(e.target.value) || 1)}
            min={1}
          />
        </Etiqueta>
        <Tabla>
          <thead>
            <tr>
              <th>Equipo</th>
              {[...Array(numCientificos + 1).keys()].map((cientifico) => (
                <th key={cientifico}>{cientifico}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tablaDatos.map((fila, equipo) => (
              <tr key={equipo}>
                <td>Equipo {equipo + 1}</td>
                {fila.map((valor, cientifico) => (
                  <td key={cientifico}>
                    <InputTabla
                      type="number"
                      value={valor}
                      onChange={(e) =>
                        manejarCambioDatos(equipo, cientifico, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Tabla>
        <Boton onClick={calcularOptimo}>Calcular Distribución Óptima</Boton>
      </FormularioContainer>
      <ResultadosContainer>
        {resultados ? (
          <>
            <h3>Resultados Óptimos</h3>
            <p>
              <strong>Asignación:</strong> {resultados.asignacion.join(", ")}
            </p>
            <p>
              <strong>Probabilidad de Fracaso:</strong>{" "}
              {resultados.probabilidadFracaso.toFixed(3)}
            </p>
            <h3>Gráfico</h3>
            <Line data={generarGrafico()} />
          </>
        ) : (
          <p>No hay resultados calculados</p>
        )}
      </ResultadosContainer>
    </Container>
  );
}

// Estilos
const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f8f9fa;
  font-family: Arial, sans-serif;
  gap: 20px;
`;

const FormularioContainer = styled.div`
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ResultadosContainer = styled.div`
  flex: 1;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Etiqueta = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-top: 5px;
  padding: 5px;
  width: 100%;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const InputTabla = styled.input`
  width: 100%;
  padding: 5px;
  text-align: center;
`;

const Boton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #0056b3;
  }
`;
