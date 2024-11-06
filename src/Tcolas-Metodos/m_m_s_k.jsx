import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../components/Cargando';

export function M_M_S_K() {
  const [tasaLlegada, setTasaLlegada] = useState("1"); // λ: tasa de llegada
  const [tasaServicio, setTasaServicio] = useState("2"); // μ: tasa de servicio
  const [numServidores, setNumServidores] = useState("2"); // s: número de servidores
  const [capacidadSistema, setCapacidadSistema] = useState("5"); // K: capacidad del sistema
  const [unidadTiempo, setUnidadTiempo] = useState("segundos"); // Unidad de tiempo
  const [resultados, setResultados] = useState(null);

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^[0-9.,]*$/.test(value)) {
      setter(value);
    }
  };

  const handleInputBlur = (setter) => (e) => {
    const value = e.target.value.replace(/,/g, '.');
    const parsedValue = parseFloat(value);
    setter(isNaN(parsedValue) ? "" : parsedValue.toString());
  };

  const calcularResultados = () => {
    const lambda = parseFloat(tasaLlegada);
    const mu = parseFloat(tasaServicio);
    const s = parseInt(numServidores);
    const K = parseInt(capacidadSistema);

    if (mu > 0 && lambda > 0 && s > 0 && K >= s) {
      const rho = lambda / mu; // Tasa de tráfico
      const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

      // Probabilidad de que el sistema esté vacío (P0)
      let P0 = 0;
      for (let n = 0; n <= s - 1; n++) {
        P0 += Math.pow(rho, n) / factorial(n);
      }
      P0 += (Math.pow(rho, s) / factorial(s)) * ((1 - Math.pow(rho / s, K - s + 1)) / (1 - (rho / s)));
      P0 = 1 / P0;

      // Probabilidad de rechazo o bloqueo (P_k), cuando el sistema tiene K clientes
      const Pk = (Math.pow(rho, K) / (factorial(s) * Math.pow(s, K - s))) * P0;

      // Tasa de llegada efectiva
      const lambdaEfectiva = lambda * (1 - Pk);

      // Número promedio de clientes en el sistema (L)
      let L = 0;
      for (let n = 0; n <= K; n++) {
        if (n < s) {
          L += n * (Math.pow(rho, n) / factorial(n)) * P0;
        } else {
          L += n * (Math.pow(rho, n) / (factorial(s) * Math.pow(s, n - s))) * P0;
        }
      }

      // Tiempo promedio en el sistema (W)
      const W = L / lambdaEfectiva;

      setResultados({
        P0,
        Pk,
        L,
        W,
        lambdaEfectiva,
      });
    } else {
      setResultados("Error: Verifique que todos los valores ingresados sean mayores que 0 y que K sea mayor o igual a s.");
    }
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Tasa de Llegada (λ)
          <Input
            type="text"
            value={tasaLlegada}
            onChange={handleInputChange(setTasaLlegada)}
            onBlur={handleInputBlur(setTasaLlegada)}
          />
        </Etiqueta>

        <Etiqueta>
          Tasa de Servicio (μ)
          <Input
            type="text"
            value={tasaServicio}
            onChange={handleInputChange(setTasaServicio)}
            onBlur={handleInputBlur(setTasaServicio)}
          />
        </Etiqueta>

        <Etiqueta>
          Número de Servidores (s)
          <Input
            type="text"
            value={numServidores}
            onChange={handleInputChange(setNumServidores)}
            onBlur={handleInputBlur(setNumServidores)}
          />
        </Etiqueta>

        <Etiqueta>
          Capacidad del Sistema (K)
          <Input
            type="text"
            value={capacidadSistema}
            onChange={handleInputChange(setCapacidadSistema)}
            onBlur={handleInputBlur(setCapacidadSistema)}
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
              <p>Probabilidad de que el sistema esté vacío (P0): <strong>{resultados.P0.toFixed(2)}</strong></p>
              <p>Probabilidad de rechazo o bloqueo (Pk): <strong>{resultados.Pk.toFixed(2)}</strong></p>
              <p>Tasa de llegada efectiva (λ efectiva): <strong>{resultados.lambdaEfectiva.toFixed(2)}</strong></p>
              <p>Número promedio de clientes en el sistema (L): <strong>{resultados.L.toFixed(2)}</strong></p>
              <p>Tiempo promedio en el sistema (W): <strong>{resultados.W.toFixed(2)} {unidadTiempo}</strong></p>
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

const ResultadosContainer = styled.div`
  flex: 0.3;
  padding: 20px;
  background-color: #343a40;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Resultados = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  text-align: center;
  color: #343a40;
`;

const ErrorTexto = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;
