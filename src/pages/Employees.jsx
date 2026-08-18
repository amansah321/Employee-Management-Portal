import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard.jsx";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [selectDepartment, setSelectDepartment] = useState("");
  const [sortOption, setSortOption] = useState("");

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

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortOption === "firstName-asc") {
      return a.firstName.localeCompare(b.firstName);
    }

    if (sortOption === "firstName-desc") {
      return b.firstName.localeCompare(a.firstName);
    }
    return 0;
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

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="firstName-asc">First Name A → Z</option>
        <option value="firstName-desc">First Name Z → A</option>
      </select>

      {sortedEmployees.length > 0 ? (
        sortedEmployees.map((employee) => {
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
