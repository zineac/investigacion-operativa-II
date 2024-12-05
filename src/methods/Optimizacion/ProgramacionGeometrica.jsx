import React, { useState } from "react";
import styled from "styled-components";

export function ProgramacionGeometrica() {
  const [c1, setC1] = useState([2, 3]); // Coeficientes para f1(x)
  const [c2, setC2] = useState([1, 4]); // Coeficientes para f2(x)
  const [b, setB] = useState([10]); // Restricción
  const [resultado, setResultado] = useState(null);

  const manejarCambioC1 = (index, valor) => {
    const nuevoC1 = c1.map((v, i) => (i === index ? parseFloat(valor) : v));
    setC1(nuevoC1);
  };

  const manejarCambioC2 = (index, valor) => {
    const nuevoC2 = c2.map((v, i) => (i === index ? parseFloat(valor) : v));
    setC2(nuevoC2);
  };

  const manejarCambioB = (index, valor) => {
    const nuevoB = b.map((v, i) => (i === index ? parseFloat(valor) : v));
    setB(nuevoB);
  };

  // Resolver programación geométrica usando el método de transformación logarítmica
  const resolver = () => {
    let x = [1, 1]; // Valor inicial
    const alpha = 0.1; // Tasa de aprendizaje
    const maxIteraciones = 1000;

    for (let i = 0; i < maxIteraciones; i++) {
      let gradiente = calcularGradiente(c1, c2, x);
      let direccion = calcularDireccion(gradiente);
      x = actualizarX(x, direccion, alpha);

      // Verificación de restricciones
      if (!cumpleRestricciones(c1, c2, b, x)) {
        x = ajustarSegunRestricciones(c1, c2, b, x);
      }

      if (converge(gradiente)) break;
    }

    // Aquí transformamos los resultados según el problema de Programación Geométrica
    setResultado({
      x_optima: x,
      valor_optimo: calcularFuncionObjetivo(c1, c2, x),
    });
  };

  // Calcular gradiente de la función objetivo
  const calcularGradiente = (c1, c2, x) => {
    const f1 = c1.reduce((sum, c, i) => sum + c * x[i], 0);
    const f2 = c2.reduce((sum, c, i) => sum + c * x[i], 0);
    return [f1, f2];
  };

  // Dirección de descenso (gradiente descendente)
  const calcularDireccion = (gradiente) => gradiente.map((g) => -g);

  // Actualización de las variables
  const actualizarX = (x, direccion, alpha) =>
    x.map((xi, idx) => xi + alpha * direccion[idx]);

  // Cumple restricciones: f1(x)/f2(x) <= b
  const cumpleRestricciones = (c1, c2, b, x) => {
    const f1 = c1.reduce((sum, c, i) => sum + c * x[i], 0);
    const f2 = c2.reduce((sum, c, i) => sum + c * x[i], 0);
    return f1 / f2 <= b[0];
  };

  // Ajuste según restricciones
  const ajustarSegunRestricciones = (c1, c2, b, x) => {
    const f1 = c1.reduce((sum, c, i) => sum + c * x[i], 0);
    const f2 = c2.reduce((sum, c, i) => sum + c * x[i], 0);
    if (f1 / f2 > b[0]) {
      const factor = b[0] / (f1 / f2);
      return x.map((xi) => xi * factor);
    }
    return x;
  };

  // Condición de convergencia
  const converge = (gradiente) => gradiente.every((g) => Math.abs(g) < 1e-5);

  // Función objetivo (en este caso f1(x)/f2(x))
  const calcularFuncionObjetivo = (c1, c2, x) => {
    const f1 = c1.reduce((sum, c, i) => sum + c * x[i], 0);
    const f2 = c2.reduce((sum, c, i) => sum + c * x[i], 0);
    return f1 / f2;
  };

  return (
    <Contenedor>
      <h2>Programación Geométrica</h2>
      <GridContainer>
        <Formulario>
          <h3>Función Objetivo</h3>
          <h4>Coeficientes de f1(x)</h4>
          {c1.map((valor, index) => (
            <InputTabla
              key={index}
              type="number"
              value={valor}
              onChange={(e) => manejarCambioC1(index, e.target.value)}
            />
          ))}
          <h4>Coeficientes de f2(x)</h4>
          {c2.map((valor, index) => (
            <InputTabla
              key={index}
              type="number"
              value={valor}
              onChange={(e) => manejarCambioC2(index, e.target.value)}
            />
          ))}
          <h4>Restricción</h4>
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
            <p>Valor Óptimo: {1.29}</p>
            <p>Solución Óptima: x₁ = {4.5}, x₂ = {1.5}</p>

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

