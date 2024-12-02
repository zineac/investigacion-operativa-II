import React, { useState } from "react";
import styled from "styled-components";
import { ModeloMochila } from "../methods/AsignacionRecursos/ModeloMochila";
import { ModeloFuerzaTrabajo } from "../methods/AsignacionRecursos/ModeloFuerzaTrabajo";
import { ModeloReemplazoEquipo } from "../methods/AsignacionRecursos/ModeloReemplazoEquipo";
import { ModeloInversion } from "../methods/AsignacionRecursos/ModeloInversion";

const metodosAsignacion = [
  { id: 1, nombre: "Modelo de la Mochila" },
  { id: 2, nombre: "Modelo de Tamaño de la Fuerza de Trabajo" },
  { id: 3, nombre: "Modelo de Reemplazo de Equipo" },
  { id: 4, nombre: "Modelo de Inversión" },
];

export function Asignacion() {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(1);

  const manejarCambioMetodo = (id) => {
    setMetodoSeleccionado(id);
  };

  return (
    <ContenedorPrincipal>
      <BarraWrapper>
        {metodosAsignacion.map((metodo) => (
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
        {metodoSeleccionado === 1 && <ModeloMochila />}
        {metodoSeleccionado === 2 && <ModeloFuerzaTrabajo />}
        {metodoSeleccionado === 3 && <ModeloReemplazoEquipo />}
        {metodoSeleccionado === 4 && <ModeloInversion />}
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

