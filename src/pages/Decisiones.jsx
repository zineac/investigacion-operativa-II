import React, { useState } from "react";
import styled from "styled-components";
import { CriterioOptimista } from "../methods/Decisiones-Metodos/CriterioOptimista";
import { CriterioPesimista } from "../methods/Decisiones-Metodos/CriterioPesimista";
import { CriterioLaplace } from "../methods/Decisiones-Metodos/Criteriolaplace";
import { CriterioHurwicz } from "../methods/Decisiones-Metodos/CriterioHurwics";
import { CriterioSavage } from "../methods/Decisiones-Metodos/CriterioSavage";
import { AHP } from "../methods/Extras/AHP";
import { Arbol } from "../methods/Extras/Arbol";
import { ValorEsperado } from "../methods/Extras/ValorEsperado";

const criterios = [
  { id: 1, nombre: "Criterio pesimista" },
  { id: 2, nombre: "Criterio optimista" },
  { id: 3, nombre: "Criterio de Laplace" },
  { id: 4, nombre: "Criterio de Hurwics" },
  { id: 5, nombre: "Criterio de Savage" },
  { id: 6, nombre: "Metodo AHP" },
  { id: 7, nombre: "Arbol" },
  { id: 8, nombre: "Valor esperado" },
];

export function Decisiones() {
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
        {criterioSeleccionado === 1 && <CriterioPesimista />}
        {criterioSeleccionado === 2 && <CriterioOptimista />}
        {criterioSeleccionado === 3 && <CriterioLaplace />}
        {criterioSeleccionado === 4 && <CriterioHurwicz />}
        {criterioSeleccionado === 5 && <CriterioSavage />}
        {criterioSeleccionado === 6 && <AHP />}
        {criterioSeleccionado === 7 && <Arbol />}
        {criterioSeleccionado === 8 && <ValorEsperado />}
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
