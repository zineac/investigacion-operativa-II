import React, { useState } from "react";
import styled from "styled-components";
import { M_M_1 } from "../methods/Tcolas-Metodos/m_m_1"
import { M_M_C } from "../methods/Tcolas-Metodos/m_m_c";
import { M_G_1 } from "../methods/Tcolas-Metodos/m_g_1";
import { M_G_C_0 } from "../methods/Tcolas-Metodos/m_g_c_0";
import { M_M_S_K } from "../methods/Tcolas-Metodos/m_m_s_k";

const criterios = [
  { id: 1, nombre: "Modelo M/M/1" },
  { id: 2, nombre: "Modelo M/M/c" },
  { id: 3, nombre: "Modelo M/G/1" },
  { id: 4, nombre: "Modelo M/G/c/0" },
  { id: 5, nombre: "Modelo M/M/s/k" },
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
  padding: 20px;
  background: #f8f9fa;
`;

const BarraWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const BotonCriterio = styled.button`
  padding: 10px;
  background-color: ${({ seleccionado }) => (seleccionado ? "#007bff" : "#ccc")};
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ContenidoWrapper = styled.div`
  padding: 20px;
  background-color: #e9ecef;
`;
