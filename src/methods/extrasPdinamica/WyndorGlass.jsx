import React, { useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function WyndorGlass() {
  const [resultados, setResultados] = useState(null);

  // Restricciones del problema
  const recursosIniciales = [4, 12, 18]; // R1, R2, R3
  const coeficientesObjetivo = [3, 5]; // Coeficientes de la función objetivo: Z = 3x1 + 5x2

  const calcularSolucionOptima = () => {
    // Etapa 2: Calcular para la última etapa
    const etapa2 = {
      x2Optimo: Math.min(
        Math.floor(recursosIniciales[1] / 2),
        Math.floor(recursosIniciales[2] / 3)
      ),
    };
    etapa2.z2 = 5 * etapa2.x2Optimo;

    // Etapa 1: Calcular para la primera etapa
    const etapa1 = {
      x1Optimo: 0,
      z1: 0,
    };

    let maxZ = 0;
    for (let x1 = 0; x1 <= recursosIniciales[0]; x1++) {
      const r1Restante = recursosIniciales[0] - x1;
      const r2Restante = recursosIniciales[1] - 2 * etapa2.x2Optimo;
      const r3Restante = recursosIniciales[2] - 3 * etapa2.x2Optimo;

      if (r1Restante >= 0 && r2Restante >= 0 && r3Restante >= 0) {
        const z = 3 * x1 + etapa2.z2;
        if (z > maxZ) {
          maxZ = z;
          etapa1.x1Optimo = x1;
          etapa1.z1 = z;
        }
      }
    }

    // Guardar resultados
    setResultados({
      etapa1,
      etapa2,
      valorOptimo: etapa1.z1,
    });
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Problema de la Wyndor Glass Company</h2>
        <Tabla>
          <thead>
            <tr>
              <th>Restricción</th>
              <th>Máximo disponible</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>R1: 3x1 ≤ 4</td>
              <td>4</td>
            </tr>
            <tr>
              <td>R2: 2x2 ≤ 12</td>
              <td>12</td>
            </tr>
            <tr>
              <td>R3: 3x2 ≤ 18</td>
              <td>18</td>
            </tr>
          </tbody>
        </Tabla>
        <Boton onClick={calcularSolucionOptima}>
          Calcular Solución Óptima
        </Boton>
      </FormularioContainer>

      <ResultadosContainer>
        {resultados ? (
          <>
            <h2>Resultados Óptimos</h2>
            <p>
              Asignación Óptima: X1 = {resultados.etapa1.x1Optimo}, X2 ={" "}
              {resultados.etapa2.x2Optimo}
            </p>
            <p>Valor Óptimo (Z): {resultados.valorOptimo}</p>

            <h3>Gráfico de Contribuciones</h3>
            <Line
              data={{
                labels: ["X2=0", "X2=6"],
                datasets: [
                  {
                    label: "Contribución Etapa 1",
                    data: [0, resultados.etapa1.z1],
                    borderColor: "blue",
                    borderWidth: 2,
                  },
                  {
                    label: "Contribución Etapa 2",
                    data: [0, resultados.etapa2.z2],
                    borderColor: "green",
                    borderWidth: 2,
                  },
                ],
              }}
            />

            <h3>Tabla de Resultados</h3>
            <Tabla>
              <thead>
                <tr>
                  <th>Etapa</th>
                  <th>Variable Óptima</th>
                  <th>Contribución</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Etapa 1</td>
                  <td>X1 = {resultados.etapa1.x1Optimo}</td>
                  <td>Z1 = {resultados.etapa1.z1}</td>
                </tr>
                <tr>
                  <td>Etapa 2</td>
                  <td>X2 = {resultados.etapa2.x2Optimo}</td>
                  <td>Z2 = {resultados.etapa2.z2}</td>
                </tr>
              </tbody>
            </Tabla>
          </>
        ) : (
          <p>Presiona el botón para calcular la solución.</p>
        )}
      </ResultadosContainer>
    </Container>
  );
}

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const FormularioContainer = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ResultadosContainer = styled.div`
  flex: 2;
  background-color: #343a40;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #007bff;
    color: white;
  }
`;

const Boton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
