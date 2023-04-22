import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import NavItem from '../../../../../../../node_modules/react-bootstrap/esm/NavItem';

export const Dashboard = (props) => {
    

    return (
        <div className="dashboard">
            <h1>Welcome to your Dashboard!</h1>
            <br />
            <br />
            <h5>Here you can securely manage your Products, Departments and Employees stored in our SQL Server database.</h5>
            <div className="info-boxes">

                <Link className="dashboard-links" to="/product">
                    <div className="info-box pulse-hover-sm">
                        <h3><u>Products</u></h3>
                        <div className="user-totals">{props.productsLoading ? <span className="inline-loader"><span className="loader-box"></span><span className="loader-box"></span><span className="loader-box"></span></span>
                            : props.products.length}
                        </div>
                        <p>Click to view!</p>
                    </div>
                </Link>
                
                

                <div className="info-box pulse-hover-sm">
                    <h3><u>Departments</u></h3>
                    <div className="user-totals">
                        {props.departmentsLoading ? <span className="inline-loader"><span className="loader-box"></span><span className="loader-box"></span><span className="loader-box"></span></span>
                            : props.departments.length}
                    </div>
                    <p>Click to view!</p>
                </div>

                <div className="info-box pulse-hover-sm">
                    <h3><u>Employees</u></h3>
                    <div className="user-totals">
                        {props.employeesLoading ? <span className="inline-loader"><span className="loader-box"></span><span className="loader-box"></span><span className="loader-box"></span></span>
                            : props.employees.length}
                    </div>
                    <p>Click to view!</p>
                </div>
            </div>
        </div>
    )
}












               