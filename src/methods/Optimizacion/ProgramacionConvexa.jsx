import React, { useState } from "react";
import styled from "styled-components";

// Simulación de la resolución de la Programación Convexa (utilizando optimización convexa)
function resolverProblemaConvexo(c, A, b) {
  // Implementar aquí la lógica para resolver la programación convexa (por ejemplo, usando un solver adecuado)
  // Este es un ejemplo de simulación que devuelve una solución aleatoria
  // En un entorno real, puedes usar bibliotecas como "cvxopt" en Python o solvers JavaScript como "glpk.js"

  // Simulación: resultados óptimos aleatorios
  const x_optima = [Math.random() * 10, Math.random() * 10]; // Solución aleatoria
  const valor_optimo = c[0] * x_optima[0] + c[1] * x_optima[1]; // Función objetivo lineal

  return { x_optima, valor_optimo };
}

export function ProgramacionConvexa() {
  const [c, setC] = useState([1, 1]);            // Vector c (función objetivo lineal)
  const [A, setA] = useState([[1, 1], [1, -1]]); // Matriz A (restricciones)
  const [b, setB] = useState([1, 0]);            // Vector b (límites de las restricciones)
  const [resultado, setResultado] = useState(null); // Resultado del modelo

  // Manejar cambios en los valores de las matrices y vectores
  const manejarCambioC = (index, valor) => {
    const nuevoC = [...c];
    nuevoC[index] = parseFloat(valor);
    setC(nuevoC);
  };

  const manejarCambioA = (row, col, valor) => {
    const nuevaA = [...A];
    nuevaA[row][col] = parseFloat(valor);
    setA(nuevaA);
  };

  const manejarCambioB = (index, valor) => {
    const nuevoB = [...b];
    nuevoB[index] = parseFloat(valor);
    setB(nuevoB);
  };

  const resolver = () => {
    const { x_optima, valor_optimo } = resolverProblemaConvexo(c, A, b);
    setResultado({ x_optima, valor_optimo });
  };

  return (
    <Contenedor>
      <h2>Programación Convexa</h2>
      <Formulario>
        <div>
          <h3>Función Objetivo: \( c^T x \)</h3>
          <h4>Vector c (Coeficientes de la función objetivo)</h4>
          {c.map((valor, index) => (
            <InputTabla
              key={index}
              type="number"
              value={valor}
              onChange={(e) => manejarCambioC(index, e.target.value)}
              placeholder={`c[${index}]`}
            />
          ))}
        </div>

        <div>
          <h3>Restricciones: \( A x \leq b \)</h3>
          <h4>Matriz A (Restricciones)</h4>
          {A.map((fila, i) => (
            <Fila key={i}>
              {fila.map((valor, j) => (
                <InputTabla
                  key={j}
                  type="number"
                  value={valor}
                  onChange={(e) => manejarCambioA(i, j, e.target.value)}
                  placeholder={`A[${i}][${j}]`}
                />
              ))}
            </Fila>
          ))}
          <h4>Vector b (Límites de las restricciones)</h4>
          {b.map((valor, index) => (
            <InputTabla
              key={index}
              type="number"
              value={valor}
              onChange={(e) => manejarCambioB(index, e.target.value)}
              placeholder={`b[${index}]`}
            />
          ))}
        </div>

        <Boton onClick={resolver}>Resolver</Boton>
      </Formulario>

      {resultado && (
        <ResultadoWrapper>
          <h3>Resultados</h3>
          <p><strong>Valor Óptimo:</strong> {resultado.valor_optimo}</p>
          <p><strong>Solución Óptima (x):</strong> {resultado.x_optima.join(", ")}</p>
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

const Fila = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InputTabla = styled.input`
  width: 60px;
  padding: 10px;
  margin-right: 5px;
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

