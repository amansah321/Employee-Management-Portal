import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function EditEmployee() {
  const [employee, setEmployee] = useState(null); // State to hold the employee data
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Employee ID :", id);
  const [roles, setRoles] = useState([]); // State to hold the roles data
  const [departments, setDepartments] = useState([]); // State to hold the departments data

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Fetch employee details based on the id
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((response) => {
        console.log("Employee Data :", response.data);
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //Put employee data into the form
  useEffect(() => {
    if (employee) {
      reset(employee); // Reset the form with the fetched employee data
    }
  }, [employee, reset]); //when employee data changes, reset the form with the new data

  useEffect(() => {
    // Fetch roles data for the dropdown
    const fetchRoles = async () => {
      const response = await axios.get("https://dummyjson.com/users");

      const uniqueRoles = [
        ...new Set(response.data.users.map((user) => user.role)),
      ];

      setRoles(uniqueRoles);
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await axios.get("https://dummyjson.com/users");

      const uniqueDepartments = [
        ...new Set(response.data.users.map((user) => user.company.department)),
      ];

      setDepartments(uniqueDepartments);
    };

    fetchDepartments();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `https://dummyjson.com/users/${id}`,
        data,
      );

      console.log("Updated Employee:", response.data);
      navigate("/employees",{
        state:{
          updatedEmployee: response.data, // Pass the updated employee data to the employees page 
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Edit Employee</h1>

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
          {...register("lastName", {
            required: "Last name is required",
          })}
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
              value: /^[+0-9() -]{7,20}$/,
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
            min: {
              value: 18,
              message: "Age must be at least 18",
            },
            max: {
              value: 60,
              message: "Age must be less than 60",
            },
          })}
        />

        {errors.age && <p>{errors.age.message}</p>}

        <label htmlFor="gender">Gender</label>

        <select
          id="gender"
          {...register("gender", {
            required: "Please select a gender",
          })}
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
          {...register("role", {
            required: "Please select a role",
          })}
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
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default EditEmployee;
