import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { PERT } from "../pages/PERT";
import { CPM } from "../pages/CPM";
import { EOQ } from "../pages/EOQ";
import { Decisiones } from "../pages/Decisiones";
import { Tcolas } from "../pages/Tcolas"; 
import { Asignacion } from "../pages/Asignacion"; 
import { Optimizacion } from "../pages/Optimizacion"; 
import { Pdinamica } from "../pages/Pdinamica"; 
import styled from "styled-components";

function MyRoutes() {
  return (
    <RoutesContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CPM" element={<CPM />} />
        <Route path="/PERT" element={<PERT />} />
        <Route path="/EOQ" element={<EOQ />} />
        <Route path="/Decisiones" element={<Decisiones />} />
        <Route path="/Tcolas" element={<Tcolas />} /> 
        <Route path="/Asignacion" element={<Asignacion />} /> 
        <Route path="/Optimizacion" element={<Optimizacion />} /> 
        <Route path="/Pdinamica" element={<Pdinamica />} /> 
      </Routes>
    </RoutesContainer>
  );
}

export default MyRoutes;

// Los estilos aseguran que ocupe como minimo el 100% y crezca si el componente ocupa más
const RoutesContainer = styled.div`
  min-height: 100%;
  overflow-y: auto;

  background: #e0e0e0;
  color: #5b5b5b;
`;