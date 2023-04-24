import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Department.css';
import { DepartmentItem } from "./DepartmentItem";


export const Department = (props) => {
    const { isAuthenticated } = useAuth0();







    if (!isAuthenticated) {
        window.location.href = "";
    }

    else if (isAuthenticated && props.departmentsLoading) {
        return (
            <div className="loader"></div>
       )
    }





    else
    return isAuthenticated && (
        <div className="department-page">

            <h3>Browse your departments below!</h3>
            <span className="create-btn pulse-hover"  ><span><FontAwesomeIcon icon={faPlus} /></span>Create</span>

            <table className="department-desc">
                <thead>
                    <tr>
                        <th><u>Department</u></th>
                        <th><u>Employees</u></th>
                    </tr>
                </thead>
            </table>
            {props.departments.map((department) => {
                return (
                    <DepartmentItem key={department.departmentId} department={department} employees={props.employees} />
                )
            })}
            <h5>Total Departments: {props.departments.length}</h5>
            <h5>Total Employees: {props.employees.length}</h5>
          

        </div>
    )
}