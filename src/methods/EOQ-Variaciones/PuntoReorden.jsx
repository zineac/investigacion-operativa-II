import React, { useState } from "react";
import styled from "styled-components"; // Asegúrate de tener esta dependencia instalada
import { inversaDistribucionNormal } from "../../utils/probabilidadInversa"; // Asegúrate de que la ruta sea correcta
import Cargando from '../../components/Cargando'
import Tarjeta from "../../components/Tarjeta";

export function PuntoReorden() {
  const [demandaMediaEspera, setDemandaMediaEspera] = useState(154);
  const [costoOrdenar, setCostoOrdenar] = useState(12);
  const [costoMantener, setCostoMantener] = useState(1.2);
  const [diasLaborables, setDiasLaborables] = useState(250);
  const [desviacionEstandar, setDesviacionEstandar] = useState(25);
  const [nivelServicio, setNivelServicio] = useState(95); // Porcentaje
  const [eoq, setEoq] = useState(null);
  const [costoTotal, setCostoTotal] = useState(null);
  const [puntoReorden, setPuntoReorden] = useState(null);
  const [tiempoReorden, setTiempoReorden] = useState(null);

  const calcularEOQ = (e) => {
    e.preventDefault();

    // Convertir el porcentaje de nivel de servicio a decimal
    const z = inversaDistribucionNormal(nivelServicio / 100);
    console.log(z)

    // Calcular la demanda anual
    const demandaAnual = demandaMediaEspera * 52; // 52 semanas en un año

    // Cálculo EOQ
    const Q = Math.sqrt((2 * demandaAnual * costoOrdenar) / costoMantener);
    setEoq(Q);

    // Cálculo del punto de reorden considerando el stock de seguridad
    const reorden = demandaMediaEspera + z * desviacionEstandar;
    setPuntoReorden(reorden);

    // Cálculo Costo Total
    const costoTotalCalc = ((Q * costoMantener) / 2) + ((costoOrdenar * demandaAnual) / Q) + (reorden - demandaMediaEspera) * costoMantener;
    setCostoTotal(costoTotalCalc);

    // Cálculo del tiempo de reorden
    const tiempoReordenCalc = Q / (demandaAnual / diasLaborables);
    setTiempoReorden(tiempoReordenCalc);
  };

  return (
    <Contenedor>
      <FormularioContainer>
        <form onSubmit={calcularEOQ}>
          <h2>Parámetros de Entrada</h2>
          <Etiqueta>
            Demanda Media (Semanas)
            <Input
              type="number"
              value={demandaMediaEspera}
              onChange={(e) => setDemandaMediaEspera(e.target.value)}
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
            Desviación Estándar
            <Input
              type="number"
              value={desviacionEstandar}
              onChange={(e) => setDesviacionEstandar(e.target.value)}
            />
          </Etiqueta>
          <Etiqueta>
            Nivel de Servicio (%)
            <Input
              type="number"
              value={nivelServicio}
              onChange={(e) => setNivelServicio(e.target.value)}
              required
            />
          </Etiqueta>
          <Boton type="submit">Calcular</Boton>
        </form>
      </FormularioContainer>

      <Resultados>
        {eoq ? (
          <ResultadosContainer>
            <Tarjeta titulo="EOQ" valor={eoq} simbolo="unidades" />
            <Tarjeta titulo="Costo Total" valor={costoTotal} simbolo="$" />
            <Tarjeta titulo="Punto de Reorden" valor={puntoReorden} simbolo="unidades" />
            <Tarjeta titulo="Tiempo de Ciclo" valor={tiempoReorden} simbolo="días" />
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
