import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../../components/Cargando';

export function ModeloFuerzaTrabajo() {
  const [numPuestos, setNumPuestos] = useState(3); // Número de puestos
  const [horasTrabajo, setHorasTrabajo] = useState(8); // Horas de trabajo por día
  const [costos, setCostos] = useState([50, 60, 70]); // Costos por hora para cada puesto
  const [eficiencias, setEficiencias] = useState([10, 8, 6]); // Eficiencia de cada puesto (horas de trabajo completadas por persona)
  const [requerimientoTrabajo, setRequerimientoTrabajo] = useState(150); // Requerimiento total de trabajo (en horas)
  const [numEmpleados, setNumEmpleados] = useState([]); // Número de empleados necesario por puesto
  const [mejorCosto, setMejorCosto] = useState(null); // Mejor costo total
  const [resaltados, setResaltados] = useState(false); // Para resaltar los valores

  // Función para manejar el cambio de número de puestos
  const manejarCambioNumPuestos = (e) => {
    const valor = parseInt(e.target.value);
    setNumPuestos(valor);
    setCostos(Array(valor).fill(0));
    setEficiencias(Array(valor).fill(0));
  };

  // Función para manejar el requerimiento total de trabajo
  const manejarCambioRequerimientoTrabajo = (e) => {
    setRequerimientoTrabajo(parseInt(e.target.value));
  };

  // Función para manejar los costos de cada puesto
  const manejarCambioCosto = (index, valor) => {
    const nuevosCostos = [...costos];
    nuevosCostos[index] = parseInt(valor);
    setCostos(nuevosCostos);
  };

  // Función para manejar la eficiencia de cada puesto
  const manejarCambioEficiencia = (index, valor) => {
    const nuevasEficiencias = [...eficiencias];
    nuevasEficiencias[index] = parseInt(valor);
    setEficiencias(nuevasEficiencias);
  };

  // Algoritmo para calcular el número de empleados por puesto y el costo mínimo
  const calcularFuerzaTrabajo = () => {
    const empleados = [];
    let costoTotal = 0;
    
    for (let i = 0; i < numPuestos; i++) {
      const empleadosNecesarios = Math.ceil(requerimientoTrabajo / (eficiencias[i] * horasTrabajo)); 
      empleados.push(empleadosNecesarios);
      costoTotal += empleadosNecesarios * costos[i] * horasTrabajo; // Cálculo del costo total
    }

    setNumEmpleados(empleados);
    setMejorCosto(costoTotal);
    setResaltados(true);
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Número de Puestos
          <Input type="number" value={numPuestos} onChange={manejarCambioNumPuestos} min={1} />
        </Etiqueta>

        <Etiqueta>
          Requerimiento Total de Trabajo (en horas)
          <Input type="number" value={requerimientoTrabajo} onChange={manejarCambioRequerimientoTrabajo} min={1} />
        </Etiqueta>

        <Tabla>
          <thead>
            <tr>
              <th>Puesto</th>
              <th>Costo por Hora</th>
              <th>Eficiencia (Horas por Persona)</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numPuestos }).map((_, index) => (
              <tr key={index}>
                <td>Puesto {index + 1}</td>
                <td>
                  <InputTabla
                    type="number"
                    value={costos[index]}
                    onChange={(e) => manejarCambioCosto(index, e.target.value)}
                  />
                </td>
                <td>
                  <InputTabla
                    type="number"
                    value={eficiencias[index]}
                    onChange={(e) => manejarCambioEficiencia(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Tabla>

        <Boton onClick={calcularFuerzaTrabajo}>Calcular</Boton>
      </FormularioContainer>

      <ResultadosContainer>
        {mejorCosto !== null ? (
          <>
            <Resultados>
              <h3>Resultados</h3>
              <p>El costo total mínimo es <strong>${mejorCosto}</strong>.</p>
              <p>Distribución de empleados por puesto:</p>
              <ul>
                {numEmpleados.map((empleados, index) => (
                  <li key={index}>Puesto {index + 1}: {empleados} empleados</li>
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
