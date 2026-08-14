import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import MainLayout from "../common layout/MainLayout.jsx";
import Employees from "../pages/Employees.jsx";
import EmployeeDetails from "../pages/EmployeeDetails.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
