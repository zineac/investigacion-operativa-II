import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../../components/Cargando';

export function ModeloReemplazoEquipo() {
  const [vidaUtil, setVidaUtil] = useState(5); // Vida útil en años
  const [costoAdquisicion, setCostoAdquisicion] = useState(10000); // Costo de adquisición del equipo nuevo
  const [costoMantenimiento, setCostoMantenimiento] = useState([500, 600, 700, 800, 900]); // Costo de mantenimiento del equipo por cada año
  const [valorRescate, setValorRescate] = useState(2000); // Valor de rescate del equipo viejo
  const [costosTotales, setCostosTotales] = useState([]);
  const [mejorAno, setMejorAno] = useState(null);
  const [resaltados, setResaltados] = useState(false);

  // Función para manejar el cambio en la vida útil del equipo
  const manejarCambioVidaUtil = (e) => {
    const valor = parseInt(e.target.value);
    setVidaUtil(valor);
    setCostoMantenimiento(Array(valor).fill(0));
  };

  // Función para manejar el cambio en el costo de adquisición
  const manejarCambioCostoAdquisicion = (e) => {
    setCostoAdquisicion(parseInt(e.target.value));
  };

  // Función para manejar los costos de mantenimiento de cada año
  const manejarCambioCostoMantenimiento = (index, valor) => {
    const nuevosCostos = [...costoMantenimiento];
    nuevosCostos[index] = parseInt(valor);
    setCostoMantenimiento(nuevosCostos);
  };

  // Función para manejar el valor de rescate
  const manejarCambioValorRescate = (e) => {
    setValorRescate(parseInt(e.target.value));
  };

  // Función para calcular los costos totales de mantener el equipo y los costos de reemplazo
  const calcularReemplazoEquipo = () => {
    const costosPorAno = [];

    for (let ano = 0; ano < vidaUtil; ano++) {
      const costoTotalMantener = costoMantenimiento.slice(0, ano + 1).reduce((acc, curr) => acc + curr, 0);
      const costoTotalReemplazo = costoAdquisicion + costoMantenimiento[ano] - valorRescate;

      costosPorAno.push({
        ano: ano + 1,
        costoMantener: costoTotalMantener,
        costoReemplazo: costoTotalReemplazo
      });
    }

    const mejorAnoIndex = costosPorAno.findIndex(
      (valor) => valor.costoReemplazo <= valor.costoMantener
    );
    setCostosTotales(costosPorAno);
    setMejorAno(mejorAnoIndex + 1);
    setResaltados(true);
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Vida útil del equipo (años)
          <Input type="number" value={vidaUtil} onChange={manejarCambioVidaUtil} min={1} />
        </Etiqueta>

        <Etiqueta>
          Costo de Adquisición del nuevo equipo
          <Input type="number" value={costoAdquisicion} onChange={manejarCambioCostoAdquisicion} min={1} />
        </Etiqueta>

        <Etiqueta>
          Valor de rescate del equipo viejo
          <Input type="number" value={valorRescate} onChange={manejarCambioValorRescate} min={0} />
        </Etiqueta>

        <Tabla>
          <thead>
            <tr>
              <th>Año</th>
              <th>Costo de Mantenimiento</th>
              <th>Costo Total de Mantener</th>
              <th>Costo Total de Reemplazo</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: vidaUtil }).map((_, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <InputTabla
                    type="number"
                    value={costoMantenimiento[index]}
                    onChange={(e) => manejarCambioCostoMantenimiento(index, e.target.value)}
                  />
                </td>
                <td>{costoMantenimiento.slice(0, index + 1).reduce((acc, curr) => acc + curr, 0)}</td>
                <td>
                  {costoAdquisicion + costoMantenimiento[index] - valorRescate}
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>

        <Boton onClick={calcularReemplazoEquipo}>Calcular</Boton>
      </FormularioContainer>

      <ResultadosContainer>
        {costosTotales.length > 0 ? (
          <>
            <Resultados>
              <h3>Resultados</h3>
              <p>El mejor año para reemplazar el equipo es el <strong>Año {mejorAno}</strong>.</p>
              <p>Costos Totales por Año:</p>
              <ul>
                {costosTotales.map((valor, index) => (
                  <li key={index}>
                    Año {valor.ano}: Mantener = ${valor.costoMantener}, Reemplazar = ${valor.costoReemplazo}
                  </li>
                ))}
              </ul>
            </Resultados>
          </>
        ) : <Cargando />}
      </ResultadosContainer>
    </Container>
  );
}

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
  gap: 20px;
  background-color: #343a40;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const InputTabla = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
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

const Resultados = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  text-align: center;
  color: #343a40;
`;
