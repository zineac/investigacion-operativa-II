import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../../components/Cargando'

export function M_M_S_K() {
  const [tasaLlegada, setTasaLlegada] = useState("0.05"); // λ: tasa de llegada
  const [tasaServicio, setTasaServicio] = useState("0.5"); // μ: tasa de servicio
  const [capacidadSistema, setCapacidadSistema] = useState("6"); // N: capacidad del sistema
  const [unidadTiempo, setUnidadTiempo] = useState("horas"); // Unidad de tiempo
  const [nClientes, setNClientes] = useState("3"); // Número específico de clientes para calcular Pn
  const [resultados, setResultados] = useState(null);

  // Función para calcular resultados
  const calcularResultados = () => {
    const λ = parseFloat(tasaLlegada);
    const μ = parseFloat(tasaServicio);
    const N = parseInt(capacidadSistema);
    const n = parseInt(nClientes);

    if (λ <= 0 || μ <= 0 || N <= 0 || n < 0 || n > N) {
      setResultados("Por favor, ingresa valores válidos.");
      return;
    }

    // Fórmula para P0 (probabilidad de que el sistema esté vacío)
    let sumatoria = 0;
    for (let k = 0; k <= N; k++) {
      sumatoria += (factorial(N) / factorial(N - k)) * Math.pow(λ / μ, k);
    }
    const P0 = 1 / sumatoria;

    // Fórmula para Pn (probabilidad de que haya exactamente n clientes en el sistema)
    const Pn = (factorial(N) / factorial(N - n)) * Math.pow(λ / μ, n) * P0;

    // Fórmula para Lq (número promedio de clientes en la cola)
    const Lq = N - ((λ + μ)/λ)*(1-P0)

    // Fórmula para L (número promedio de clientes en el sistema)
    const L = Lq + (1 - P0);

    // Fórmula para Wq (tiempo promedio en cola)
    const Wq = Lq / (λ * (N - L));

    // Fórmula para W (tiempo promedio en el sistema)
    const W = Wq + 1 / μ;

    // Fórmula para Pw (probabilidad de que un cliente tenga que esperar)
    const Pw = 1 - P0;

    setResultados({
      P0,
      Pn,
      Lq,
      L,
      Wq,
      W,
      Pw,
    });
  };

  // Helpers para manejar entradas
  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleInputBlur = (setter) => (e) => setter(e.target.value.trim());

  // Función factorial
  const factorial = (num) => (num === 0 ? 1 : num * factorial(num - 1));

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
          Capacidad del Sistema (K)
          <Input
            type="text"
            value={capacidadSistema}
            onChange={handleInputChange(setCapacidadSistema)}
            onBlur={handleInputBlur(setCapacidadSistema)}
          />
        </Etiqueta>

        <Etiqueta>
          Clientes Específicos (n)
          <Input
            type="text"
            value={nClientes}
            onChange={handleInputChange(setNClientes)}
            onBlur={handleInputBlur(setNClientes)}
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
                <p>Probabilidad de que el sistema esté vacío (P0): <strong>{resultados.P0.toFixed(4)}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Número promedio en la cola (Lq): <strong>{resultados.Lq.toFixed(2)}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Número promedio en el sistema (L): <strong>{resultados.L.toFixed(2)}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Probabilidad de espera (Pw): <strong>{resultados.Pw.toFixed(4)}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Tiempo promedio en cola (Wq): <strong>{resultados.Wq.toFixed(4)} {unidadTiempo}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Tiempo promedio en el sistema (W): <strong>{resultados.W.toFixed(4)} {unidadTiempo}</strong></p>
              </ResultadoBox>
              <ResultadoBox>
                <p>Probabilidad de exactamente {nClientes} clientes (Pn): <strong>{resultados.Pn.toFixed(4)}</strong></p>
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
