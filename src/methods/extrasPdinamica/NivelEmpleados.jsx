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
export function NivelEmpleados() {
  const [temporadas, setTemporadas] = useState([
    { nombre: "Verano", requerimiento: 220 },
    { nombre: "Otoño", requerimiento: 240 },
    { nombre: "Invierno", requerimiento: 200 },
    { nombre: "Primavera", requerimiento: 255 },
  ]);
  const [maxEmpleados, setMaxEmpleados] = useState(255); // Máximo nivel permitido
  const [resultados, setResultados] = useState(null);

  // Función para calcular el costo
  const calcularCosto = (xn, sn, rn) => {
    // Costo cuadrático por cambio de nivel
    const costoCambio = 200 * Math.pow(xn - sn, 2);
  
    // Costo por exceder el nivel mínimo requerido
    const costoExcedente = 2000 * Math.max(0, xn - rn);
  
    return costoCambio + costoExcedente;
  };
  

  // Algoritmo de programación dinámica
  const calcularOptimo = () => {
    const etapas = temporadas.length;
    const f = Array.from({ length: etapas }, () => ({})); // Matriz de costos
    const decision = Array.from({ length: etapas }, () => ({})); // Decisiones

    // Etapa final (Primavera)
    for (let s = temporadas[etapas - 1].requerimiento; s <= maxEmpleados; s++) {
      f[etapas - 1][s] = calcularCosto(s, s, temporadas[etapas - 1].requerimiento);
      decision[etapas - 1][s] = s;
    }

    // Etapas intermedias
    for (let etapa = etapas - 2; etapa >= 0; etapa--) {
      for (let s = temporadas[etapa].requerimiento; s <= maxEmpleados; s++) {
        let minCosto = Infinity;
        let mejorDecision = null;

        for (let x = temporadas[etapa].requerimiento; x <= maxEmpleados; x++) {
          const costo =
            calcularCosto(x, s, temporadas[etapa].requerimiento) +
            (f[etapa + 1][x] || 0);

          if (costo < minCosto) {
            minCosto = costo;
            mejorDecision = x;
          }
        }

        f[etapa][s] = minCosto;
        decision[etapa][s] = mejorDecision;
      }
    }

    // Reconstrucción de la solución
    const asignacion = [];
    let estado = maxEmpleados; // Comenzamos con el nivel máximo en Primavera

    for (let etapa = 0; etapa < etapas; etapa++) {
      asignacion.push({
        temporada: temporadas[etapa].nombre,
        empleados: decision[etapa][estado],
      });
      estado = decision[etapa][estado];
    }

    setResultados({
      asignacion,
      costoTotal: f[0][maxEmpleados],
      f,
      decision,
    });
  };

  // Datos para gráficos
  const generarGrafico = () => {
    if (!resultados) return {};

    const datasets = temporadas.map((temp, idx) => {
      const data = Object.values(resultados.f[idx]);
      return {
        label: temp.nombre,
        data,
        borderColor: `rgba(${50 * idx}, ${100 - 20 * idx}, 255, 1)`,
        fill: false,
      };
    });

    return {
      labels: Array.from({ length: maxEmpleados + 1 }, (_, i) => i),
      datasets,
    };
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Programación del Nivel de Empleados</h2>
        <Tabla>
          <thead>
            <tr>
              <th>Temporada</th>
              <th>Requerimiento</th>
            </tr>
          </thead>
          <tbody>
            {temporadas.map((temp, idx) => (
              <tr key={idx}>
                <td>{temp.nombre}</td>
                <td>
                  <InputTabla
                    type="number"
                    value={temp.requerimiento}
                    onChange={(e) => {
                      const nuevoValor = parseInt(e.target.value) || 0;
                      const nuevasTemporadas = [...temporadas];
                      nuevasTemporadas[idx].requerimiento = nuevoValor;
                      setTemporadas(nuevasTemporadas);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>
        <Etiqueta>
          Nivel Máximo de Empleados:
          <Input
            type="number"
            value={maxEmpleados}
            onChange={(e) => setMaxEmpleados(parseInt(e.target.value) || 255)}
          />
        </Etiqueta>
        <Boton onClick={calcularOptimo}>Calcular Nivel Óptimo</Boton>
      </FormularioContainer>
      <ResultadosContainer>
        {resultados ? (
          <>
            <h3>Resultados Óptimos</h3>
            <p>
              <strong>Costo Total:</strong> ${resultados.costoTotal.toFixed(2)}
            </p>
            <ul>
              {resultados.asignacion.map((asig, idx) => (
                <li key={idx}>
                  {asig.temporada}: {asig.empleados} empleados
                </li>
              ))}
            </ul>
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

const Input = styled.input`
  margin-top: 5px;
  padding: 5px;
  width: 100%;
`;

const Etiqueta = styled.label`
  display: block;
  margin-bottom: 10px;
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
