import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import './Department.css';
import { DepartmentItem } from "./DepartmentItem";


export const Department = (props) => {
    const { isAuthenticated } = useAuth0();



    function addDepartment() {
        var addModal = document.getElementById('add-department-modal');
        var msg = document.getElementById('add-department-msg');
        addModal.style.left = '25vw';
        msg.innerHTML = "";

    }

    function closeModal() {
        var addModal = document.getElementById('add-department-modal');
        addModal.style.left = '-100%';
    }





    if (!isAuthenticated) {
        window.location.href = "";
    }

    else if (isAuthenticated && props.departmentsLoading) {
        return (
            <div className="loader"></div>
       )
    }

    else if (isAuthenticated && props.departments.length <= 0) {
        return (
            <div className="department-page">
                <h3>It looks like you dont have any departments stored.</h3>



                <h4><u>Add a Department Below!</u></h4>


                <form>
                    
                </form>


            </div>
        )
    }





    else
    return isAuthenticated && (
        <div className="department-page">


            <div id="add-department-modal" >
                <span className="close-modal-btn" onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark} className="pulse-hover" /></span>
                <br />
                <h3><u>Add a Department!</u></h3>
    
                <div className="department-modal-content">
                    <form onSubmit={(e) => props.addDepartment(e)}>
                        <label htmlFor="department-name"><strong>Department Name *</strong></label>
                        <input className="product-input" type="text" name="product-name" placeholder="Information Technology" maxLength="30" ></input>

                        <input className="submit-btn" type="submit" value="Add Department"></input>
                        <span id="add-department-msg"></span>
                    </form>
                </div>
            </div>


            
            <h3>Browse your departments below!</h3>
            <span className="create-btn pulse-hover" onClick={() => addDepartment()}  ><span><FontAwesomeIcon icon={faPlus} /></span>Create</span>

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