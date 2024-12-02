import React, { useState } from "react";
import styled from "styled-components";

// Función de optimización geométrica
function optimizarProgramacionGeometrica(a1, b1, a2, b2, modo) {
  // Función objetivo: f(x) = (a1*x + b1) / (a2*x + b2)

  // Verificar que no haya división por cero o valores inválidos
  if (a2 === 0 && b2 === 0) {
    console.error("Error: División por cero en el denominador.");
    return NaN;  // Evitar cálculos con denominador cero
  }

  // Derivada de f(x) = (a1*x + b1) / (a2*x + b2)
  const derivada = (a2 * (a2 * b2) - (a1 * b1)) / Math.pow(a2 * b2, 2);

  console.log("Derivada calculada:", derivada);  // Depuración

  // Si la derivada es positiva, la función es creciente, por lo que si estamos maximizando, debemos elegir el valor más grande posible.
  // Si la derivada es negativa, la función es decreciente, por lo que elegimos el valor más pequeño posible.
  const valorOptimo = derivada > 0 ? Math.max(a1, b1) : Math.min(a1, b1);

  console.log("Valor óptimo calculado:", valorOptimo); // Depuración

  return modo === "maximizar" ? valorOptimo : -valorOptimo;
}

export function ProgramacionGeometrica() {
  const [a1, setA1] = useState(1); // Coeficiente a1 del numerador
  const [b1, setB1] = useState(2); // Coeficiente b1 del numerador
  const [a2, setA2] = useState(3); // Coeficiente a2 del denominador
  const [b2, setB2] = useState(4); // Coeficiente b2 del denominador
  const [modo, setModo] = useState("maximizar"); // Modo de optimización: "maximizar" o "minimizar"
  const [resultado, setResultado] = useState(null); // Resultado del modelo
  const [error, setError] = useState(null); // Mensaje de error

  // Manejar los cambios en los coeficientes
  const manejarCambioA1 = (e) => setA1(parseFloat(e.target.value));
  const manejarCambioB1 = (e) => setB1(parseFloat(e.target.value));
  const manejarCambioA2 = (e) => setA2(parseFloat(e.target.value));
  const manejarCambioB2 = (e) => setB2(parseFloat(e.target.value));

  // Cambiar el modo de optimización
  const manejarCambioModo = (e) => setModo(e.target.value);

  // Resolver la optimización
  const resolver = () => {
    setError(null); // Limpiar errores previos

    // Verificación para evitar cálculos inválidos
    if (isNaN(a1) || isNaN(b1) || isNaN(a2) || isNaN(b2)) {
      setError("Por favor ingresa valores válidos para los coeficientes.");
      return;
    }

    try {
      const valorOptimo = optimizarProgramacionGeometrica(a1, b1, a2, b2, modo);
      
      // Si el valor óptimo es NaN, mostramos un mensaje de error
      if (isNaN(valorOptimo)) {
        throw new Error("Error en el cálculo de la optimización.");
      }

      setResultado({ valor_optimo: valorOptimo });
    } catch (error) {
      console.error(error);
      setError("Hubo un error en el cálculo de la optimización. Verifica los valores.");
    }
  };

  return (
    <Contenedor>
      <h2>Programación Geométrica</h2>
      <Formulario>
        <div>
          <h3>Función Objetivo: f(x) = (a1 * x + b1) / (a2 * x + b2)</h3>
          <h4>Coeficientes de la función geométrica</h4>
          <InputTabla
            type="number"
            value={a1}
            onChange={manejarCambioA1}
            placeholder="Coeficiente a1 (numerador)"
          />
          <InputTabla
            type="number"
            value={b1}
            onChange={manejarCambioB1}
            placeholder="Coeficiente b1 (numerador)"
          />
          <InputTabla
            type="number"
            value={a2}
            onChange={manejarCambioA2}
            placeholder="Coeficiente a2 (denominador)"
          />
          <InputTabla
            type="number"
            value={b2}
            onChange={manejarCambioB2}
            placeholder="Coeficiente b2 (denominador)"
          />
        </div>

        <div>
          <h4>Modo de Optimización</h4>
          <select value={modo} onChange={manejarCambioModo}>
            <option value="maximizar">Maximizar</option>
            <option value="minimizar">Minimizar</option>
          </select>
        </div>

        <Boton onClick={resolver}>Resolver</Boton>
      </Formulario>

      {error && (
        <ResultadoWrapper style={{ color: "red" }}>
          <h3>Error</h3>
          <p>{error}</p>
        </ResultadoWrapper>
      )}

      {resultado && !error && (
        <ResultadoWrapper>
          <h3>Resultados</h3>
          <p><strong>Valor Óptimo de la Función:</strong> {resultado.valor_optimo}</p>
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

