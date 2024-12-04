import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../../components/Cargando'

export function M_M_C() {
  const [tasaLlegada, setTasaLlegada] = useState("81"); // λ: tasa de llegada
  const [tasaServicio, setTasaServicio] = useState("30"); // μ: tasa de servicio
  const [numServidores, setNumServidores] = useState("3"); // c: número de servidores
  const [unidadTiempo, setUnidadTiempo] = useState("horas"); // Unidad de tiempo
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
    const c = parseInt(numServidores);

    if (mu > 0 && lambda > 0 && c > 0) {
      const rho = lambda / (c * mu); // Utilización promedio por servidor
      if (rho >= 1) {
        setResultados("Error: La tasa de llegada debe ser menor que la tasa de servicio multiplicada por el número de servidores.");
        return;
      }

      const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
      
      // Probabilidad de que el sistema esté vacío (P0)
      let P0 = 0;
      for (let n = 0; n < c; n++) {
        P0 += (Math.pow(lambda / mu, n) / factorial(n));
      }
      P0 += (Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho)));
      P0 = 1 / P0;

      // Número promedio de clientes en la cola (Lq)
      const Lq = (P0 * Math.pow(lambda / mu, c) * rho) / (factorial(c) * Math.pow(1 - rho, 2));

      // Número promedio de clientes en el sistema (L)
      const L = Lq + lambda / mu;

      // Tiempo promedio en el sistema (W)
      const W = L / lambda;

      // Tiempo promedio en la cola (Wq)
      const Wq = Lq / lambda;

      setResultados({
        rho,
        P0,
        L,
        Lq,
        W,
        Wq,
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
              <ResultadoBox>
                <p>Utilización del sistema (ρ): <strong>{resultados.rho.toFixed(2)}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Probabilidad de que el sistema esté vacío (P0): <strong>{resultados.P0.toFixed(2)}</strong></p>
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
