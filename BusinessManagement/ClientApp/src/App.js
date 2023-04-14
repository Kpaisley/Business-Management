import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useAuth0 } from '@auth0/auth0-react';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Product } from './components/Product';
import axios from 'axios';
import './custom.css';

const App = () => {
    const { isLoading, isAuthenticated, user } = useAuth0();

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    const [departments, setDepartments] = useState([]);
    const [departmentsLoading, setDepartmentsLoading] = useState(true);

    const [employees, setEmployees] = useState([]);
    const [employeesLoading, setEmployeesLoading] = useState(true);


    function changeQty(productId, num) {
        var increment;
        if (num == 1) {
            increment = true;
        } else
            increment = false;
        changeProductQty(productId, increment);
    }


    //POPULATE PRODUCTS USING ProductsController.cs
    async function populateProducts(companyID) {
        const response = await fetch('products/' + companyID);
        const data = await response.json();
        setProducts(data);
        setProductsLoading(false);
    }

    //INCREMENT OR DECREMENT THE QUANTITY OF A PRODUCT
    async function changeProductQty(productId, increment) {

        const productToChange = {
            companyId: user.sub,
            productId: productId,
            increment: increment
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productToChange)
        }

        const response = await fetch('/products', requestOptions);
        const data = await response.json();
        setProducts(data);
    }


    //POPULATE DEPARTMENTS BY COMPANYID USING DepartmentsController.cs
    async function populateDepartments(companyID) {
        const response = await fetch('departments/' + companyID)
        const data = await response.json();
        setDepartments(data);
        setDepartmentsLoading(false);
        
    }

    //POPULATE EMPLOYEES BY CALLING EACH DEPARTMENT FROM THE CompanyID AND THEN RETRIEVING EACH EMPLOYEE BY IT'S DepartmentId
    async function populateEmployees(companyID) {
        const response = await fetch('departments/' + companyID)
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            let departmentID = data[i].departmentId;
            let res = await fetch('employees/' + departmentID);
            let data2 = await res.json();
            for (let x = 0; x < data2.length; x++) {
                setEmployees(employees => [...employees, data2[x]])
            }
        }
        setEmployeesLoading(false);
    }



   
    

    //POPULATE DEPARTMENTS, EMPLOYEES && PRODUCTS ONCE A USER IS LOGGED IN & AUTHENTICATED
    useEffect(() => {
        if (isAuthenticated) {
            populateProducts(user.sub).then(populateDepartments(user.sub)).then(populateEmployees(user.sub));
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
                <Route path="/counter" element={<Counter employees={employees} />} />
                <Route path="/fetch-data" element={<FetchData />} />
                <Route path="/product" element={<Product products={products} changeQty={changeQty} />} />
        </Routes>
      </Layout>
    );
}

export default App;
