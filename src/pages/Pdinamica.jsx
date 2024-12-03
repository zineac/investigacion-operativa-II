import React, { useState } from "react";
import styled from "styled-components";
import  {ModeloInversion}  from "../methods/extrasPdinamica/ModeloInversion";
import { DistribucionCientificos }  from "../methods/extrasPdinamica/DistribucionCientificos";
import { DistribucionBrigadas } from "../methods/extrasPdinamica/DistribucionBrigadas";
import  {ModeloReemplazoEquipo} from "../methods/extrasPdinamica/ModeloReemplazoEquipo";
import  {WyndorGlass}  from "../methods/extrasPdinamica/WyndorGlass";
import  ProgramacionDinamica  from "../methods/extrasPdinamica/ProgramacionDinamica";
import  {NivelEmpleados} from "../methods/extrasPdinamica/NivelEmpleados";
import  {HolgurasRechazos}  from "../methods/extrasPdinamica/HolgurasRechazos";
import  {ModeloFuerzaTrabajo}  from "../methods/extrasPdinamica/ModeloFuerzaTrabajo";
import  {ModeloMochila}  from "../methods/extrasPdinamica/ModeloMochila";

const modelos = [
  { id: 1, nombre: "Modelo de Inversión" },
  { id: 2, nombre: "Distribución de Científicos entre Grupos de Investigación" },
  { id: 3, nombre: "Distribución de Brigadas Médicas entre Países" },
  { id: 4, nombre: "Modelo de Reemplazo de Equipo" },
  { id: 5, nombre: "Problema de la Wyndor Glass Company" },
  //{ id: 6, nombre: "Programación Dinámica Probabilística Ganadora en Las Vegas" },
  { id: 7, nombre: "Programación del Nivel de Empleados" },
  //{ id: 8, nombre: "Determinación de Holguras por Rechazos" },
  { id: 9, nombre: "Modelo de Tamaño de la Fuerza de Trabajo" },
  { id: 10, nombre: "Modelo de la Mochila/Equipo de Vuelo/Carga de Contenedor" },
];

export function Pdinamica() {
  const [modeloSeleccionado, setModeloSeleccionado] = useState(1);

  const manejarCambioModelo = (id) => {
    setModeloSeleccionado(id);
  };

  return (
    <ContenedorPrincipal>
      <BarraWrapper>
        {modelos.map((modelo) => (
          <BotonModelo
            key={modelo.id}
            onClick={() => manejarCambioModelo(modelo.id)}
            seleccionado={modeloSeleccionado === modelo.id}
          >
            {modelo.nombre}
          </BotonModelo>
        ))}
      </BarraWrapper>
      <ContenidoWrapper>
        {modeloSeleccionado === 1 && <ModeloInversion />}
        {modeloSeleccionado === 2 && <DistribucionCientificos />}
        {modeloSeleccionado === 3 && <DistribucionBrigadas />}
        {modeloSeleccionado === 4 && <ModeloReemplazoEquipo />}
        {modeloSeleccionado === 5 && <WyndorGlass />}
        {modeloSeleccionado === 6 && <ProgramacionDinamica />}
        {modeloSeleccionado === 7 && <NivelEmpleados />}
        {modeloSeleccionado === 8 && <HolgurasRechazos />}
        {modeloSeleccionado === 9 && <ModeloFuerzaTrabajo />}
        {modeloSeleccionado === 10 && <ModeloMochila />}
      </ContenidoWrapper>
    </ContenedorPrincipal>
  );
}

const ContenedorPrincipal = styled.div`
  padding: 10px;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
`;

const BarraWrapper = styled.div`
  margin: 20px 0 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const BotonModelo = styled.button`
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: ${({ seleccionado }) => (seleccionado ? "#007bff" : "transparent")};
  color: ${({ seleccionado }) => (seleccionado ? "white" : "black")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ddd;
  }
`;

const ContenidoWrapper = styled.div`
  height: 100%;
`;
