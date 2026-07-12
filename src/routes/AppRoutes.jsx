import { Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Employee Management Portal</h1>} />
    </Routes>
  );
}

export default AppRoutes;
