import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Home.css';
import { Dashboard } from './Dashboard';

export const Home = (props) => {
    const { isAuthenticated } = useAuth0();

    

    


    

    












    //RETURN HOMEPAGE IF NOT AUTHENTICATED
    if (!isAuthenticated) {
        return (
            <div className="home-bg">
                <div className="greeting">
                    <h2>Business Management</h2>
                    <h4>The best place to store, view and manage information related to your business!</h4>
                </div>
                <div className="features">
                    <p>Using Auth0 authentication, you can securely store important information related to your business and never worry about your data being exposed.</p>
                    <h4>Features</h4>
                    <ul>
                        <li>Our technology implements Auth0 Authentication so you can be sure that your information is kept secure.</li>
                        <li>Interact with your dashboard where you can view information stored in our SQL Server database.</li>
                        <li>Access and manage your company departments, employees and product information in real time so you never fall behind!</li>
                    </ul>
                </div>
            </div>
        );
    }

    //RETURN USER DASHBOARD IF AUTHENTICATED
    return isAuthenticated && (
      <Dashboard products={props.products} productsLoading={props.productsLoading} departments={props.departments} departmentsLoading={props.departmentsLoading} employees={props.employees} employeesLoading={props.employeesLoading} />
    );
}
