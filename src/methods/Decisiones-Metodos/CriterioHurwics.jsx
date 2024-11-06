import React, { useState } from 'react';
import styled from 'styled-components';
import Cargando from '../../components/Cargando';

export function CriterioHurwicz() {
  const [numDecisiones, setNumDecisiones] = useState(3);
  const [numEstados, setNumEstados] = useState(3);
  const [decisiones, setDecisiones] = useState(['Tecnología 1', 'Tecnología 2', 'Tecnología 3']);
  const [estados, setEstados] = useState(['No se adaptan', 'Se adaptan bien', 'Se adaptan muy bien']);
  const [resultados, setResultados] = useState([
    [650, 550, 900],
    [1000, 650, 400],
    [500, 800, 950]
  ]);
  const [hurwicz, setHurwicz] = useState(0.65);  // Coeficiente de optimismo
  const [valoresHurwicz, setValoresHurwicz] = useState([]);
  const [mejorResultado, setMejorResultado] = useState(null);
  const [mejorFila, setMejorFila] = useState(-1);
  const [resaltados, setResaltados] = useState(false);

  const manejarCambioNumDecisiones = (e) => {
    const valor = parseInt(e.target.value);
    setNumDecisiones(valor);
    setDecisiones(Array(valor).fill('Nueva Alternativa'));
    setResultados(Array(valor).fill(Array(numEstados).fill(0)).map(() => Array(numEstados).fill(0)));
  };

  const manejarCambioNumEstados = (e) => {
    const valor = parseInt(e.target.value);
    setNumEstados(valor);
    setEstados(Array(valor).fill('Nuevo Estado'));
    setResultados(resultados.map((fila) => Array(valor).fill(0)));
  };

  const manejarCambioNombre = (tipo, index, valor) => {
    if (tipo === 'decision') {
      const nuevasDecisiones = [...decisiones];
      nuevasDecisiones[index] = valor;
      setDecisiones(nuevasDecisiones);
    } else {
      const nuevosEstados = [...estados];
      nuevosEstados[index] = valor;
      setEstados(nuevosEstados);
    }
  };

  const manejarCambioResultado = (fila, columna, valor) => {
    const nuevosResultados = [...resultados];
    nuevosResultados[fila][columna] = parseInt(valor);
    setResultados(nuevosResultados);
  };

  const calcularCriterioHurwicz = () => {
    const nuevosValoresHurwicz = resultados.map(fila => {
      const max = Math.max(...fila);
      const min = Math.min(...fila);
      return hurwicz * max + (1 - hurwicz) * min;
    });

    setValoresHurwicz(nuevosValoresHurwicz);
    const mejor = Math.max(...nuevosValoresHurwicz);
    const filaMejor = nuevosValoresHurwicz.indexOf(mejor);
    
    setMejorResultado(mejor);
    setMejorFila(filaMejor);
    setResaltados(true);
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Número de Decisiones
          <Input type="number" value={numDecisiones} onChange={manejarCambioNumDecisiones} min={1} />
        </Etiqueta>

        <Etiqueta>
          Número de Estados
          <Input type="number" value={numEstados} onChange={manejarCambioNumEstados} min={1} />
        </Etiqueta>

        <Etiqueta>
          Coeficiente de Hurwicz (α)
          <Input 
            type="number" 
            value={hurwicz} 
            onChange={(e) => setHurwicz(parseFloat(e.target.value))} 
            step="0.1" 
            min="0" 
            max="1" 
          />
        </Etiqueta>

        <Tabla>
          <thead>
            <tr>
              <th>Alternativa / Estado</th>
              {estados.map((estado, index) => (
                <th key={index}>
                  <InputTabla
                    type="text"
                    value={estado}
                    onChange={(e) => manejarCambioNombre('estado', index, e.target.value)}
                    required
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {decisiones.map((decision, index) => (
              <tr key={index}>
                <td>
                  <InputTabla
                    type="text"
                    value={decision}
                    onChange={(e) => manejarCambioNombre('decision', index, e.target.value)}
                    required
                  />
                </td>
                {resultados[index].map((valor, colIndex) => (
                  <td key={colIndex}>
                    <InputTabla
                      type="number"
                      value={valor}
                      onChange={(e) => manejarCambioResultado(index, colIndex, e.target.value)}
                      required
                      style={{
                        backgroundColor: (resaltados && (index === mejorFila)) ? '#ffcccc' : 'transparent',
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Tabla>

        <Boton onClick={calcularCriterioHurwicz}>Calcular</Boton>
      </FormularioContainer>

      <ResultadosContainer>
        {mejorResultado !== null ? (
          <>
            <Resultados>
              <h3>Resultados</h3>
              <p>La mejor alternativa es <strong>{decisiones[mejorFila]}</strong> con un valor de Hurwicz de <strong>{mejorResultado.toFixed(2)}</strong>.</p>
            </Resultados>

            <Resultados>
              <h3>Valores de Hurwicz</h3>
              {valoresHurwicz.map((valor, index) => (
                <p key={index}><strong>A{[index + 1]}</strong>: {valor.toFixed(2)}</p>
              ))}
            </Resultados>
          </>
        ) : <Cargando />}
      </ResultadosContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin: 0 0 22px 0;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
`;

const FormularioContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ResultadosContainer = styled.div`
  flex: 0.3;
  padding: 20px;
  gap: 20px;
  background-color: #343a40;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const InputTabla = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  margin-top: 22px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Etiqueta = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #343a40;
`;

const Resultados = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  text-align: center;
  color: #343a40;
`;
