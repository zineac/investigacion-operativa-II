import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../../components/Cargando'

export function M_M_1() {
  const [tasaLlegada, setTasaLlegada] = useState("30"); // λ: tasa de llegada
  const [tasaServicio, setTasaServicio] = useState("35"); // μ: tasa de servicio
  const [unidadTiempo, setUnidadTiempo] = useState("horas"); // Unidad de tiempo
  const [resultados, setResultados] = useState(null);

  const handleInputChange = (setter) => (e) => {
    // Permitir solo números, puntos y comas en el input
    const value = e.target.value;
    if (/^[0-9.,]*$/.test(value)) { // Permitir solo dígitos, puntos y comas
      setter(value);
    }
  };

  const handleInputBlur = (setter) => (e) => {
    // Reemplazar cualquier coma por un punto y asegurar que sea un número
    const value = e.target.value.replace(/,/g, '.');
    const parsedValue = parseFloat(value);
    setter(isNaN(parsedValue) ? "" : parsedValue.toString());
  };

  const calcularResultados = () => {
    const lambda = parseFloat(tasaLlegada);
    const mu = parseFloat(tasaServicio);

    if (mu > lambda) {
      const rho = lambda / mu; // Utilización del sistema
      const L = rho / (1 - rho); // Número promedio de clientes en el sistema
      const Lq = Math.pow(lambda, 2) / (mu * (mu - lambda)); // Número promedio de clientes en la cola
      const W = 1 / (mu - lambda); // Tiempo promedio en el sistema
      const Wq = lambda / (mu * (mu - lambda)); // Tiempo promedio en la cola

      setResultados({
        rho,
        L,
        Lq,
        W,
        Wq,
      });
    } else {
      setResultados("Error: La tasa de servicio debe ser mayor que la tasa de llegada.");
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
                <p>Utilización del sistema (ρ): <strong>{resultados.rho.toFixed(2)}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Número promedio de clientes en el sistema (L): <strong>{resultados.L.toFixed(2)}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Número promedio de clientes en la cola (Lq): <strong>{resultados.Lq.toFixed(2)}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Tiempo promedio en el sistema (W): <strong>{resultados.W.toFixed(2)} {unidadTiempo}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Tiempo promedio en la cola (Wq): <strong>{resultados.Wq.toFixed(2)} {unidadTiempo}</strong></p>
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
