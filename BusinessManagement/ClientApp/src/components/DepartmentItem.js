import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import './DepartmentItem.css';


export const DepartmentItem = (props) => {
    
    const employeeCount = () => {
        var count = 0;

        for (let i = 0; i < props.employees.length; i++) {
            if (props.employees[i].departmentId === props.department.departmentId) {
                count++; 
            }
        }
        return count;
    }

    return (
        <>
            <table className="department-item">
                <tbody>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><strong>{props.department.departmentName}</strong></td>
                        <td><strong>{employeeCount()}</strong></td>
                    </tr>
                    <tr>
                        <td>
                            <FontAwesomeIcon className="pulse-hover dept-btns" icon={faPen} color="#635dff" onClick={() => props.editDepartment(props.department) } />
                            <FontAwesomeIcon className="shake-hover dept-btns" icon={faTrash} color="red" onClick={() => props.deleteDepartment(props.department) } />
                        </td>
                        <td></td>
                    </tr>
                    
                </tbody>
            </table>

        </>
    )

}
