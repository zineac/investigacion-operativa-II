import React, { useState } from "react";
import styled from "styled-components";
import Cargando from "../../components/Cargando"; // Suponiendo que tienes un componente Cargando para manejar el estado

export function HolgurasRechazos() {
  const [numEtapas, setNumEtapas] = useState(3); // Número de etapas
  const [numRecursos, setNumRecursos] = useState(3); // Número de recursos
  const [costos, setCostos] = useState([100, 200, 300]); // Costos de los rechazos
  const [restricciones, setRestricciones] = useState([5, 10, 15]); // Restricciones de los recursos
  const [mejorValor, setMejorValor] = useState(null); // Mejor valor calculado
  const [itemsSeleccionados, setItemsSeleccionados] = useState([]); // Items seleccionados en la optimización

  // Función para manejar el cambio de número de etapas
  const manejarCambioNumEtapas = (e) => {
    const valor = parseInt(e.target.value);
    setNumEtapas(valor);
    setCostos(Array(valor).fill(0)); // Reiniciamos los costos para que coincidan con el número de etapas
    setRestricciones(Array(valor).fill(0)); // Reiniciamos las restricciones también
  };

  // Función para manejar el cambio de número de recursos
  const manejarCambioNumRecursos = (e) => {
    const valor = parseInt(e.target.value);
    setNumRecursos(valor);
  };

  // Función para manejar el cambio de los costos
  const manejarCambioCosto = (index, valor) => {
    const nuevosCostos = [...costos];
    nuevosCostos[index] = parseInt(valor);
    setCostos(nuevosCostos);
  };

  // Función para manejar el cambio de las restricciones
  const manejarCambioRestriccion = (index, valor) => {
    const nuevasRestricciones = [...restricciones];
    nuevasRestricciones[index] = parseInt(valor);
    setRestricciones(nuevasRestricciones);
  };

  // Algoritmo de optimización de Holguras por Rechazos (Programación Dinámica)
  const calcularHolguras = () => {
    const n = numEtapas; // Número de etapas
    const W = numRecursos; // Número de recursos
    const dp = Array(n + 1).fill().map(() => Array(W + 1).fill(0)); // Inicializamos la tabla DP

    // Llenamos la tabla dp (decisión secuencial)
    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= W; w++) {
        if (restricciones[i - 1] <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - restricciones[i - 1]] + costos[i - 1]);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // El valor óptimo es el último valor de la tabla
    const valorOptimo = dp[n][W];
    setMejorValor(valorOptimo);

    // Para saber qué items (etapas) se seleccionan
    let w = W;
    let seleccionados = [];
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        seleccionados.push(i - 1); // Guardamos el índice del item seleccionado
        w -= restricciones[i - 1]; // Reducimos la capacidad de los recursos
      }
    }

    setItemsSeleccionados(seleccionados.reverse()); // Ordenamos los índices seleccionados
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada: Holguras por Rechazos</h2>
        <Etiqueta>
          Número de Etapas
          <Input
            type="number"
            value={numEtapas}
            onChange={manejarCambioNumEtapas}
            min={1}
          />
        </Etiqueta>

        <Etiqueta>
          Número de Recursos
          <Input
            type="number"
            value={numRecursos}
            onChange={manejarCambioNumRecursos}
            min={1}
          />
        </Etiqueta>

        <Tabla>
          <thead>
            <tr>
              <th>Etapa</th>
              <th>Costo</th>
              <th>Restricción</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numEtapas }).map((_, index) => (
              <tr key={index}>
                <td>Etapa {index + 1}</td>
                <td>
                  <InputTabla
                    type="number"
                    value={costos[index]}
                    onChange={(e) => manejarCambioCosto(index, e.target.value)}
                  />
                </td>
                <td>
                  <InputTabla
                    type="number"
                    value={restricciones[index]}
                    onChange={(e) => manejarCambioRestriccion(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>

        <Boton onClick={calcularHolguras}>Calcular</Boton>
      </FormularioContainer>

      <ResultadosContainer>
        {mejorValor !== null ? (
          <>
            <Resultados>
              <h3>Resultados</h3>
              <p>El valor óptimo obtenido es <strong>{mejorValor}</strong>.</p>
              <p>Etapas seleccionadas:</p>
              {itemsSeleccionados.length > 0 ? (
                <ul>
                  {itemsSeleccionados.map((etapa, index) => (
                    <li key={index}>Etapa {etapa + 1} (Costo: {costos[etapa]}, Restricción: {restricciones[etapa]})</li>
                  ))}
                </ul>
              ) : (
                <p>No se seleccionaron etapas.</p>
              )}
            </Resultados>
          </>
        ) : <Cargando />}
      </ResultadosContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin: 0 0 22px 0;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
`;

const FormularioContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ResultadosContainer = styled.div`
  flex: 0.3;
  padding: 20px;
  gap: 20px;
  background-color: #343a40;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const InputTabla = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  max-width: 400px;
`;

const Boton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 22px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Etiqueta = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #343a40;
`;

const Resultados = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  text-align: center;
  color: #343a40;
`;
