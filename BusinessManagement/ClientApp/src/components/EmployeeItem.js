import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import './EmployeeItem.css';

export const EmployeeItem = (props) => {
    const departmentName = () => {
        var deptId = props.employee.departmentId;
        var departmentName = "";

        for (let i = 0; i < props.departments.length; i++) {
            if (deptId == props.departments[i].departmentId) {
                departmentName = props.departments[i].departmentName;
            }
        }

        return departmentName;
    }


    return (
        <>
            <table className="product-item">
                <tbody>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><strong>{props.employee.firstName} {props.employee.lastName}</strong></td>
                        <td><strong>{departmentName()}</strong></td>
                        <td><strong>{props.employee.position}</strong></td>
                        <td><strong>${props.employee.salary}</strong></td>
                            
                        
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon className="pulse-hover" icon={faPen} color="#635dff"  /></td>
                        <td><FontAwesomeIcon className="shake-hover" icon={faTrash} color="red" onClick={() => props.deleteEmployee(props.employee) } /></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>


    )
}
