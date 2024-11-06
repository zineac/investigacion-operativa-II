import React, { useState } from "react";
import styled from "styled-components";
import Cargando from '../../components/Cargando'
import Tarjeta from "../../components/Tarjeta";

export function PeriodoUnico() {
  const [mediaDemanda, setMediaDemanda] = useState(150);
  const [desviacionDemanda, setDesviacionDemanda] = useState(14);
  const [costoFaltante, setCostoFaltante] = useState(200);
  const [costoExceso, setCostoExceso] = useState(80);
  const [cantidadOptima, setCantidadOptima] = useState(null);
  const [probabilidadOptima, setProbabilidadOptima] = useState(null);

  // Función para calcular la inversa de la distribución normal
  const inversaDistribucionNormal = (p) => {
    if (p < 0 || p > 1) {
      throw new Error("La probabilidad debe estar entre 0 y 1.");
    }

    const a1 = -39.696830286654;
    const a2 = 220.946098424521;
    const a3 = -275.928968095192;
    const a4 = 138.357751867269;
    const a5 = -30.664798328123;
    const a6 = 2.506628238841;

    const b1 = -54.476098798224;
    const b2 = 161.585836858040;
    const b3 = -155.698979859887;
    const b4 = 66.801673737871;
    const b5 = -13.280681552885;

    const c1 = -0.00778489400243029;
    const c2 = -0.322396458041139;
    const c3 = -2.40075827716184;
    const c4 = -2.54973253940885;
    const c5 = 4.00000000000000;
    const c6 = 2.93816300198298;

    const plow = 0.02425;
    const phigh = 1 - plow;

    let q, r;

    if (p < plow) {
      // Cálculo en la cola izquierda
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c1 * q + c2) * q) + c3) * q + c4) * q + c5) / ((((d1 * q + d2) * q) + d3) * q + d4) * q + d5;
    }

    if (p <= phigh) {
      // Cálculo en la parte central
      r = p - 0.5;
      q = r * r;
      return (((((a1 * q + a2) * q) + a3) * q + a4) * q + a5) * r / (((((b1 * q + b2) * q) + b3) * q + b4) * q + b5);
    }

    // Cálculo en la cola derecha
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c1 * q + c2) * q) + c3) * q + c4) * q + c5) / ((((d1 * q + d2) * q) + d3) * q + d4) * q + d5;
  };

  const calcularCantidadOptima = (e) => {
    e.preventDefault();

    // Calcular el índice de criticidad
    const CR = costoFaltante / (costoFaltante + costoExceso);

    // Obtener el valor Z usando la aproximación
    const Z = inversaDistribucionNormal(CR);

    // Calcular la cantidad óptima con demanda probabilística
    const Qopt = mediaDemanda + Z * desviacionDemanda;

    setCantidadOptima(Qopt);
    setProbabilidadOptima(CR * 100); // Establecer probabilidad óptima
  };

  return (
    <Contenedor>
      <FormularioContainer>
        <form onSubmit={calcularCantidadOptima}>
          <h2>Parámetros de Entrada</h2>
          <Etiqueta>
            Media de la Demanda
            <Input
              type="number"
              value={mediaDemanda}
              onChange={(e) => setMediaDemanda(Number(e.target.value))}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Desviación Estándar de la Demanda
            <Input
              type="number"
              value={desviacionDemanda}
              onChange={(e) => setDesviacionDemanda(Number(e.target.value))}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Costo de Faltante (por unidad)
            <Input
              type="number"
              value={costoFaltante}
              onChange={(e) => setCostoFaltante(Number(e.target.value))}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Costo de Exceso (por unidad)
            <Input
              type="number"
              value={costoExceso}
              onChange={(e) => setCostoExceso(Number(e.target.value))}
              required
            />
          </Etiqueta>
          <Boton type="submit">Calcular</Boton>
        </form>
      </FormularioContainer>

      <Resultados>
        {cantidadOptima ? (
          <ResultadosContainer>
            <Tarjeta titulo="Cantidad Óptima de Pedido" valor={cantidadOptima} simbolo="unidades" />
            <Tarjeta titulo="Probabilidad Óptima de Pedido" valor={probabilidadOptima} simbolo="%" />
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
  margin: 0 0 25px 0;
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
