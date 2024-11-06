import React, { useState } from "react";
import styled from "styled-components";
import Cargando from '../../components/Cargando'
import Tarjeta from "../../components/Tarjeta";

export function Lotes() {
  const [tasaProduccionDiaria, setTasaProduccionDiaria] = useState(240);
  const [demandaDiaria, setDemandaDiaria] = useState(104);
  const [costoOrdenar, setCostoOrdenar] = useState(135);
  const [costoMantener, setCostoMantener] = useState(1.08);
  const [diasLaborables, setDiasLaborables] = useState(250); 
  const [tiempoEntrega, setTiempoEntrega] = useState(5);
  const [epq, setEpq] = useState(null);
  const [costoTotal, setCostoTotal] = useState(null);
  const [puntoReorden, setPuntoReorden] = useState(null);
  const [tiempoReorden, setTiempoReorden] = useState(null);

  const calcularEPQ = (e) => {
    e.preventDefault();

    const Q = Math.sqrt((2 * demandaDiaria * diasLaborables * costoOrdenar) / (costoMantener * (1 - demandaDiaria / tasaProduccionDiaria)));
    setEpq(Q);

    const CostoTotal = (1 / 2) * (1 - demandaDiaria / tasaProduccionDiaria) * Q * costoMantener + (demandaDiaria * diasLaborables / Q) * costoOrdenar;
    setCostoTotal(CostoTotal);

    const reorden = demandaDiaria * tiempoEntrega;
    setPuntoReorden(reorden);

    const tiempoReordenCalc = (diasLaborables * Q) / (demandaDiaria * diasLaborables);
    setTiempoReorden(tiempoReordenCalc);
  };

  return (
    <Contenedor>
      <FormularioContainer>
        <form onSubmit={calcularEPQ}>
          <h2>Parámetros de Entrada</h2>
          
          <Etiqueta>
            Tasa de Producción Diaria (p)
            <Input
              type="number"
              value={tasaProduccionDiaria}
              onChange={(e) => setTasaProduccionDiaria(e.target.value)}
              required
            />
          </Etiqueta>
          
          <Etiqueta>
            Demanda Diaria (d)
            <Input
              type="number"
              value={demandaDiaria}
              onChange={(e) => setDemandaDiaria(e.target.value)}
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
            Costo por Mantener Anual (H)
            <Input
              type="number"
              value={costoMantener}
              onChange={(e) => setCostoMantener(e.target.value)}
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
          <Etiqueta>
            Tiempo de Espera (días) (LT)
            <Input
              type="number"
              value={tiempoEntrega}
              onChange={(e) => setTiempoEntrega(e.target.value)}
            />
          </Etiqueta>

          <Boton type="submit">Calcular</Boton>
        </form>
      </FormularioContainer>

      <Resultados>
        {epq !== null ? (
          <ResultadosContainer>
            <Tarjeta titulo="EPQ" valor={epq} simbolo="unidades" />
            <Tarjeta titulo="Costo Total" valor={costoTotal} simbolo="$" />
            <Tarjeta titulo="Punto de Reorden" valor={puntoReorden} simbolo="unidades" />
            <Tarjeta titulo="Tiempo entre Fases" valor={tiempoReorden} simbolo="días" />
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
