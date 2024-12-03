import React, { useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2"; // Usaremos gráficos dinámicos con Chart.js

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
export function DistribucionBrigadas() {
  const [numBrigadas, setNumBrigadas] = useState(5); // Número total de brigadas disponibles
  const [numPaises, setNumPaises] = useState(3); // Número de países
  const [tablaDatos, setTablaDatos] = useState([
    [0, 45, 70, 90, 105, 120], // País 1
    [0, 20, 45, 75, 110, 150], // País 2
    [0, 50, 70, 80, 100, 130], // País 3
  ]);
  const [resultados, setResultados] = useState(null);

  // Manejar cambios en los datos de entrada
  const manejarCambioDatos = (pais, brigada, valor) => {
    const nuevaTabla = [...tablaDatos];
    nuevaTabla[pais][brigada] = parseInt(valor) || 0;
    setTablaDatos(nuevaTabla);
  };

  // Algoritmo de programación dinámica para calcular la solución óptima
  const calcularOptimo = () => {
    const f = Array.from({ length: numPaises }, () =>
      Array(numBrigadas + 1).fill(0)
    ); // Matriz de resultados
    const decision = Array.from({ length: numPaises }, () =>
      Array(numBrigadas + 1).fill(0)
    ); // Matriz de decisiones

    // Programación dinámica hacia atrás
    for (let etapa = numPaises - 1; etapa >= 0; etapa--) {
      for (let s = 0; s <= numBrigadas; s++) {
        let maxValor = -Infinity;
        let mejorDecision = 0;

        // Probar todas las asignaciones posibles
        for (let x = 0; x <= s; x++) {
          const valorActual =
            tablaDatos[etapa][x] +
            (etapa < numPaises - 1 ? f[etapa + 1][s - x] : 0);

          if (valorActual > maxValor) {
            maxValor = valorActual;
            mejorDecision = x;
          }
        }

        f[etapa][s] = maxValor;
        decision[etapa][s] = mejorDecision;
      }
    }

    // Reconstrucción de la solución
    const asignacion = [];
    let estado = numBrigadas;
    for (let etapa = 0; etapa < numPaises; etapa++) {
      asignacion.push(decision[etapa][estado]);
      estado -= decision[etapa][estado];
    }

    setResultados({
      asignacion,
      valorOptimo: f[0][numBrigadas],
      f, // Matriz completa para visualización
      decision,
    });
  };

  // Generar datos para gráficos
  const generarGrafico = () => {
    if (!resultados) return {};

    const datasets = resultados.f.map((fila, idx) => ({
      label: `País ${idx + 1}`,
      data: fila,
      borderColor: `rgba(${50 * idx}, ${100 - 20 * idx}, 255, 1)`,
      fill: false,
    }));

    return {
      labels: Array.from({ length: numBrigadas + 1 }, (_, i) => i),
      datasets,
    };
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Distribución de Brigadas Médicas</h2>
        <Etiqueta>
          Número de Brigadas:
          <Input
            type="number"
            value={numBrigadas}
            onChange={(e) => setNumBrigadas(parseInt(e.target.value) || 1)}
            min={1}
          />
        </Etiqueta>
        <Etiqueta>
          Número de Países:
          <Input
            type="number"
            value={numPaises}
            onChange={(e) => setNumPaises(parseInt(e.target.value) || 1)}
            min={1}
          />
        </Etiqueta>
        <Tabla>
          <thead>
            <tr>
              <th>País</th>
              {[...Array(numBrigadas + 1).keys()].map((brigada) => (
                <th key={brigada}>Brigadas {brigada}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tablaDatos.map((fila, pais) => (
              <tr key={pais}>
                <td>País {pais + 1}</td>
                {fila.map((valor, brigada) => (
                  <td key={brigada}>
                    <InputTabla
                      type="number"
                      value={valor}
                      onChange={(e) =>
                        manejarCambioDatos(pais, brigada, e.target.value)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Tabla>
        <Boton onClick={calcularOptimo}>Calcular Asignación Óptima</Boton>
      </FormularioContainer>
      <ResultadosContainer>
        {resultados ? (
          <>
            <h3>Resultados Óptimos</h3>
            <p>
              <strong>Asignación:</strong> {resultados.asignacion.join(", ")}
            </p>
            <p>
              <strong>Valor Óptimo:</strong> {resultados.valorOptimo} miles de
              años de vida
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
