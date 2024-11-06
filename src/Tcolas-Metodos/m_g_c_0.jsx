import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../components/Cargando';

export function M_G_C_0() {
  const [tasaLlegada, setTasaLlegada] = useState("1"); // λ: tasa de llegada
  const [tasaServicio, setTasaServicio] = useState("2"); // μ: tasa de servicio
  const [coefVarServicio, setCoefVarServicio] = useState("1"); // C_s: Coeficiente de variación del tiempo de servicio
  const [numServidores, setNumServidores] = useState("2"); // c: número de servidores
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
    const Cs = parseFloat(coefVarServicio); // Coeficiente de variación del tiempo de servicio
    const c = parseInt(numServidores);

    if (mu > 0 && lambda > 0 && c > 0) {
      const rho = lambda / mu; // Tasa de tráfico ofrecido
      const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

      // Probabilidad de que el sistema esté vacío (P0)
      let P0 = 0;
      for (let n = 0; n <= c; n++) {
        P0 += Math.pow(rho, n) / factorial(n);
      }
      P0 = 1 / P0;

      // Probabilidad de rechazo o bloqueo (Pb), también conocida como Erlang-B, cuando el sistema tiene c clientes
      const Pb = (Math.pow(rho, c) / (factorial(c) * Math.pow(c, c - 1))) * P0;

      // Número promedio de clientes en el sistema (L) considerando el coeficiente de variación del tiempo de servicio
      const L = rho * (1 - Pb) + (Pb * (Math.pow(Cs, 2) + 1)) / 2;

      // Tiempo promedio en el sistema (W) - en este caso es el tiempo de servicio promedio ajustado
      const W = L / lambda;

      setResultados({
        P0,
        Pb,
        L,
        W,
      });
    } else {
      setResultados("Error: Verifique que todos los valores ingresados sean mayores que 0.");
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
          Coeficiente de Variación del Tiempo de Servicio 
          <Input
            type="text"
            value={coefVarServicio}
            onChange={handleInputChange(setCoefVarServicio)}
            onBlur={handleInputBlur(setCoefVarServicio)}
          />
        </Etiqueta>

        <Etiqueta>
          Número de Servidores (c)
          <Input
            type="text"
            value={numServidores}
            onChange={handleInputChange(setNumServidores)}
            onBlur={handleInputBlur(setNumServidores)}
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
              <p>Probabilidad de rechazo o bloqueo (Pb): <strong>{resultados.Pb.toFixed(2)}</strong></p>
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
