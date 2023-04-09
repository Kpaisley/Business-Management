import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useAuth0 } from '@auth0/auth0-react';
import './custom.css';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';

const App = () => {
    const { isLoading, isAuthenticated, user } = useAuth0();

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    const [departments, setDepartments] = useState([]);
    const [departmentsLoading, setDepartmentsLoading] = useState(true);

    const [employees, setEmployees] = useState([]);
    const [employeesLoading, setEmployeesLoading] = useState(true);


    //POPULATE PRODUCTS USING ProductsController.cs
    async function populateProducts(companyID) {
        const response = await fetch('products/' + companyID);
        const data = await response.json();
        setProducts(data);
        setProductsLoading(false);
    }

    //POPULATE DEPARTMENTS USING DepartmentsController.cs
    async function populateDepartments(companyID) {
        const response = await fetch('departments/' + companyID)
        const data = await response.json();
        setDepartments(data);
        setDepartmentsLoading(false);
    }
    async function populateEmployees(deptID) {
        //CALL EMPLOYEES API HERE PASSING THE deptID AS A PARAMETER TO RETURN EACH EMPLOYEE FROM EACH DEPT AND PUSH IT TO THE EMPLOYEE ARRAY.
        console.log('Populating Employees')
    }


   
    

    //POPULATE DEPARTMENTS, EMPLOYEES && PRODUCTS
    useEffect(() => {
        if (isAuthenticated) {
            populateProducts(user.sub).then(populateDepartments(user.sub));
            



            //populateProducts().then(populateDepartments()).then(() => { 
            //    for (let i = 0; i < departments.length; i++) {
            //        var deptID = departments[i].departmentId;
            //        populateEmployees(deptID);
            //        //POPULATE EMPLOYEES BASED OFF OF THE DEPARTMENT ID'S RETURNED.
            //    }
            //})
        }
    }, [isAuthenticated])

    

    
    



    if (isLoading) {
        return (
            <div className="loader"></div>
        );
    }

    return (
      <Layout>
        <Routes>
                <Route index="true" element={<Home products={products} productsLoading={productsLoading} departments={departments} departmentsLoading={departmentsLoading} employees={employees} employeesLoading={employeesLoading} />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/fetch-data" element={<FetchData />} />
        </Routes>
      </Layout>
    );
}

export default App;
