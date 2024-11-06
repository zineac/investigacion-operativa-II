import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { PERT } from "../pages/PERT";
import { CPM } from "../pages/CPM";
import { EOQ } from "../pages/EOQ";
import { Decisiones } from "../pages/Decisiones";
import { Tcolas } from "../pages/Tcolas"; // Importa Tcolas
import styled from "styled-components";

export function MyRoutes() {
  return (
    <RoutesContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CPM" element={<CPM />} />
        <Route path="/PERT" element={<PERT />} />
        <Route path="/EOQ" element={<EOQ />} />
        <Route path="/Decisiones" element={<Decisiones />} />
        <Route path="/Tcolas" element={<Tcolas />} /> 
      </Routes>
    </RoutesContainer>
  );
}

// Los estilos aseguran que ocupe como minimo el 100% y crezca si el componente ocupa más
const RoutesContainer = styled.div`
  min-height: 100%;
  overflow-y: auto;
  background: #f8f9fa;
`;
