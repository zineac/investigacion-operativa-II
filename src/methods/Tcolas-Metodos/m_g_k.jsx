import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../../components/Cargando';

export function MGK() {
  const [tasaLlegada, setTasaLlegada] = useState("12"); // λ
  const [tasaServicio, setTasaServicio] = useState("3"); // μ
  const [numCanales, setNumCanales] = useState("5"); // k
  const [unidadTiempo, setUnidadTiempo] = useState("horas");
  const [resultados, setResultados] = useState(null);

  const calcularResultados = () => {
    const lambda = parseFloat(tasaLlegada);
    const mu = parseFloat(tasaServicio);
    const k = parseInt(numCanales);

    if (lambda <= 0 || mu <= 0 || k <= 0) {
      setResultados("Los valores deben ser positivos.");
      return;
    }

    // Cálculo del denominador de la fórmula 1
    let sumatoriaDenominador = 0;
    for (let i = 0; i <= k; i++) {
      sumatoriaDenominador += Math.pow(lambda / mu, i) / factorial(i);
    }

    // Probabilidad P(k)
    const Pk = Math.pow(lambda / mu, k) / (factorial(k) * sumatoriaDenominador);

    // Número promedio de unidades en el sistema (L)
    const L = (lambda / mu) * (1 - Pk);

    // Resultados
    setResultados({
      Pk,
      L,
    });
  };

  // Función para calcular factorial
  const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
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

        <Etiqueta>
          Número de Canales (k)
          <Input
            type="text"
            value={numCanales}
            onChange={(e) => setNumCanales(e.target.value)}
          />
        </Etiqueta>

        <Etiqueta>
          Unidad de Tiempo
          <Select value={unidadTiempo} onChange={(e) => setUnidadTiempo(e.target.value)}>
            <option value="segundos">Segundos</option>
            <option value="minutos">Minutos</option>
            <option value="horas">Horas</option>
          </Select>
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
                <p>Probabilidad de que todos los canales estén ocupados (P(k)): <strong>{resultados.Pk.toFixed(4)}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Número promedio de unidades en el sistema (L): <strong>{resultados.L.toFixed(2)}</strong></p>
              </ResultadoBox>
            </Resultados>
          )
        ) : <Cargando />}
      </ResultadosContainer>
    </Container>
  );
}


// Estilos y otros componentes (no cambian)
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

const Select = styled.select`
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

const Resultados = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  color: #343a40;
  width: 100%;
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

const ErrorTexto = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

export default MGK;
