import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Dashboard.css';

export const Dashboard = (props) => {
    

    return (
        <div className="dashboard">
            <h1>Welcome to your Dashboard!</h1>
            <br />
            <br />
            <div className="info-boxes">
                <div className="info-box">
                    Products: {props.productsLoading ? <span className="inline-loader"><span className="loader-box"></span><span className="loader-box"></span><span className="loader-box"></span></span>
                        : props.products.length}
                </div>
                <div className="info-box">
                    Departments: {props.departmentsLoading ? <span className="inline-loader"><span className="loader-box"></span><span className="loader-box"></span><span className="loader-box"></span></span>
                        : props.departments.length}
                </div>
                <div className="info-box">
                      Employees: {props.employeesLoading ? <span className="inline-loader"><span className="loader-box"></span><span className="loader-box"></span><span className="loader-box"></span></span>
                          : props.employees.length}
                </div>
            </div>
        </div>
    )
}












               