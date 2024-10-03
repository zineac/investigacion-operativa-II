import { Routes, Route } from "react-router-dom";
import { Simplex } from "../pages/Simplex";
import { PERT } from "../pages/PERT";
import { CPM } from "../pages/CPM";
export function MyRoutes() {
  return (
   
     
      <Routes>
        <Route path="/" element={<Simplex />} />
        <Route path="/PERT" element={<PERT />} />
        <Route path="/CPM" element={<CPM />} />
      </Routes>
    
  );
}