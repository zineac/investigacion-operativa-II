import React, { useState } from "react";
import styled from "styled-components";
import { Principal } from "../EOQ-Variaciones/Principal";
import { Lotes } from "../EOQ-Variaciones/Lotes";
import { Faltantes } from "../EOQ-Variaciones/Faltantes";
import { Descuentos } from "../EOQ-Variaciones/Descuentos";
import { PeriodoUnico } from "../EOQ-Variaciones/PeriodoUnico";
import { PuntoReorden } from "../EOQ-Variaciones/PuntoReorden";
import { RevisionPeriodica } from "../EOQ-Variaciones/RevisionPeriodica";
import { SinPerdida } from "../EOQ-Variaciones/SinPerdida";
import { ConPerdida } from "../EOQ-Variaciones/ConPerdida";

const modelos = [
  { id: 1, nombre: "Principal" },
  { id: 2, nombre: "Lotes" },
  { id: 3, nombre: "Faltantes" },
  { id: 4, nombre: "Descuentos" },
  { id: 5, nombre: "Periodo único" },
  { id: 6, nombre: "Punto reorden con DP" },
  { id: 7, nombre: "Revisión periódica con DP" },
  { id: 8, nombre: "Winston Sin Pérd." },
  { id: 9, nombre: "Winston Con Pérd." },
];

export function EOQ() {
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
        {modeloSeleccionado === 1 && <Principal />}
        {modeloSeleccionado === 2 && <Lotes />}
        {modeloSeleccionado === 3 && <Faltantes />}
        {modeloSeleccionado === 4 && <Descuentos />}
        {modeloSeleccionado === 5 && <PeriodoUnico />}
        {modeloSeleccionado === 6 && <PuntoReorden />}
        {modeloSeleccionado === 7 && <RevisionPeriodica />}
        {modeloSeleccionado === 8 && <SinPerdida />}
        {modeloSeleccionado === 9 && <ConPerdida />}
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
