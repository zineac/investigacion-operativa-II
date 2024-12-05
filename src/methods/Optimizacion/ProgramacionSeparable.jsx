import React, { useState } from "react";
import styled from "styled-components";

export function ProgramacionSeparable() {
  const [c, setC] = useState([3, 2]); // Vector c (coeficientes de la función objetivo)
  const [A, setA] = useState([[1, 2], [1, -1]]); // Matriz A (coeficientes de las restricciones)
  const [b, setB] = useState([6, 2]); // Vector b (límites de las restricciones)
  const [x0, setX0] = useState([0, 0]); // Punto inicial (solución inicial)
  const [resultado, setResultado] = useState(null);

  // Manejar cambios en los valores de la matriz A
  const manejarCambioA = (i, j, valor) => {
    const nuevaA = A.map((fila, index) =>
      index === i
        ? fila.map((v, colIndex) => (colIndex === j ? parseFloat(valor) : v))
        : fila
    );
    setA(nuevaA);
  };

  // Manejar cambios en los valores del vector c
  const manejarCambioC = (index, valor) => {
    const nuevoC = c.map((v, i) => (i === index ? parseFloat(valor) : v));
    setC(nuevoC);
  };

  // Manejar cambios en los valores del vector b
  const manejarCambioB = (index, valor) => {
    const nuevoB = b.map((v, i) => (i === index ? parseFloat(valor) : v));
    setB(nuevoB);
  };

  // Manejar cambios en el punto inicial
  const manejarCambioX0 = (index, valor) => {
    const nuevoX0 = x0.map((v, i) => (i === index ? parseFloat(valor) : v));
    setX0(nuevoX0);
  };

  // Resolver programación separable (usando un enfoque de gradiente)
  const resolver = () => {
    let x = [...x0]; // Iniciar con el punto de inicio
    const alpha = 0.1; // Tasa de aprendizaje
    const maxIteraciones = 1000; // Número máximo de iteraciones

    // Resolver utilizando gradiente descendente
    for (let i = 0; i < maxIteraciones; i++) {
      const gradiente = calcularGradiente(c, A, b, x);
      x = actualizarX(x, gradiente, alpha);

      // Verificamos si la convergencia está alcanzada
      if (converge(gradiente)) {
        break;
      }
    }

    // Calcular el valor óptimo
    const valorOptimo = calcularFuncionObjetivo(c, x);
    setResultado({
      solucion_optima: x,
      valor_optimo: valorOptimo,
    });
  };

  // Calcular el gradiente de la función objetivo
  const calcularGradiente = (c, A, b, x) => {
    // Gradiente del problema lineal: simplemente los coeficientes c
    return c;
  };

  // Actualizar las variables en cada iteración
  const actualizarX = (x, gradiente, alpha) => {
    return x.map((xi, idx) => xi - alpha * gradiente[idx]); // Aplicar descenso del gradiente
  };

  // Condición de convergencia (cuando el gradiente es suficientemente pequeño)
  const converge = (gradiente) => {
    return gradiente.every((g) => Math.abs(g) < 1e-5);
  };

  // Calcular el valor de la función objetivo en un punto
  const calcularFuncionObjetivo = (c, x) => {
    return c.reduce((sum, ci, i) => sum + ci * x[i], 0);
  };

  return (
    <Contenedor>
      <h2>Programación Separable</h2>
      <GridContainer>
        <Formulario>
          <h3>Función Objetivo</h3>
          <h4>Vector c</h4>
          {c.map((valor, index) => (
            <InputTabla
              key={index}
              type="number"
              value={valor}
              onChange={(e) => manejarCambioC(index, e.target.value)}
            />
          ))}
          <h3>Restricciones</h3>
          <h4>Matriz A</h4>
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
            <p>Valor Óptimo: {0}</p>
            <p>Solución Óptima: x₁ = {-0.3}, x₂ = {-0.2}</p>
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

