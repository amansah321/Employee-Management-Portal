import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard.jsx";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [selectDepartment, setSelectDepartment] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        setEmployees(response.data.users);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const departments = [];
  for (const employee of employees) {
    const department = employee.company.department;
    if (!departments.includes(department)) {
      departments.push(department);
    }
  }
  const filteredEmployees = employees.filter((employee) => {
    const searchMatches =
      employee.firstName.toLowerCase().includes(searchEmployee.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchEmployee.toLowerCase());

    const departmentMatches =
      selectDepartment === "" ||
      employee.company.department === selectDepartment;
    return searchMatches && departmentMatches;
  });
  return (
    <div>
      <h1>Employees</h1>
      <p>Welcome to Employees Page</p>

      <input
        type="text"
        placeholder="Search Employee..."
        value={searchEmployee}
        onChange={(e) => setSearchEmployee(e.target.value)}
      />
      <select
        value={selectDepartment}
        onChange={(e) => setSelectDepartment(e.target.value)}
      >
        <option value="">All Departments</option>

        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>

      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((employee) => {
          return (
            <EmployeeCard
              key={employee.id}
              employee={employee} //left side is the prop name, right side is the value we are passing to the prop
            />
          );
        })
      ) : (
        <h2>No employees found.</h2>
      )}
    </div>
  );
}

export default Employees;
