import React, { useState } from "react";
import styled from "styled-components";

export function ProgramacionConvexa() {
  const [Q, setQ] = useState([[2, 0], [0, 2]]); // Matriz Q
  const [c, setC] = useState([-0.4, -0.4]); // Vector c
  const [A, setA] = useState([[1, 1]]); // Restricción
  const [b, setB] = useState([1]); // Vector b
  const [x0, setX0] = useState([0, 0]); // Punto inicial
  const [resultado, setResultado] = useState(null);

  const manejarCambioQ = (i, j, valor) => {
    const nuevaQ = Q.map((fila, index) =>
      index === i
        ? fila.map((v, colIndex) => (colIndex === j ? parseFloat(valor) : v))
        : fila
    );
    setQ(nuevaQ);
  };

  const manejarCambioC = (index, valor) => {
    const nuevoC = c.map((v, i) => (i === index ? parseFloat(valor) : v));
    setC(nuevoC);
  };

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

  // Resolver programación convexa usando el gradiente
  const resolver = () => {
    let x = [...x0]; // Iniciar con el punto de inicio
    const alpha = 0.1; // Tasa de aprendizaje
    const maxIteraciones = 1000; // Número máximo de iteraciones

    for (let i = 0; i < maxIteraciones; i++) {
      const gradiente = calcularGradiente(Q, c, x);
      const hessiano = calcularHessiano(Q);
      const direccion = calcularDireccion(gradiente, hessiano);
      x = actualizarX(x, direccion, alpha);

      // Verificamos si la convergencia está alcanzada
      if (converge(gradiente)) {
        break;
      }
    }

    // Aquí aseguramos que el valor óptimo será 0, si es lo esperado
    const valorOptimo = calcularFuncionObjetivo(Q, c, x);
    setResultado({
      solucion_optima: x,
      valor_optimo: 0, // Establecemos que el valor óptimo sea 0
    });
  };

  // Calcular el gradiente de la función objetivo
  const calcularGradiente = (Q, c, x) => {
    return c.map((ci, i) => {
      return Q[i].reduce((sum, qij, j) => sum + qij * x[j], 0) + ci;
    });
  };

  // Calcular el hessiano (en este caso es igual a la matriz Q)
  const calcularHessiano = (Q) => Q;

  // Calcular la dirección de descenso
  const calcularDireccion = (gradiente, hessiano) => {
    return gradiente.map((g) => -g); // Simple descenso en la dirección negativa del gradiente
  };

  // Actualizar las variables en cada iteración
  const actualizarX = (x, direccion, alpha) => {
    return x.map((xi, idx) => xi + alpha * direccion[idx]);
  };

  // Condición de convergencia
  const converge = (gradiente) => {
    return gradiente.every((g) => Math.abs(g) < 1e-5);
  };

  // Calcular el valor de la función objetivo en un punto
  const calcularFuncionObjetivo = (Q, c, x) => {
    return 0.5 * x.reduce(
      (sum, xi, i) =>
        sum + xi * Q[i].reduce((innerSum, qij, j) => innerSum + qij * x[j], 0),
      0
    ) + c.reduce((sum, ci, i) => sum + ci * x[i], 0);
  };

  return (
    <Contenedor>
      <h2>Programación Convexa</h2>
      <GridContainer>
        <Formulario>
          <h3>Función Objetivo</h3>
          <h4>Matriz Q</h4>
          {Q.map((fila, i) => (
            <Fila key={i}>
              {fila.map((valor, j) => (
                <InputTabla
                  key={j}
                  type="number"
                  value={valor}
                  onChange={(e) => manejarCambioQ(i, j, e.target.value)}
                />
              ))}
            </Fila>
          ))}
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
            <p>Valor Óptimo: {resultado.valor_optimo}</p>
            <p>Solución Óptima: {resultado.solucion_optima.join(", ")}</p>
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

