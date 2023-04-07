import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Home.css';

export const Home = () => {
    const { isAuthenticated, user } = useAuth0();
    const [products, setProducts] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);

    async function populateProducts() {
        //CALL PRODUCTS API HERE AND SET PRODUCTS TO RESULT
        console.log('Populating Products')
    }
    async function populateDepartments() {
        //CALL DEPARTMENTS API HERE AND SET DEPARTMENTS TO RESULT
        console.log('Populating Departments')
    }
    async function populateEmployees(deptID) {
        //CALL EMPLOYEES API HERE PASSING THE deptID AS A PARAMETER TO RETURN EACH EMPLOYEE FROM EACH DEPT AND PUSH IT TO THE EMPLOYEE ARRAY.
        console.log('Populating Employees')
    }


    //POPULATE DEPARTMENTS, EMPLOYEES && PRODUCTS
    useEffect(() => {
        if (isAuthenticated) {
            populateProducts().then(populateDepartments()).then(() => { 
                for (let i = 0; i < departments.length; i++) {
                    var deptID = departments[i].departmentId;
                    populateEmployees(deptID);
                    //POPULATE EMPLOYEES BASED OFF OF THE DEPARTMENT ID'S RETURNED.
                }
            })
        }
    }, [])












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
      <div>
            <h1>Welcome! Below is your account information...</h1>
            <p>{JSON.stringify(user, null, 2)}</p>
            <br />
            <br />
            <p>
                Products: {products.length}
            </p>
            <p>
                Departments: {departments.length}
            </p>
            <p>
                Employees: {employees.length}
            </p>
      </div>
    );
}
