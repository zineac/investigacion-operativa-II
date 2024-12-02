import React, { useState } from "react";
import styled from "styled-components";

// Función de optimización no convexa
function optimizarProgramacionNoConvexa(a1, b1, c1) {
  // Una aproximación simple para resolver el problema de optimización no convexa
  // Usaremos un enfoque basado en un algoritmo de optimización como el gradiente descendente o un enfoque heurístico
  
  // A continuación, definimos la función no convexa
  const funcionObjetivo = (x) => {
    return a1 * Math.pow(x, 2) + b1 * Math.sin(x) + c1;
  };

  // Derivada de la función no convexa (para gradiente descendente)
  const derivadaFuncion = (x) => {
    return 2 * a1 * x + b1 * Math.cos(x);
  };

  // Método de Gradiente Descendente para encontrar el mínimo local
  const gradienteDescendente = (inicio, tasaAprendizaje, iteraciones) => {
    let x = inicio;
    for (let i = 0; i < iteraciones; i++) {
      x = x - tasaAprendizaje * derivadaFuncion(x);
    }
    return x;
  };

  // Usamos un punto inicial, una tasa de aprendizaje y un número de iteraciones
  const xOptimo = gradienteDescendente(0, 0.1, 1000);
  const minimo = funcionObjetivo(xOptimo);

  return { xOptimo, minimo };
}

export function ProgramacionNoConvexa() {
  const [a1, setA1] = useState(1); // Coeficiente a1
  const [b1, setB1] = useState(1); // Coeficiente b1
  const [c1, setC1] = useState(0); // Coeficiente c1
  const [resultado, setResultado] = useState(null); // Resultado de la optimización

  // Manejar cambios en los coeficientes
  const manejarCambioA1 = (e) => setA1(parseFloat(e.target.value));
  const manejarCambioB1 = (e) => setB1(parseFloat(e.target.value));
  const manejarCambioC1 = (e) => setC1(parseFloat(e.target.value));

  // Resolver el problema de optimización no convexa
  const resolver = () => {
    const { xOptimo, minimo } = optimizarProgramacionNoConvexa(a1, b1, c1);
    setResultado({ xOptimo, minimo });
  };

  return (
    <Contenedor>
      <h2>Programación No Convexa</h2>
      <Formulario>
        <h4>Coeficientes de la función objetivo: \( f(x) = a_1 x^2 + b_1 \sin(x) + c_1 \)</h4>
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
          value={c1}
          onChange={manejarCambioC1}
          placeholder="Coeficiente c1"
        />

        <Boton onClick={resolver}>Resolver</Boton>
      </Formulario>

      {resultado && (
        <ResultadoWrapper>
          <h3>Resultados</h3>
          <p><strong>Punto Óptimo (x):</strong> {resultado.xOptimo}</p>
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
