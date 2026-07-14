import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);

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
  console.log(employees);
  return (
    <div>
      <h1>Employees</h1>
      <p>Welcome to Employees Page</p>

      {employees.map((employee) => {
        return <h2 key={employee.id}>{employee.firstName}</h2>;
      })}
    </div>
  );
}

export default Employees;
