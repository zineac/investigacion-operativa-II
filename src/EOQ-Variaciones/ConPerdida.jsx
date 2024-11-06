import React, { useState } from "react";
import styled from "styled-components";
import Cargando from "../components/Cargando";
import Tarjeta from "../components/Tarjeta";
import { inversaDistribucionNormal } from "../utils/probabilidadInversa";

export function ConPerdida() {
  const [mediaDemanda, setMediaDemanda] = useState(1000); // μD
  const [desviacionDemanda, setDesviacionDemanda] = useState(40.8); // σD
  const [costoPedido, setCostoPedido] = useState(50); // K
  const [costoInventario, setCostoInventario] = useState(10); // h
  const [costoAgotamiento, setCostoAgotamiento] = useState(20); // Costo por ventas perdidas (CLS)
  const [tiempoEntrega, setTiempoEntrega] = useState(26); // L (en semanas)
  const [cantidadOptima, setCantidadOptima] = useState(null);
  const [puntoReorden, setPuntoReorden] = useState(null);
  const [nivelSeguridad, setNivelSeguridad] = useState(null);
  const [probabilidadAgotamiento, setProbabilidadAgotamiento] = useState(null);

  const calcularModelo = (e) => {
    e.preventDefault();

    // Cálculo de Q* (Cantidad económica a pedir)
    const Q = Math.sqrt((2 * mediaDemanda * costoPedido) / costoInventario);

    // Probabilidad de agotamiento (P(X >= r*))
    const probAgotamiento = (costoInventario * Q) / (costoInventario * Q + costoAgotamiento * mediaDemanda);

    // Z correspondiente a la probabilidad de agotamiento
    const Z = inversaDistribucionNormal(1 - probAgotamiento.toFixed(2));

    // Media de la demanda durante el tiempo de entrega
    const muX = mediaDemanda / tiempoEntrega;

    // Desviación estándar de la demanda durante el tiempo de entrega
    const sigmaX = desviacionDemanda / Math.sqrt(tiempoEntrega);

    // Cálculo del punto de reorden (r*)
    const r = Z * sigmaX + muX;

    // Cálculo del nivel de seguridad
    const nivelSeguridad = r - muX;

    // Actualizamos los valores calculados
    setCantidadOptima(Q);
    setPuntoReorden(r);
    setNivelSeguridad(nivelSeguridad);
    setProbabilidadAgotamiento(probAgotamiento);
  };

  return (
    <Contenedor>
      <FormularioContainer>
        <form onSubmit={calcularModelo}>
          <h2>Parámetros de Entrada</h2>
          <Etiqueta>
            Media de Demanda Anual (μD)
            <Input
              type="number"
              value={mediaDemanda}
              onChange={(e) => setMediaDemanda(e.target.value)}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Desviación Estándar de la Demanda (σD)
            <Input
              type="number"
              value={desviacionDemanda}
              onChange={(e) => setDesviacionDemanda(e.target.value)}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Costo de Pedido (K)
            <Input
              type="number"
              value={costoPedido}
              onChange={(e) => setCostoPedido(e.target.value)}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Costo de Inventario (h)
            <Input
              type="number"
              value={costoInventario}
              onChange={(e) => setCostoInventario(e.target.value)}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Costo de Agotamiento (C_LS)
            <Input
              type="number"
              value={costoAgotamiento}
              onChange={(e) => setCostoAgotamiento(e.target.value)}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Tiempo de Entrega (L en semanas)
            <Input
              type="number"
              value={tiempoEntrega}
              onChange={(e) => setTiempoEntrega(e.target.value)}
              required
            />
          </Etiqueta>
          <Boton type="submit">Calcular</Boton>
        </form>
      </FormularioContainer>

      <Resultados>
        {cantidadOptima ? (
          <ResultadosContainer>
            <Tarjeta titulo="Cantidad Óptima a Pedir (Q*)" valor={cantidadOptima} simbolo="cajas" />
            <Tarjeta titulo="Punto de Reorden (r*)" valor={puntoReorden} simbolo="cajas" />
            <Tarjeta titulo="Nivel de Seguridad" valor={nivelSeguridad} simbolo="cajas" />
            <Tarjeta titulo="Probabilidad de Agotamiento" valor={probabilidadAgotamiento} simbolo="%" />
          </ResultadosContainer>
        ) : (
          <Cargando />
        )}
      </Resultados>
    </Contenedor>
  );
}

// Estilos
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
