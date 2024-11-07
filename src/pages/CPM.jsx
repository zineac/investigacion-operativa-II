import React, { useState } from "react";
import styled from "styled-components";
import { calcularRC } from "../utils/RC";  // Asegúrate de tener esta función actualizada
import Cargando from "../components/Cargando";
import Nodo from "../components/Nodo";

export function CPM() {
  const [filas, setFilas] = useState(6);
  const [datos, setDatos] = useState([
    { actividad: "A", tiempoEsperado: 2, predecesores: [] },
    { actividad: "B", tiempoEsperado: 5, predecesores: [] },
    { actividad: "C", tiempoEsperado: 8, predecesores: ["A"] },
    { actividad: "D", tiempoEsperado: 7, predecesores: ["B"] },
    { actividad: "E", tiempoEsperado: 3, predecesores: ["B"] },
    { actividad: "F", tiempoEsperado: 6, predecesores: ["E", "D"] }
  ]);

  const [rutaCritica, setRutaCritica] = useState([]);
  const [duracionTotal, setDuracionTotal] = useState(0);

  const manejarCambioFilas = (e) => {
    const nuevasFilas = parseInt(e.target.value);
    setFilas(nuevasFilas);
    setDatos(
      Array.from({ length: nuevasFilas }, (_, i) => ({
        actividad: (i + 1).toString(),
        tiempoEsperado: 0,
        predecesores: [],
      }))
    );
  };

  const manejarCambioDato = (index, campo, valor) => {
    const nuevosDatos = [...datos];
    if (campo === "predecesores") {
      nuevosDatos[index][campo] = valor.split(",").map((item) => item.trim());
    } else {
      nuevosDatos[index][campo] = valor;
    }
    setDatos(nuevosDatos);
  };

  const calcularCPM = (e) => {
    e.preventDefault();
    const { rutaCritica, duracionTotal } = calcularRC(datos);
    setRutaCritica(rutaCritica);
    setDuracionTotal(duracionTotal);
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Número de Filas
          <Input
            type="number"
            value={filas}
            onChange={manejarCambioFilas}
            min={1}
            required
          />
        </Etiqueta>

        <form onSubmit={calcularCPM}>
          <Tabla>
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Tiempo Esperado</th>
                <th>Predecesores</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((fila, index) => (
                <tr key={index}>
                  <td>
                    <InputTabla
                      type="text"
                      value={fila.actividad}
                      onChange={(e) =>
                        manejarCambioDato(index, "actividad", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <InputTabla
                      type="number"
                      value={fila.tiempoEsperado}
                      onChange={(e) =>
                        manejarCambioDato(index, "tiempoEsperado", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <InputTabla
                      type="text"
                      value={fila.predecesores.join(", ")}
                      onChange={(e) =>
                        manejarCambioDato(index, "predecesores", e.target.value)
                      }
                      placeholder="Ej. A, B"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Tabla>
          <Boton type="submit">Calcular</Boton>
        </form>
      </FormularioContainer>

      <ResultadosContainer>
        {rutaCritica.length > 0 ? (
          <Resultados>
            <h2>Resultados</h2>
            <Nodo datos={datos} />
            <ContenedorTarjetas>
              <Tarjeta>
                <h3>Ruta Crítica</h3>
                <div>
                  {rutaCritica.map((actividad, index) => (
                    <span key={index}>
                      {actividad}
                      {index < rutaCritica.length - 1 && " → "}
                    </span>
                  ))}
                </div>
              </Tarjeta>
              <Tarjeta>
                <h3>Duración Total</h3>
                <div>
                  <p>{duracionTotal}</p>
                </div>
              </Tarjeta>
            </ContenedorTarjetas>
          </Resultados>
        ) : <Cargando />}
      </ResultadosContainer>
    </Container>
  );
}


const ContenedorTarjetas = styled.div`
  display: flex;
  gap: 20px;  // Espacio entre las tarjetas
  justify-content: space-between;  // Distribuir las tarjetas
  align-items: flex-start;  // Alinear las tarjetas en la parte superior
`;

const Tarjeta = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;  // Hacer que las tarjetas ocupen el mismo ancho
  max-width: 300px;
  text-align: center;
  height: 100%;

  h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
    color: #343a40;
  }

  div {
    font-size: 1.1em;
    color: #495057;
  }

  p {
    font-size: 1.1em;
    font-weight: bold;
    color: #007bff;
  }
`;


const Resultados = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
  font-family: 'Roboto', sans-serif;
  color: #495057;
`;

const FormularioContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.15);
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
  justify-content: center;
  align-items: center;
  box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.15);
`;

const Etiqueta = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #343a40;
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
