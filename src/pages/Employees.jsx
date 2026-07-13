import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);
  return (
    <div>
      <h1>Employees</h1>
      <p>Welcome to Employees Page</p>
    </div>
  );
}

export default Employees;
