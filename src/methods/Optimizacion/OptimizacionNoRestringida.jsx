import React, { useState } from "react";
import styled from "styled-components";

// Función para optimizar (minimizar o maximizar)
function optimizarFuncion(a, b, c, modo) {
  // Para una función cuadrática de la forma f(x) = ax^2 + bx + c,
  // el mínimo o máximo se encuentra en x = -b/(2a)
  const x_optima = -b / (2 * a);

  // Evaluamos la función en ese punto para obtener el valor óptimo
  const valor_optimo = a * Math.pow(x_optima, 2) + b * x_optima + c;

  // Si el modo es "maximizar", tomamos el negativo del valor óptimo para invertir la dirección de la optimización
  return modo === "maximizar" ? -valor_optimo : valor_optimo;
}

export function OptimizacionNoRestringida() {
  const [a, setA] = useState(1); // Coeficiente a de la función cuadrática
  const [b, setB] = useState(-6); // Coeficiente b de la función cuadrática
  const [c, setC] = useState(8); // Coeficiente c de la función cuadrática
  const [modo, setModo] = useState("minimizar"); // Modo de optimización: "minimizar" o "maximizar"
  const [resultado, setResultado] = useState(null); // Resultado del modelo

  // Manejar los cambios en los coeficientes
  const manejarCambioA = (e) => setA(parseFloat(e.target.value));
  const manejarCambioB = (e) => setB(parseFloat(e.target.value));
  const manejarCambioC = (e) => setC(parseFloat(e.target.value));

  // Cambiar el modo de optimización
  const manejarCambioModo = (e) => setModo(e.target.value);

  // Resolver la optimización
  const resolver = () => {
    const valorOptimo = optimizarFuncion(a, b, c, modo);
    setResultado({ x_optima: -b / (2 * a), valor_optimo: valorOptimo });
  };

  return (
    <Contenedor>
      <h2>Optimización No Restringida</h2>
      <Formulario>
        <div>
          <h3>Función Objetivo: \( f(x) = ax^2 + bx + c \)</h3>
          <h4>Coeficientes de la función cuadrática</h4>
          <InputTabla
            type="number"
            value={a}
            onChange={manejarCambioA}
            placeholder="Coeficiente a"
          />
          <InputTabla
            type="number"
            value={b}
            onChange={manejarCambioB}
            placeholder="Coeficiente b"
          />
          <InputTabla
            type="number"
            value={c}
            onChange={manejarCambioC}
            placeholder="Coeficiente c"
          />
        </div>

        <div>
          <h4>Modo de Optimización</h4>
          <select value={modo} onChange={manejarCambioModo}>
            <option value="minimizar">Minimizar</option>
            <option value="maximizar">Maximizar</option>
          </select>
        </div>

        <Boton onClick={resolver}>Resolver</Boton>
      </Formulario>

      {resultado && (
        <ResultadoWrapper>
          <h3>Resultados</h3>
          <p><strong>Valor Óptimo (x):</strong> {resultado.x_optima}</p>
          <p><strong>Valor de la Función Objetivo:</strong> {resultado.valor_optimo}</p>
        </ResultadoWrapper>
      )}
    </Contenedor>
  );
}

const Contenedor = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
`;

const Formulario = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InputTabla = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Boton = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ResultadoWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

