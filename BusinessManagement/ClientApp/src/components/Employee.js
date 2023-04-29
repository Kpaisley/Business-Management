import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import './Employee.css';
import { EmployeeItem } from "./EmployeeItem";

export const Employee = (props) => {
    const { isAuthenticated } = useAuth0();


    function addEmployee() {
        var addModal = document.getElementById('add-employee-modal');
        addModal.style.left = "25vw";
    }

    function closeModal() {
        var addModal = document.getElementById('add-employee-modal');
        addModal.style.left = "-100%";
    }

    if (!isAuthenticated) {
        window.location.href = "";
    }

    else if (isAuthenticated && props.employeesLoading) {
        return (
            <div className="loader"></div>
        )
    }

    else
        return isAuthenticated && (
            <div className="employee-page">

                <div id="add-employee-modal" >
                    <span className="close-modal-btn" onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark} className="pulse-hover" /></span>
                    <br />
                    <h3><u>Add an Employee!</u></h3>

                    <div className="employee-modal-content">
                        <form onSubmit={(e) => props.addEmployee(e)}>
                            <label htmlFor="employee-fname"><strong>First Name *</strong></label>
                            <input className="employee-input" type="text" name="employee-fname" placeholder="John" maxLength="25" ></input>

                            <label htmlFor="employee-lname"><strong>Last Name *</strong></label>
                            <input className="employee-input" type="text" name="employee-lname" placeholder="Doe" maxLength="25" ></input>

                            <label htmlFor="employee-position"><strong>Position *</strong></label>
                            <input className="employee-input" type="text" name="employee-position" placeholder="Sr. Developer" maxLength="30" ></input>

                            <label htmlFor="employee-lname"><strong>Yearly Salary *</strong></label>
                            <input className="employee-input" type="text" name="employee-salary" placeholder="120k" maxLength="25" ></input>

                            <label htmlFor="employee-dept"><strong>Department *</strong></label>
                            <select className="employee-input" name="employee-dept" >
                                <option value=""></option>
                                {
                                props.departments.map((department) => 
                                    <option key={department.departmentId} value={department.departmentId}>{department.departmentName}</option>)
                                }
                            </select>

                            <input className="submit-btn" type="submit" value="Add Department"></input>
                            <span id="add-employee-msg"></span>
                        </form>
                    </div>
                </div>


                <h3>Browse your Employees below!</h3>
                <span className="create-btn pulse-hover" onClick={() => addEmployee() } ><span><FontAwesomeIcon icon={faPlus} /></span>Create</span>
                <table className="employee-desc">
                    <thead>
                        <tr>
                            <th><u>Name</u></th>
                            <th><u>Department</u></th>
                            <th><u>Position</u></th>
                            <th><u>Salary</u></th>
                        </tr>
                    </thead>
                </table>

                {props.employees.map((employee) => {
                    return (
                        
                        <EmployeeItem key={employee.employeeId} employee={employee} departments={props.departments} />
                    )
                })}

                <h5>Total Employees: {props.employees.length}</h5>
            </div>
    )
}
