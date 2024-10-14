import React, { useState } from "react";
import styled from "styled-components";
import Cargando from "../components/Cargando.jsx";
import { calcularRutaCritica } from "../utils/rutaCritica.js";

export function PERT() {
  const [filas, setFilas] = useState(8);
  const [datos, setDatos] = useState([
    {
      actividad: "A",
      optimista: 1,
      probable: 2,
      pesimista: 3,
      predecesores: []
    },
    {
      actividad: "B",
      optimista: 1,
      probable: 2,
      pesimista: 3,
      predecesores: ["A"]
    },
    {
      actividad: "C",
      optimista: 1,
      probable: 1,
      pesimista: 1,
      predecesores: ["A"]
    },
    {
      actividad: "D",
      optimista: 1,
      probable: 2,
      pesimista: 3,
      predecesores: ["B", "C"]
    },
    {
      actividad: "E",
      optimista: 2,
      probable: 3,
      pesimista: 4,
      predecesores: ["D"]
    },
    {
      actividad: "F",
      optimista: 1,
      probable: 1,
      pesimista: 1,
      predecesores: ["D"]
    },
    {
      actividad: "G",
      optimista: 2,
      probable: 2,
      pesimista: 2,
      predecesores: ["D"]
    },
    {
      actividad: "H",
      optimista: 1,
      probable: 1,
      pesimista: 1,
      predecesores: ["E", "F", "G"]
    }
  ]);

  const [resultados, setResultados] = useState([]);
  const [rutaCritica, setRutaCritica] = useState([]);
  const [desviacionEstandarCritica, setDesviacionEstandarCritica] = useState(0);
  const [duracionTotal, setDuracionTotal] = useState(0);

  const manejarCambioFilas = (e) => {
    const nuevasFilas = parseInt(e.target.value);
    setFilas(nuevasFilas);
    setDatos(
      Array.from({ length: nuevasFilas }, (_, i) => ({
        actividad: (i + 1).toString(), // Números secuenciales
        optimista: 0,
        probable: 0,
        pesimista: 0,
        predecesores: [],
      }))
    );
    setResultados([]);
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

  const calcularPERT = (e) => {
    e.preventDefault();
    console.log(datos);

    // Calcular tiempo esperado, varianza y desviación estándar
    const nuevosResultados = datos.map((fila) => {
      const tiempo = ((fila.optimista + 4 * fila.probable + fila.pesimista) / 6).toFixed(2);
      const varianza = (Math.pow((fila.pesimista - fila.optimista) / 6, 2)).toFixed(2);
      const desviacion = ((fila.pesimista - fila.optimista) / 6).toFixed(2);
      return { tiempoEsperado: tiempo, varianza, desviacionEstandar: desviacion };
    });
    setResultados(nuevosResultados);  
    const { rutaCritica, duracionTotal } = calcularRutaCritica(datos);
    setRutaCritica(rutaCritica);
    setDuracionTotal(duracionTotal);

    // Calcular la desviación estándar de la ruta crítica
    const sumaVarianzasRutaCritica = rutaCritica.reduce((acumulado, actividad) => {
      const actividadData = datos.find((dato) => dato.actividad === actividad);
      return acumulado + parseFloat(
        Math.pow((actividadData.pesimista - actividadData.optimista) / 6, 2)
      );
    }, 0);
    
    const desviacionEstandarRutaCritica = Math.sqrt(sumaVarianzasRutaCritica).toFixed(2);
    setDesviacionEstandarCritica(desviacionEstandarRutaCritica);
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

        <form onSubmit={calcularPERT}>
          <Tabla>
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Optimista</th>
                <th>Más Probable</th>
                <th>Pesimista</th>
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
                      value={fila.optimista}
                      onChange={(e) =>
                        manejarCambioDato(index, "optimista", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <InputTabla
                      type="number"
                      value={fila.probable}
                      onChange={(e) =>
                        manejarCambioDato(index, "probable", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <InputTabla
                      type="number"
                      value={fila.pesimista}
                      onChange={(e) =>
                        manejarCambioDato(index, "pesimista", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <InputTabla
                      type="text"
                      value={fila.predecesores.join(", ")} // Mostrar como cadena
                      onChange={(e) =>
                        manejarCambioDato(index, "predecesores", e.target.value)
                      }
                      placeholder="Ej. 1, 2"
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
        {resultados.length > 0 ? (
          <Resultados>
            <h2>Resultados</h2>
            <TablaResultados>
              <thead>
                <tr>
                  <th>Tiempo Esperado</th>
                  <th>Varianza</th>
                  <th>Desviación Estándar</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((resultado, index) => (
                  <tr key={index}>
                    <td>{resultado.tiempoEsperado}</td>
                    <td>{resultado.varianza}</td>
                    <td>{resultado.desviacionEstandar}</td>
                  </tr>
                ))}
              </tbody>
            </TablaResultados>

            <ContenedorTarjetas>
              <Tarjeta>
                <h3>Ruta Crítica</h3>
                <div>
                  {rutaCritica.map((actividad, index) => (
                    <span key={index}>
                      {actividad}
                      {index < rutaCritica.length - 1 && ' → '}
                    </span>
                  ))}
                </div>
              </Tarjeta>

              <Tarjeta>
                <h3>Desviación Estándar</h3>
                <p>{desviacionEstandarCritica} unidades</p>
              </Tarjeta>
              <Tarjeta>
                <h3>Duración Total</h3>
                <div>
                  <p>{duracionTotal}</p>
                </div>
              </Tarjeta>
            </ContenedorTarjetas>


          </Resultados>
        ) : (
          <Cargando />
        )}
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


const TablaResultados = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background-color: #495057;
    color: #f8f9fa;
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid #6c757d;
    font-weight: bold;
    font-size: 0.9em;
  }

  td {
    color: #f8f9fa;
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #6c757d;
    font-size: 0.9em;
  }

  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px;
  min-height: 710px;
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

const Resultados = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

