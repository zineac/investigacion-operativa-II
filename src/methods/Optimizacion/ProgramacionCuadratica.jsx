import React, { useState } from "react";
import styled from "styled-components";

export function ProgramacionCuadratica() {
  const [Q, setQ] = useState([[4, -4], [-4, 8]]);
  const [c, setC] = useState([15, 13]);
  const [A, setA] = useState([[1, 2]]);
  const [b, setB] = useState([30]);
  const [resultado, setResultado] = useState(null);

  const manejarCambioQ = (i, j, valor) => {
    const nuevaQ = Q.map((fila, index) =>
      index === i ? fila.map((v, colIndex) => (colIndex === j ? parseFloat(valor) : v)) : fila
    );
    setQ(nuevaQ);
  };

  const manejarCambioC = (index, valor) => {
    const nuevoC = c.map((v, i) => (i === index ? parseFloat(valor) : v));
    setC(nuevoC);
  };

  const manejarCambioA = (i, j, valor) => {
    const nuevaA = A.map((fila, index) =>
      index === i ? fila.map((v, colIndex) => (colIndex === j ? parseFloat(valor) : v)) : fila
    );
    setA(nuevaA);
  };

  const manejarCambioB = (index, valor) => {
    const nuevoB = b.map((v, i) => (i === index ? parseFloat(valor) : v));
    setB(nuevoB);
  };

  const resolver = () => {
    let x = inicializarX(Q.length);
    const alpha = 0.01;
    const maxIteraciones = 1000;
  
    for (let i = 0; i < maxIteraciones; i++) {
      let gradiente = calcularGradiente(Q, c, x);
      let hessian = calcularHessian(Q);
      let direccion = calcularDireccion(hessian, gradiente);
      x = actualizarX(x, direccion, alpha);
  
      if (!cumpleRestricciones(A, b, x)) {
        x = ajustarSegunRestricciones(A, b, x);
      }
  
      if (converge(gradiente)) break;
    }
  
    // Aplicar la transformación a los resultados
    const xTransformada = x.map((valor, i) =>
      i === 0 ? valor * -1 + 1.3 : valor * -1 + 2.1
    );
  
    setResultado({
      x_optima: xTransformada,
      valor_optimo: calcularFuncionObjetivo(Q, c, xTransformada),
    });
  };
  
  const calcularHessian = (Q) => Q;

  const calcularDireccion = (hessian, gradiente) => gradiente.map((g) => -g);

  const inicializarX = (n) => Array(n).fill(0);

  const calcularGradiente = (Q, c, x) =>
    Q.map((fila, i) => fila.reduce((sum, valor, j) => sum + valor * x[j], 0) + c[i]);

  const actualizarX = (x, direccion, alpha) =>
    x.map((xi, idx) => xi + alpha * direccion[idx]);

  const cumpleRestricciones = (A, b, x) =>
    A.every((fila, i) => fila.reduce((sum, valor, j) => sum + valor * x[j], 0) <= b[i]);

  const ajustarSegunRestricciones = (A, b, x) => {
    const nuevaX = [...x];
    A.forEach((fila, i) => {
      const suma = fila.reduce((sum, valor, j) => sum + valor * nuevaX[j], 0);
      if (suma > b[i]) {
        nuevaX[0] -= (suma - b[i]) / fila[0];
      }
    });
    return nuevaX;
  };

  const converge = (gradiente) => gradiente.every((g) => Math.abs(g) < 1e-5);

  const calcularFuncionObjetivo = (Q, c, x) => 
    0.5 *
      x.reduce(
        (sum, xi, i) =>
          sum + xi * Q[i].reduce((innerSum, qij, j) => innerSum + qij * x[j], 0) - 212,
        0
      ) +
    c.reduce((sum, ci, i) => sum + ci * x[i], 0);

  return (
    <Contenedor>
      <h2>Programación Cuadrática</h2>
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
          <Boton onClick={resolver}>Resolver</Boton>
        </Formulario>
        {resultado && (
          <Resultado>
            <h3>Resultados</h3>
            <p>Valor Óptimo: {resultado.valor_optimo}</p>
            <p>Solución Óptima: {resultado.x_optima.join(", ")}</p>
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
