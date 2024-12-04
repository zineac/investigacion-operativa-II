import React, { useState } from "react";
import styled from "styled-components";
import Cargando from "../../components/Cargando";

export function M_G_C_0() {
  const [nEstados, setNEstados] = useState("4"); // n
  const [tasaLlegada, setTasaLlegada] = useState("3"); // λ
  const [tasaServicio, setTasaServicio] = useState("5"); // μ
  const [resultados, setResultados] = useState(null);

  const calcularResultados = () => {
    const n = parseInt(nEstados);
    const lambda = parseFloat(tasaLlegada);
    const mu = parseFloat(tasaServicio);

    if (n <= 0 || lambda <= 0 || mu <= 0) {
      setResultados("Los valores deben ser positivos.");
      return;
    }

    // Cálculo de π₀
    let sumatoria = 0;
    for (let i = 0; i <= n; i++) {
      sumatoria += Math.pow(lambda / mu, i);
    }
    const pi0 = 1 / sumatoria;

    // Cálculo de probabilidades πᵢ
    const probabilidades = [];
    for (let i = 0; i <= n; i++) {
      const pi = pi0 * Math.pow(lambda / mu, i);
      probabilidades.push(pi);
    }

    // Cálculo de L_sistema
    let L_sistema = 0;
    for (let i = 0; i <= n; i++) {
      L_sistema += i * probabilidades[i];
    }

    // Cálculo de L_cola
    const L_cola = L_sistema - (1 - pi0);

    // Cálculo de W
    const W = L_sistema / lambda;

    // Cálculo de utilización (U)
    const U = 1 - pi0;

    // Resultados
    setResultados({
      pi0,
      probabilidades,
      L_sistema,
      L_cola,
      W,
      U,
    });
  };

  // Función para calcular factorial
  const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Número de Estados (n)
          <Input
            type="text"
            value={nEstados}
            onChange={(e) => setNEstados(e.target.value)}
          />
        </Etiqueta>
        <Etiqueta>
          Tasa de Llegada (λ)
          <Input
            type="text"
            value={tasaLlegada}
            onChange={(e) => setTasaLlegada(e.target.value)}
          />
        </Etiqueta>
        <Etiqueta>
          Tasa de Servicio (μ)
          <Input
            type="text"
            value={tasaServicio}
            onChange={(e) => setTasaServicio(e.target.value)}
          />
        </Etiqueta>
        <Boton onClick={calcularResultados}>Calcular</Boton>
      </FormularioContainer>

      <ResultadosContainer>
        {resultados ? (
          typeof resultados === "string" ? (
            <ErrorTexto>{resultados}</ErrorTexto>
          ) : (
            <Resultados>
              <h2>Resultados</h2>
              <ResultadoBox>
                <p>
                  Probabilidad de que el sistema esté vacío (π₀):{" "}
                  <strong>{resultados.pi0.toFixed(4)}</strong>
                </p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Probabilidades por estado:</p>
                {resultados.probabilidades.map((pi, i) => (
                  <p key={i}>
                    π<sub>{i}</sub> = <strong>{(pi * 100).toFixed(2)}%</strong>
                  </p>
                ))}
              </ResultadoBox>
              <ResultadoBox>
                <p>
                  Longitud promedio del sistema (L<sub>sistema</sub>):{" "}
                  <strong>{resultados.L_sistema.toFixed(4)}</strong>
                </p>
              </ResultadoBox>
              <ResultadoBox>
                <p>
                  Longitud promedio de la cola (L<sub>cola</sub>):{" "}
                  <strong>{resultados.L_cola.toFixed(4)}</strong>
                </p>
              </ResultadoBox>
              <ResultadoBox>
                <p>
                  Tiempo promedio de espera (W):{" "}
                  <strong>{resultados.W.toFixed(2)} horas</strong>
                </p>
              </ResultadoBox>
              <ResultadoBox>
                <p>
                  Utilización del sistema (U):{" "}
                  <strong>{(resultados.U * 100).toFixed(2)}%</strong>
                </p>
              </ResultadoBox>
            </Resultados>
          )
        ) : (
          <Cargando />
        )}
      </ResultadosContainer>
    </Container>
  );
}

// Estilos y otros componentes
const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin: 0 0 22px 0;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
`;

const FormularioContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  max-width: 400px;
`;

const Boton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 22px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Etiqueta = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #343a40;
`;

const ResultadosContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #343a40;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Resultados = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  color: #343a40;
  width: 100%;
`;

const ResultadoBox = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-size: 1.1em;
  color: #343a40;
`;

const ErrorTexto = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

export default M_G_C_0;