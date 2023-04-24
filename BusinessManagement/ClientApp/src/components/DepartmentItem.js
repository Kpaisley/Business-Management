import React from "react";
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
                        <td>{props.department.departmentName}</td>
                        <td>{employeeCount()}</td>
                    </tr>
                    
                </tbody>
            </table>

        </>
    )

}
