import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddEmployee() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await axios.get("https://dummyjson.com/users");

      const uniqueDepartments = [
        ...new Set(response.data.users.map((user) => user.company.department)),
      ];

      const uniqueRoles = [
        ...new Set(response.data.users.map((user) => user.role)),
      ];
      setDepartments(uniqueDepartments);
      setRoles(uniqueRoles);
    };

    fetchDepartments();
  }, []);

  const onSubmit = async (data) => {
    //asynch as we are making an API request i.e.
    // POST request to the server
    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true); // Set submitting state to true
    try {
      const response = await axios.post(
        "https://dummyjson.com/users/add",
        data,
      );

      console.log(response.status);
      setSuccessMessage("Employee added successfully!");
      reset(); // Reset the form after successful submission
      navigate("/employees",{
        state:{
          newEmployee: response.data, // Pass the newly added employee data to the employees page
        }
      }); // Navigate to the employees page after successful submission

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setErrorMessage(
          `Failed to add employee. Status: ${error.response.status}`,
        );
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsSubmitting(false); // Reset submitting state after request is complete whether it was successful or not
    }
  };
  return (
    <div>
      <h1>Add Employee</h1>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          {...register("firstName", { required: "First name is required " })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          {...register("lastName", { required: "Last name is required" })}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          {...register("phone", {
            required: "Phone no is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid phone number",
            },
          })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}

        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
            min: { value: 18, message: "Age must be at least 18" },
            max: { value: 60, message: "Age must be less than 60" },
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}

        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          {...register("gender", { required: "Please select a gender" })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}

        <label htmlFor="role">Role</label>
        <select
          id="role"
          {...register("role", { required: "Please select a role" })}
        >
          <option value="">Select Role</option>

          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.role && <p>{errors.role.message}</p>}

        <label htmlFor="department">Department</label>
        <select
          id="department"
          {...register("department", {
            required: "Please select a department",
          })}
        >
          <option value="">Select Department</option>

          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        {errors.department && <p>{errors.department.message}</p>}

        <button type="submit">
          {isSubmitting ? "Adding  Employee... " : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
