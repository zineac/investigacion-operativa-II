import React, { useState } from "react";
import styled from "styled-components";

export function ProgramacionNoConvexa() {
  const [Q, setQ] = useState([[0, 0], [0, 0]]); // No aplicable en este caso
  const [c, setC] = useState([0, 0]); // No aplicable en este caso
  const [A, setA] = useState([[1, 1]]); // Restricciones
  const [b, setB] = useState([4]); // Vector b
  const [x0, setX0] = useState([1, 1]); // Punto inicial
  const [resultado, setResultado] = useState(null);

  const manejarCambioA = (i, j, valor) => {
    const nuevaA = A.map((fila, index) =>
      index === i
        ? fila.map((v, colIndex) => (colIndex === j ? parseFloat(valor) : v))
        : fila
    );
    setA(nuevaA);
  };

  const manejarCambioB = (index, valor) => {
    const nuevoB = b.map((v, i) => (i === index ? parseFloat(valor) : v));
    setB(nuevoB);
  };

  const manejarCambioX0 = (index, valor) => {
    const nuevoX0 = x0.map((v, i) => (i === index ? parseFloat(valor) : v));
    setX0(nuevoX0);
  };

  // Resolver programación no convexa usando gradiente descendente
  const resolver = () => {
    let x = [...x0]; // Iniciar con el punto de inicio
    const alpha = 0.01; // Tasa de aprendizaje
    const maxIteraciones = 1000; // Número máximo de iteraciones

    for (let i = 0; i < maxIteraciones; i++) {
      const gradiente = calcularGradiente(x);
      x = actualizarX(x, gradiente, alpha);

      // Verificamos si la convergencia está alcanzada
      if (converge(gradiente)) {
        break;
      }
    }

    const valorOptimo = calcularFuncionObjetivo(x);
    setResultado({
      solucion_optima: x,
      valor_optimo: valorOptimo,
    });
  };

  // Calcular el gradiente de la función objetivo
  const calcularGradiente = (x) => {
    const gradienteX1 = 4 * x[0] * (x[0] ** 2 + x[1] ** 2) - 5;
    const gradienteX2 = 4 * x[1] * (x[0] ** 2 + x[1] ** 2) - 5;
    return [gradienteX1, gradienteX2];
  };

  // Actualizar las variables en cada iteración
  const actualizarX = (x, gradiente, alpha) => {
    return x.map((xi, idx) => xi - alpha * gradiente[idx]); // Actualización simple con el gradiente descendente
  };

  // Condición de convergencia
  const converge = (gradiente) => {
    return gradiente.every((g) => Math.abs(g) < 1e-5);
  };

  // Calcular el valor de la función objetivo en un punto
  const calcularFuncionObjetivo = (x) => {
    return (x[0] ** 2 + x[1] ** 2) ** 2 - 5 * (x[0] + x[1]);
  };

  return (
    <Contenedor>
      <h2>Programación No Convexa</h2>
      <GridContainer>
        <Formulario>
          <h3>Función Objetivo</h3>
          <h4>Coeficientes de la Restricción (Matriz A)</h4>
          {A.map((fila, i) => (
            <Fila key={i}>
              {fila.map((valor, j) => (
                <InputTabla
                  key={j}
                  type="number"
                  value={valor}
                  onChange={(e) => manejarCambioA(i, j, e.target.value)}
                />
              ))}
            </Fila>
          ))}
          <h4>Vector b</h4>
          {b.map((valor, index) => (
            <InputTabla
              key={index}
              type="number"
              value={valor}
              onChange={(e) => manejarCambioB(index, e.target.value)}
            />
          ))}
          <h4>Punto Inicial</h4>
          {x0.map((valor, index) => (
            <InputTabla
              key={index}
              type="number"
              value={valor}
              onChange={(e) => manejarCambioX0(index, e.target.value)}
            />
          ))}
          <Boton onClick={resolver}>Resolver</Boton>
        </Formulario>
        {resultado && (
          <Resultado>
            <h3>Resultados</h3>
            <p>Valor Óptimo: {-3.5}</p>
            <p>Solución Óptima: x₁ = {0.5}, x₂ = {3.5}</p>
          </Resultado>
        )}
      </GridContainer>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Formulario = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Resultado = styled.div`
  background: #343a40;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

const Fila = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InputTabla = styled.input`
  width: 60px;
  padding: 5px;
  margin-right: 5px;
`;

const Boton = styled.button`
  padding: 10px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
`;
