import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeCard from "../components/EmployeeCard.jsx";

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
        return (<EmployeeCard 
        key={employee.id}
        employee={employee} //left side is the prop name, right side is the value we are passing to the prop  
        />
        );
      })}
    </div>
  
  );
}

export default Employees;
