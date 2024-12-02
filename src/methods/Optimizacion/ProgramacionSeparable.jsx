import React, { useState } from "react";
import styled from "styled-components";

// Funciones separables
function optimizarProgramacionSeparable(a1, b1, a2, b2) {
  // Definimos las funciones separables
  const funcionObjetivo1 = (x1) => {
    return a1 * Math.pow(x1, 2) + b1 * x1; // f1(x1) = a1 * x1^2 + b1 * x1
  };

  const funcionObjetivo2 = (x2) => {
    return a2 * Math.pow(x2, 3) + b2 * x2; // f2(x2) = a2 * x2^3 + b2 * x2
  };

  // Derivadas de las funciones separables (para gradiente descendente)
  const derivadaFuncion1 = (x1) => {
    return 2 * a1 * x1 + b1; // f1'(x1) = 2 * a1 * x1 + b1
  };

  const derivadaFuncion2 = (x2) => {
    return 3 * a2 * Math.pow(x2, 2) + b2; // f2'(x2) = 3 * a2 * x2^2 + b2
  };

  // Gradiente descendente para optimizar las funciones separables
  const gradienteDescendente = (funcion, derivadaFuncion, x0, tasaAprendizaje, iteraciones) => {
    let x = x0;
    for (let i = 0; i < iteraciones; i++) {
      x = x - tasaAprendizaje * derivadaFuncion(x); // Actualización usando gradiente descendente
    }
    return x;
  };

  // Usamos un punto de inicio y configuramos tasa de aprendizaje e iteraciones
  const x1Optimo = gradienteDescendente(funcionObjetivo1, derivadaFuncion1, 0, 0.01, 1000);
  const x2Optimo = gradienteDescendente(funcionObjetivo2, derivadaFuncion2, 0, 0.01, 1000);

  // Calculamos el valor óptimo de la función total
  const minimo = funcionObjetivo1(x1Optimo) + funcionObjetivo2(x2Optimo);

  return { x1Optimo, x2Optimo, minimo };
}

export function ProgramacionSeparable() {
  const [a1, setA1] = useState(1); // Coeficiente a1
  const [b1, setB1] = useState(2); // Coeficiente b1
  const [a2, setA2] = useState(1); // Coeficiente a2
  const [b2, setB2] = useState(1); // Coeficiente b2
  const [resultado, setResultado] = useState(null); // Resultado de la optimización

  // Manejar cambios en los coeficientes
  const manejarCambioA1 = (e) => setA1(parseFloat(e.target.value));
  const manejarCambioB1 = (e) => setB1(parseFloat(e.target.value));
  const manejarCambioA2 = (e) => setA2(parseFloat(e.target.value));
  const manejarCambioB2 = (e) => setB2(parseFloat(e.target.value));

  // Resolver el problema de optimización separable
  const resolver = () => {
    const { x1Optimo, x2Optimo, minimo } = optimizarProgramacionSeparable(a1, b1, a2, b2);
    setResultado({ x1Optimo, x2Optimo, minimo });
  };

  return (
    <Contenedor>
      <h2>Programación Separable</h2>
      <Formulario>
        <h4>Coeficientes de las funciones separables: \( f(x) = f_1(x_1) + f_2(x_2) \)</h4>
        <InputTabla
          type="number"
          value={a1}
          onChange={manejarCambioA1}
          placeholder="Coeficiente a1"
        />
        <InputTabla
          type="number"
          value={b1}
          onChange={manejarCambioB1}
          placeholder="Coeficiente b1"
        />
        <InputTabla
          type="number"
          value={a2}
          onChange={manejarCambioA2}
          placeholder="Coeficiente a2"
        />
        <InputTabla
          type="number"
          value={b2}
          onChange={manejarCambioB2}
          placeholder="Coeficiente b2"
        />

        <Boton onClick={resolver}>Resolver</Boton>
      </Formulario>

      {resultado && (
        <ResultadoWrapper>
          <h3>Resultados</h3>
          <p><strong>Punto Óptimo \(x_1\):</strong> {resultado.x1Optimo}</p>
          <p><strong>Punto Óptimo \(x_2\):</strong> {resultado.x2Optimo}</p>
          <p><strong>Valor Óptimo de la Función:</strong> {resultado.minimo}</p>
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
