import React, { useState } from "react";
import styled from "styled-components";
import Cargando from "../components/Cargando";
import Tarjeta from "../components/Tarjeta";

export function Faltantes() {
  const [demanda, setDemanda] = useState(2000);
  const [costoOrdenar, setCostoOrdenar] = useState(25);
  const [costoMantener, setCostoMantener] = useState(10);
  const [costoFaltante, setCostoFaltante] = useState(30);
  const [diasLaborables, setDiasLaborables] = useState(250);
  const [cantidadOptima, setCantidadOptima] = useState(null);
  const [nivelMaximoInventario, setNivelMaximoInventario] = useState(null);
  const [pedidosEspera, setPedidosEspera] = useState(null);
  const [costoTotal, setCostoTotal] = useState(null);

  const calcularFaltantes = (e) => {
    e.preventDefault();
  
    // Cálculo de Q* (Cantidad óptima de pedido)
    const cantidadOptimaCalculada = Math.sqrt(
      (2 * demanda * costoOrdenar) / costoMantener * ((costoMantener + costoFaltante) / costoFaltante)
    );
  
    // Cálculo de Imax (Nivel Máximo de Inventario)
    const nivelMaximoInventarioCalculado = cantidadOptimaCalculada * (costoFaltante / (costoMantener + costoFaltante));
  
    // Cálculo de S* (Pedidos en Espera)
    const pedidosEsperaCalculado = cantidadOptimaCalculada - nivelMaximoInventarioCalculado;
  
    // Cálculo del Costo Total (CT)
    const costoTotalCalculado = 
    (demanda / cantidadOptimaCalculada) * costoOrdenar + 
    ((cantidadOptimaCalculada - pedidosEsperaCalculado) ** 2 / (2 * cantidadOptimaCalculada)) * costoMantener + 
    ((pedidosEsperaCalculado ** 2) / (2 * cantidadOptimaCalculada)) * costoFaltante;
  
    // Seteamos los resultados en los estados
    setCantidadOptima(cantidadOptimaCalculada);
    setNivelMaximoInventario(nivelMaximoInventarioCalculado);
    setPedidosEspera(pedidosEsperaCalculado);
    setCostoTotal(costoTotalCalculado);
  };  
  
  return (
    <Contenedor>
      <FormularioContainer>
        <form onSubmit={calcularFaltantes}>
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
            Costo por Mantener (H)
            <Input
              type="number"
              value={costoMantener}
              onChange={(e) => setCostoMantener(e.target.value)}
              required
            />
          </Etiqueta>

          <Etiqueta>
            Costo por Faltante (B)
            <Input
              type="number"
              value={costoFaltante}
              onChange={(e) => setCostoFaltante(e.target.value)}
              required
            />
          </Etiqueta>

          <Etiqueta>
            Días Laborables al Año (W)
            <Input
              type="number"
              value={diasLaborables}
              onChange={(e) => setDiasLaborables(e.target.value)}
              required
            />
          </Etiqueta>

          <Boton type="submit">Calcular</Boton>
        </form>
      </FormularioContainer>

      <Resultados>
        {cantidadOptima ? (
          <ResultadosContainer>
            <Tarjeta titulo="Cantidad Óptima (Q*)" valor={cantidadOptima} simbolo="unidades" />
            <Tarjeta titulo="Cantidad Óptima (S*)" valor={pedidosEspera} simbolo="unidades" />
            <Tarjeta titulo="Nivel Máximo de Inventario (Imax)" valor={nivelMaximoInventario} simbolo="unidades" />
            <Tarjeta titulo="Costo Total (incluyendo unidades)" valor={costoTotal} simbolo="$" />
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

const Boton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
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
`;
