import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../../components/Cargando';

export function ModeloInversion() {
  const [numProyectos, setNumProyectos] = useState(3); // Número de proyectos
  const [capitalDisponible, setCapitalDisponible] = useState(10000); // Capital disponible para invertir
  const [costosInversion, setCostosInversion] = useState([3000, 4000, 5000]); // Costos de inversión de cada proyecto
  const [retornosEsperados, setRetornosEsperados] = useState([1500, 2500, 2000]); // Retornos esperados de cada proyecto
  const [proyectosSeleccionados, setProyectosSeleccionados] = useState([]);
  const [maximoRetorno, setMaximoRetorno] = useState(null); // Máximo retorno esperado
  const [resaltados, setResaltados] = useState(false); // Para resaltar los valores seleccionados

  // Función para manejar el cambio en el número de proyectos
  const manejarCambioNumProyectos = (e) => {
    const valor = parseInt(e.target.value);
    setNumProyectos(valor);
    setCostosInversion(Array(valor).fill(0));
    setRetornosEsperados(Array(valor).fill(0));
  };

  // Función para manejar el cambio en el capital disponible
  const manejarCambioCapital = (e) => {
    setCapitalDisponible(parseInt(e.target.value));
  };

  // Función para manejar el costo de inversión de cada proyecto
  const manejarCambioCostoInversion = (index, valor) => {
    const nuevosCostos = [...costosInversion];
    nuevosCostos[index] = parseInt(valor);
    setCostosInversion(nuevosCostos);
  };

  // Función para manejar el retorno esperado de cada proyecto
  const manejarCambioRetornoEsperado = (index, valor) => {
    const nuevosRetornos = [...retornosEsperados];
    nuevosRetornos[index] = parseInt(valor);
    setRetornosEsperados(nuevosRetornos);
  };

  // Función para calcular la mejor distribución de inversión
  const calcularInversion = () => {
    const proyectosViables = [];
    let retornoTotal = 0;
    let capitalRestante = capitalDisponible;

    for (let i = 0; i < numProyectos; i++) {
      if (costosInversion[i] <= capitalRestante) {
        proyectosViables.push(`Proyecto ${i + 1}`);
        retornoTotal += retornosEsperados[i];
        capitalRestante -= costosInversion[i];
      }
    }

    setProyectosSeleccionados(proyectosViables);
    setMaximoRetorno(retornoTotal);
    setResaltados(true);
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Número de Proyectos
          <Input type="number" value={numProyectos} onChange={manejarCambioNumProyectos} min={1} />
        </Etiqueta>

        <Etiqueta>
          Capital Disponible (en $)
          <Input type="number" value={capitalDisponible} onChange={manejarCambioCapital} min={1} />
        </Etiqueta>

        <Tabla>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Costo de Inversión</th>
              <th>Retorno Esperado</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numProyectos }).map((_, index) => (
              <tr key={index}>
                <td>Proyecto {index + 1}</td>
                <td>
                  <InputTabla
                    type="number"
                    value={costosInversion[index]}
                    onChange={(e) => manejarCambioCostoInversion(index, e.target.value)}
                  />
                </td>
                <td>
                  <InputTabla
                    type="number"
                    value={retornosEsperados[index]}
                    onChange={(e) => manejarCambioRetornoEsperado(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>

        <Boton onClick={calcularInversion}>Calcular</Boton>
      </FormularioContainer>

      <ResultadosContainer>
        {maximoRetorno !== null ? (
          <>
            <Resultados>
              <h3>Resultados</h3>
              <p>La mejor distribución de inversión genera un retorno total de <strong>${maximoRetorno}</strong>.</p>
              <p>Proyectos seleccionados para inversión:</p>
              <ul>
                {proyectosSeleccionados.map((proyecto, index) => (
                  <li key={index}>{proyecto}</li>
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
