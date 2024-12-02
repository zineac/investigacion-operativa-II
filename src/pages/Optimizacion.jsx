import React, { useState } from "react";
import styled from "styled-components";
import { ProgramacionCuadratica } from "../methods/Optimizacion/ProgramacionCuadratica";
import { ProgramacionConvexa } from "../methods/Optimizacion/ProgramacionConvexa";
import { ProgramacionGeometrica } from "../methods/Optimizacion/ProgramacionGeometrica";
import { ProgramacionNoConvexa } from "../methods/Optimizacion/ProgramacionNoConvexa";
import { ProgramacionFraccional } from "../methods/Optimizacion/ProgramacionFraccional";
import { ProgramacionSeparable } from "../methods/Optimizacion/ProgramacionSeparable";
import { OptimizacionNoRestringida } from "../methods/Optimizacion/OptimizacionNoRestringida";

const metodosOptimizacion = [
  { id: 1, nombre: "Programación Cuadrática" },
  { id: 2, nombre: "Programación Convexa" },
  { id: 3, nombre: "Programación Geométrica" },
  { id: 4, nombre: "Programación No Convexa" },
  { id: 5, nombre: "Programación Fraccional" },
  { id: 6, nombre: "Programación Separable" },
  { id: 7, nombre: "Optimización No Restringida con una Variable" },
];

export function Optimizacion() {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(1);

  const manejarCambioMetodo = (id) => {
    setMetodoSeleccionado(id);
  };

  return (
    <ContenedorPrincipal>
      <BarraWrapper>
        {metodosOptimizacion.map((metodo) => (
          <BotonMetodo
            key={metodo.id}
            onClick={() => manejarCambioMetodo(metodo.id)}
            seleccionado={metodoSeleccionado === metodo.id}
          >
            {metodo.nombre}
          </BotonMetodo>
        ))}
      </BarraWrapper>
      <ContenidoWrapper>
        {metodoSeleccionado === 1 && <ProgramacionCuadratica />}
        {metodoSeleccionado === 2 && <ProgramacionConvexa />}
        {metodoSeleccionado === 3 && <ProgramacionGeometrica />}
        {metodoSeleccionado === 4 && <ProgramacionNoConvexa />}
        {metodoSeleccionado === 5 && <ProgramacionFraccional />}
        {metodoSeleccionado === 6 && <ProgramacionSeparable />}
        {metodoSeleccionado === 7 && <OptimizacionNoRestringida />}
      </ContenidoWrapper>
    </ContenedorPrincipal>
  );
}

const ContenedorPrincipal = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
`;

const BarraWrapper = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const BotonMetodo = styled.button`
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
