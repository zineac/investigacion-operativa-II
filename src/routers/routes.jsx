import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { PERT } from "../pages/PERT";
import { CPM } from "../pages/CPM";
import { EOQ } from "../pages/EOQ";
import { Decisiones } from "../pages/Decisiones";

export function MyRoutes() {
  return (
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/PERT" element={<PERT />} />
        <Route path="/CPM" element={<CPM />} />
        <Route path="/EOQ" element={<EOQ />}/>
        <Route path="/Decisiones" element={<Decisiones />} />
      </Routes>
    
  );
}