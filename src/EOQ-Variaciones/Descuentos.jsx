import React, { useState } from "react";
import styled from "styled-components";
import Tarjeta from "../components/Tarjeta"; // Asegúrate de que esta ruta sea correcta
import Cargando from "../components/Cargando";

export function Descuentos() {
  const [demanda, setDemanda] = useState(5000);
  const [costoOrdenar, setCostoOrdenar] = useState(49);
  const [tasaRetencion, setTasaRetencion] = useState(20); // Tasa de retención anual única
  const [costoTotal, setCostoTotal] = useState(null);
  const [cantidadOptima, setCantidadOptima] = useState(null);

  // Tabla de categorías de descuentos
  const [categorias, setCategorias] = useState([
    { rangoMin: 0, rangoMax: 999, descuento: 0, costoUnitario: 5.00, modificado: false, res: 0 },
    { rangoMin: 1000, rangoMax: 2499, descuento: 3, costoUnitario: 4.85, modificado: false, res: 0 },
    { rangoMin: 2500, rangoMax: Infinity, descuento: 5, costoUnitario: 4.75, modificado: false, res:0 },
  ]);

  const calcularDescuentos = (e) => {
    e.preventDefault();
    let minCostoTotal = Infinity;
    let mejorCantidad = null;

    for (const categoria of categorias) {
      const { costoUnitario } = categoria;
      const Ch = (tasaRetencion / 100) * costoUnitario; // Costo de mantener
      const Q = Math.sqrt((2 * demanda * costoOrdenar) / Ch);
    
      // Si Q es menor que el rango mínimo, continuar con la siguiente categoría
      if (Q < categoria.rangoMin) {
        categoria.modificado = true;
      }
    
      const cantidadAjustada = Math.max(Q, categoria.rangoMin);
      categoria.res = cantidadAjustada;
    
      // Calcular el costo total
      const costoTotalCalculado = (cantidadAjustada / 2) * Ch + (demanda / cantidadAjustada) * costoOrdenar + (demanda * costoUnitario);
    
      if (costoTotalCalculado < minCostoTotal) {
        minCostoTotal = costoTotalCalculado;
        mejorCantidad = cantidadAjustada;
      }
    }
    

    setCostoTotal(minCostoTotal);
    setCantidadOptima(mejorCantidad);
  };

  const handleCategoriaChange = (index, field, value) => {
    const updatedCategorias = [...categorias];
    updatedCategorias[index][field] = value;
    setCategorias(updatedCategorias);
  };

  const agregarCategoria = () => {
    const nuevaCategoria = { rangoMin: 0, rangoMax: 0, descuento: 0, costoUnitario: 0 };
    setCategorias([...categorias, nuevaCategoria]);
  };

  return (
    <Contenedor>
      <FormularioContainer>
        <form onSubmit={calcularDescuentos}>
          <h2>Parámetros de Entrada</h2>

          <Etiqueta>
            Demanda Anual (D)
            <Input
              type="number"
              value={demanda}
              onChange={(e) => setDemanda(e.target.value)}
              required
            />
          </Etiqueta>

          <Etiqueta>
            Costo por Ordenar (S)
            <Input
              type="number"
              value={costoOrdenar}
              onChange={(e) => setCostoOrdenar(e.target.value)}
              required
            />
          </Etiqueta>

          <Etiqueta>
            Tasa de Retención Anual (I) (%)
            <Input
              type="number"
              value={tasaRetencion}
              onChange={(e) => setTasaRetencion(e.target.value)}
              required
            />
          </Etiqueta>

          <ContenedorTabla>
            <h2>Tabla de Categorias</h2>
            <BotonAdd type="button" onClick={agregarCategoria}>Añadir</BotonAdd>
          </ContenedorTabla>

          <Tabla>
            <thead>
              <tr>
                <th>Rango Min</th>
                <th>Rango Max</th>
                <th>Descuento (%)</th>
                <th>Costo Unitario</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria, index) => (
                <tr key={index}>
                  <td>
                    <Input
                      type="number"
                      value={categoria.rangoMin}
                      onChange={(e) => handleCategoriaChange(index, 'rangoMin', Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={categoria.rangoMax}
                      onChange={(e) => handleCategoriaChange(index, 'rangoMax', Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={categoria.descuento}
                      onChange={(e) => handleCategoriaChange(index, 'descuento', Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={categoria.costoUnitario}
                      onChange={(e) => handleCategoriaChange(index, 'costoUnitario', Number(e.target.value))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Tabla>

          <Boton type="submit">Calcular</Boton>
        </form>
      </FormularioContainer>

      <Resultados>
        {cantidadOptima ? (
          <ResultadosContainer>
            <h2>Resultados por Categoría</h2>
            {categorias.map((categoria, index) => (
              <Tarjeta
                key={index}
                titulo={`Q${index + 1} ${categoria.modificado ? "se modifico" : "no se modifico"}`}
                valor={categoria.res}
                simbolo="unidades"
              />
            ))}
          
            <h2>Resultados Óptimos</h2>
            <Tarjeta titulo="Cantidad Óptima" valor={cantidadOptima} simbolo="unidades" />
            <Tarjeta titulo="Costo Total" valor={costoTotal} simbolo="$" />
          </ResultadosContainer>        
        ) : (
          <Cargando />
        )}
      </Resultados>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
  height: 100%;
  width: 100%;
`;

const FormularioContainer = styled.div`
  flex: 1;
  margin-right: 20px;

  form {
    padding: 25px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    height: auto;
  }
`;

const ContenedorTabla = styled.div`
  display: flex;
  align-items: center; /* Alinear verticalmente el título y el botón */
  margin-top: 20px; /* Añadir espacio entre los parámetros y la tabla */
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
  max-width: 100px; /* Ajustar ancho máximo según sea necesario */
`;

const Boton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px; /* Espacio entre el título y el botón */
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Resultados = styled.div`
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
  height: auto;
`;

const ResultadosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
`;

const BotonAdd = styled.button`
  padding: 5px 10px; /* Reduce el padding */
  font-size: 0.8em; /* Reduce el tamaño de la fuente */
  color: white;
  background-color: #6a4c93; /* Color morado tenue */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px; /* Espacio entre el título y el botón */
  transition: background-color 0.3s;

  &:hover {
    background-color: #9472b0; /* Color morado más oscuro y tenue para el hover */
  }
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0 18px 0;

  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #6a4c93; /* Color morado tenue para la cabecera */
    color: white;
  }

  tr {
    background-color: #ffffff; /* Color blanco para todas las filas */
  }
`;

