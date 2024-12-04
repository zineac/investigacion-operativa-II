import React, { useState } from "react";
import styled from "styled-components";
import { M_M_1 } from "../methods/Tcolas-Metodos/m_m_1"
import { M_M_C } from "../methods/Tcolas-Metodos/m_m_c";
import { M_G_1 } from "../methods/Tcolas-Metodos/m_g_1";
import { M_G_C_0 } from "../methods/Tcolas-Metodos/m_g_c_0";
import { M_M_S_K } from "../methods/Tcolas-Metodos/m_m_s_k";

const criterios = [
  { id: 1, nombre: "Modelo M/M/1" },
  { id: 2, nombre: "Modelo M/M/s" },
  { id: 3, nombre: "Modelo M/G/1" },
  { id: 4, nombre: "Modelo M/G/c/0" },
  { id: 5, nombre: "Modelo M/M/1/N" },
];

export function Tcolas() {
  const [criterioSeleccionado, setCriterioSeleccionado] = useState(1);

  const manejarCambioCriterio = (id) => {
    setCriterioSeleccionado(id);
  };

  return (
    <ContenedorPrincipal>
      <BarraWrapper>
        {criterios.map((criterio) => (
          <BotonCriterio
            key={criterio.id}
            onClick={() => manejarCambioCriterio(criterio.id)}
            seleccionado={criterioSeleccionado === criterio.id}
          >
            {criterio.nombre}
          </BotonCriterio>
        ))}
      </BarraWrapper>
      <ContenidoWrapper>
        {criterioSeleccionado === 1 && <M_M_1 />}
        {criterioSeleccionado === 2 && <M_M_C />}
        {criterioSeleccionado === 3 && <M_G_1 />}
        {criterioSeleccionado === 4 && <M_G_C_0 />}
        {criterioSeleccionado === 5 && <M_M_S_K />}
      </ContenidoWrapper>
    </ContenedorPrincipal>
  );
}

// Estilos básicos para los elementos
const ContenedorPrincipal = styled.div`
  padding: 10px;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
`;

const BarraWrapper = styled.div`
  margin: 20px 0  0 20px;
  display: flex;
  justify-content: space-evenly;
  background-color: #fff;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const BotonCriterio = styled.button`
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