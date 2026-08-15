import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  //console.log(id); // Log the params to see the values
  useEffect(() => {
    // Fetch employee details based on the id
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  console.log(employee);

  return (
    <div>
      <h1>Employee Details</h1>
      { employee && (
        <div>
          <h2>
          {employee.firstName} {employee.lastName}
        </h2>

        <p>Email: {employee.email}</p>
        <p>Age: {employee.age}</p>
        <p>Gender: {employee.gender}</p>
        <p>Phone: {employee.phone}</p>
        <p>Role: {employee.role}</p>
      </div>  
      )}
    </div>
  );
}

export default EmployeeDetails;
