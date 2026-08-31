import { Link } from "react-router-dom";

function EmployeeCard({ employee, deleteEmployee }) {
  // Accept the deletedEmployee function as a prop
  return (
    <div className="employee-card">
      <img src={employee.image} alt={employee.firstName} />

      <h3>
        {employee.firstName} {employee.lastName}
      </h3>
      <p>{employee.email}</p>
      <p>{employee.company.department}</p>
      <Link to={`/employees/${employee.id}`}>View Details</Link>
      <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
      <Link to={`/employees/${employee.id}/edit`}>Edit</Link>
    </div>
  );
}

export default EmployeeCard;
