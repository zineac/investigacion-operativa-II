import React, { useState } from "react";
import styled from "styled-components";
import { Principal } from "../EOQ-Variaciones/Principal";

const modelos = [
  { id: 1, nombre: "Principal" },
  { id: 2, nombre: "Faltantes" },
  { id: 3, nombre: "Descuentos" },
  { id: 4, nombre: "Periodo único" },
  { id: 5, nombre: "Punto reorden con DM" },
  { id: 6, nombre: "Revisión periódica con DM" },
  { id: 7, nombre: "Revisión" },
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
          >
            {modelo.nombre}
          </BotonModelo>
        ))}
      </BarraWrapper>
      <ContenidoWrapper>
        {modeloSeleccionado === 1 && <Principal />}
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
  justify-content: space-around;
  background-color: #fff;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const BotonModelo = styled.button`
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const ContenidoWrapper = styled.div`
  height: 100%;
`;
