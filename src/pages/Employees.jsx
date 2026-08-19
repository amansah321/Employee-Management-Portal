import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard.jsx";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [selectDepartment, setSelectDepartment] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const employessPerPage = 10;
  const startIndex = (currentPage - 1) * employessPerPage; // calculate each page's starting index
  const endIndex = startIndex + employessPerPage; // calculate each page's ending index

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

  //This use effect will run -"Whenever searchEmployee, selectDepartment, or sortOption changes, set currentPage back to 1."Its important to reset the current page to 1 whenever the search, filter, or sort options change, so that the user sees the first page of results for their new query. It is called Pagination-reset effect.

  useEffect(() => {
    setCurrentPage(1);
  }, [searchEmployee, selectDepartment, sortOption]);

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
  const paginatedEmployees = sortedEmployees.slice(startIndex, endIndex); // slice the employees array to get the employees for the current page
  const totalPages = Math.ceil(sortedEmployees.length / employessPerPage); // calculate the total number of pages
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

      {paginatedEmployees.length > 0 ? (
        paginatedEmployees.map((employee) => {
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

      {totalPages > 0 && (
        <>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            return (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
}

export default Employees;
