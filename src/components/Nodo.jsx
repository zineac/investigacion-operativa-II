import React, { useState, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, updateEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';

// Función para generar nodos automáticamente
const generarNodos = (datos) => {
  const nodos = [
    { id: 'start', data: { label: 'Inicio' }, position: { x: 400, y: 10 }, draggable: true },
  ];

  const nivelOffset = 150; // Aumenta la distancia vertical entre niveles
  const horizontalOffset = 200; // Aumenta la distancia horizontal entre nodos en el mismo nivel

  datos.forEach((dato, index) => {
    const nivel = Math.floor(index / 2); // Cambiar el cálculo para los niveles
    const posicionX = 250 + (index % 2) * horizontalOffset; // Espaciado horizontal
    const posicionY = 100 + nivel * nivelOffset; // Espaciado vertical

    nodos.push({
      id: dato.actividad,
      data: { label: `${dato.actividad} (T: ${dato.tiempoEsperado})` },
      position: { x: posicionX, y: posicionY },
      draggable: true,
    });
  });

  nodos.push({ id: 'end', data: { label: 'Fin' }, position: { x: 400, y: 100 + Math.ceil(datos.length / 2) * nivelOffset }, draggable: true });

  return nodos;
};



// Función para generar conexiones automáticamente
const generarConexiones = (datos) => {
  const edges = [
    ...datos.filter(dato => dato.predecesores.length === 0).map(dato => ({
      id: `e-start-${dato.actividad}`,
      source: 'start',
      target: dato.actividad,
    })),
    ...datos.flatMap(dato =>
      dato.predecesores.map(predecesor => ({
        id: `e-${predecesor}-${dato.actividad}`,
        source: predecesor,
        target: dato.actividad,
      }))
    ),
    ...datos.filter(dato => 
      !datos.some(d => d.predecesores.includes(dato.actividad))
    ).map(dato => ({
      id: `e-${dato.actividad}-end`,
      source: dato.actividad,
      target: 'end',
    })),
  ];

  return edges;
};

// Componente principal de la aplicación
function Nodo({ datos }) {
  const [nodes, setNodes] = useState(generarNodos(datos));
  const [edges, setEdges] = useState(generarConexiones(datos));

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  return (
    <div style={{ 
      height: '350px',
      border: '2px solid white', 
      borderRadius: '8px',
      marginBottom: '20px',
    }}>
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
      </ReactFlow>
    </div>
  );
}

export default Nodo;
