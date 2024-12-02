import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../../components/Cargando';

export function ModeloMochila() {
  const [numItems, setNumItems] = useState(3); // Número de items
  const [capacidad, setCapacidad] = useState(10); // Capacidad de la mochila
  const [valores, setValores] = useState([60, 100, 120]); // Valores de los items
  const [pesos, setPesos] = useState([10, 20, 30]); // Pesos de los items
  const [mejorValor, setMejorValor] = useState(null); // Mejor valor obtenido
  const [itemsSeleccionados, setItemsSeleccionados] = useState([]); // Items seleccionados para la mochila
  const [resaltados, setResaltados] = useState(false); // Para resaltar las celdas

  // Función para manejar el cambio de número de items
  const manejarCambioNumItems = (e) => {
    const valor = parseInt(e.target.value);
    setNumItems(valor);
    setValores(Array(valor).fill(0));
    setPesos(Array(valor).fill(0));
  };

  // Función para manejar la capacidad de la mochila
  const manejarCambioCapacidad = (e) => {
    setCapacidad(parseInt(e.target.value));
  };

  // Función para manejar el cambio de los valores de los items
  const manejarCambioValor = (index, valor) => {
    const nuevosValores = [...valores];
    nuevosValores[index] = parseInt(valor);
    setValores(nuevosValores);
  };

  // Función para manejar el cambio de los pesos de los items
  const manejarCambioPeso = (index, valor) => {
    const nuevosPesos = [...pesos];
    nuevosPesos[index] = parseInt(valor);
    setPesos(nuevosPesos);
  };

  // Algoritmo de la Mochila (Knapsack Problem)
  const calcularMochila = () => {
    const n = numItems;
    const W = capacidad;
    const dp = Array(n + 1).fill().map(() => Array(W + 1).fill(0));

    // Llenamos la tabla dp
    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= W; w++) {
        if (pesos[i - 1] <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - pesos[i - 1]] + valores[i - 1]);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // El valor óptimo es el último valor de la tabla
    const valorOptimo = dp[n][W];
    setMejorValor(valorOptimo);

    // Para saber qué items se seleccionan
    let w = W;
    let seleccionados = [];
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        seleccionados.push(i - 1); // Guardamos el índice del item seleccionado
        w -= pesos[i - 1]; // Reducimos la capacidad
      }
    }

    setItemsSeleccionados(seleccionados.reverse());
    setResaltados(true);
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Número de Items
          <Input type="number" value={numItems} onChange={manejarCambioNumItems} min={1} />
        </Etiqueta>

        <Etiqueta>
          Capacidad de la Mochila
          <Input type="number" value={capacidad} onChange={manejarCambioCapacidad} min={1} />
        </Etiqueta>

        <Tabla>
          <thead>
            <tr>
              <th>Item</th>
              <th>Peso</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numItems }).map((_, index) => (
              <tr key={index}>
                <td>Item {index + 1}</td>
                <td>
                  <InputTabla
                    type="number"
                    value={pesos[index]}
                    onChange={(e) => manejarCambioPeso(index, e.target.value)}
                  />
                </td>
                <td>
                  <InputTabla
                    type="number"
                    value={valores[index]}
                    onChange={(e) => manejarCambioValor(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>

        <Boton onClick={calcularMochila}>Calcular</Boton>
      </FormularioContainer>

      <ResultadosContainer>
        {mejorValor !== null ? (
          <>
            <Resultados>
              <h3>Resultados</h3>
              <p>El valor máximo que se puede obtener es <strong>{mejorValor}</strong>.</p>
              <p>Items seleccionados:</p>
              {itemsSeleccionados.length > 0 ? (
                <ul>
                  {itemsSeleccionados.map((item, index) => (
                    <li key={index}>Item {item + 1} (Peso: {pesos[item]}, Valor: {valores[item]})</li>
                  ))}
                </ul>
              ) : (
                <p>No se seleccionaron items.</p>
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
