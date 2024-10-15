import React, { useState } from 'react';
import styled from 'styled-components';

export function AHP() {
  const [numCriteria, setNumCriteria] = useState(4);
  const [numAlternatives, setNumAlternatives] = useState(4);
  const [criteria, setCriteria] = useState(['Criterio 1', 'Criterio 2', 'Criterio 3', 'Criterio 4']);
  const [alternatives, setAlternatives] = useState(['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4']);
  
  const [criterionMatrix, setCriterionMatrix] = useState([
    [1, 5, 5, 7],
    [0.2, 1, 1, 3],
    [0.2, 1, 1, 3],
    [0.1429, 0.3333, 0.3333, 1]
  ]);

  const [alternativeMatrices, setAlternativeMatrices] = useState([
    [
      [1, 0.25, 4, 0.1667],
      [4, 1, 4, 0.25],
      [0.25, 0.25, 1, 0.2],
      [6, 4, 5, 1]
    ],
    [
      [1, 2, 5, 1],
      [0.5, 1, 3, 2],
      [0.2, 0.3333, 1, 0.25],
      [1, 0.5, 4, 1]
    ],
    [
      [1, 0.3333, 0.1429, 0.2],
      [3, 1, 0.2, 0.3333],
      [7, 5, 1, 3],
      [5, 3, 0.3333, 1]
    ],
    [
      [1, 0.3333, 0.25, 0.3333],
      [3, 1, 0.5, 1],
      [4, 2, 1, 2],
      [3, 1, 0.5, 1]
    ]
  ]);

  const [priorityVector, setPriorityVector] = useState([]);
  const [alternativePriorityVectors, setAlternativePriorityVectors] = useState([]);

  const handleMatrixChange = (matrixType, index1, index2, value, criterionIndex = null) => {
    if (matrixType === 'criteria') {
      const newMatrix = [...criterionMatrix];
      newMatrix[index1][index2] = parseFloat(value);
      newMatrix[index2][index1] = 1 / parseFloat(value);
      setCriterionMatrix(newMatrix);
    } else if (matrixType === 'alternatives') {
      const newMatrices = [...alternativeMatrices];
      newMatrices[criterionIndex][index1][index2] = parseFloat(value);
      newMatrices[criterionIndex][index2][index1] = 1 / parseFloat(value);
      setAlternativeMatrices(newMatrices);
    }
  };

  const calculatePriorityVectors = () => {
    const calculatePriority = (matrix) => {
      const size = matrix.length;
      const columnSums = Array(size).fill(0);

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          columnSums[j] += matrix[i][j];
        }
      }

      const normalizedMatrix = matrix.map((row, i) =>
        row.map((value, j) => value / columnSums[j])
      );

      return normalizedMatrix.map(
        (row) => row.reduce((sum, val) => sum + val, 0) / size
      );
    };

    const newPriorityVector = calculatePriority(criterionMatrix);
    setPriorityVector(newPriorityVector);

    const newAlternativePriorityVectors = alternativeMatrices.map((matrix) =>
      calculatePriority(matrix)
    );
    setAlternativePriorityVectors(newAlternativePriorityVectors);
  };

  const handleNumCriteriaChange = (e) => {
    const value = parseInt(e.target.value);
    setNumCriteria(value);
    setCriteria(Array.from({ length: value }, (_, i) => `Criterio ${i + 1}`));
    setCriterionMatrix(Array.from({ length: value }, () => Array(value).fill(1)));
    setAlternativeMatrices(Array.from({ length: value }, () => Array.from({ length: numAlternatives }, () => Array(numAlternatives).fill(1))));
  };

  const handleNumAlternativesChange = (e) => {
    const value = parseInt(e.target.value);
    setNumAlternatives(value);
    setAlternatives(Array.from({ length: value }, (_, i) => `Alternativa ${i + 1}`));
    setAlternativeMatrices(Array.from({ length: numCriteria }, () => Array.from({ length: value }, () => Array(value).fill(1))));
  };

  return (
    <Container>
      <h2>Análisis de AHP</h2>

      <Section>
        <label>
          Cantidad de Criterios:
          <Input type="number" value={numCriteria} onChange={handleNumCriteriaChange} min="1" />
        </label>
        <label>
          Cantidad de Alternativas:
          <Input type="number" value={numAlternatives} onChange={handleNumAlternativesChange} min="1" />
        </label>
      </Section>

      <Section>
        <h3>Matriz de Criterios</h3>
        <table>
          <tbody>
            {criterionMatrix.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td key={j}>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleMatrixChange('criteria', i, j, e.target.value)
                      }
                      disabled={i === j}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {criteria.map((criterion, criterionIndex) => (
        <Section key={criterionIndex}>
          <h3>Matriz de Alternativas para {criterion}</h3>
          <table>
            <tbody>
              {alternativeMatrices[criterionIndex].map((row, i) => (
                <tr key={i}>
                  {row.map((value, j) => (
                    <td key={j}>
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleMatrixChange(
                            'alternatives',
                            i,
                            j,
                            e.target.value,
                            criterionIndex
                          )
                        }
                        disabled={i === j}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      ))}

      <Button onClick={calculatePriorityVectors}>Calcular Vectores de Prioridad</Button>

      <Section>
        <h3>Vector de Prioridad de Criterios</h3>
        {priorityVector.map((value, index) => (
          <p key={index}>
            {criteria[index]}: {value.toFixed(4)}
          </p>
        ))}
      </Section>

      <Section>
        <h3>Vectores de Prioridad de Alternativas</h3>
        {alternativePriorityVectors.map((vector, index) => (
          <div key={index}>
            <h4>Para {criteria[index]}</h4>
            {vector.map((value, altIndex) => (
              <p key={altIndex}>
                {alternatives[altIndex]}: {value.toFixed(4)}
              </p>
            ))}
          </div>
        ))}
      </Section>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin: 5px;
  padding: 8px;
  width: 60px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default AHP;