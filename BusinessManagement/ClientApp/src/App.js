import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useAuth0 } from '@auth0/auth0-react';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Product } from './components/Product';
import axios from 'axios'; //*REMOVE AXIOS FROM PROJECT*\\
import './custom.css';
import { Department } from './components/Department';

const App = () => {
    const { isLoading, isAuthenticated, user } = useAuth0();

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    const [departments, setDepartments] = useState([]);
    const [departmentsLoading, setDepartmentsLoading] = useState(true);

    const [employees, setEmployees] = useState([]);
    const [employeesLoading, setEmployeesLoading] = useState(true);

    const [productToEdit, setProductToEdit] = useState({});




    //////////////////////////////////////////////////////////////////////////////// ** PRODUCT CONTROLLER FUNCTIONS ** \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //ADD A PRODUCT
    async function addProduct(e) {
        e.preventDefault();
        var msg = document.getElementById('add-product-msg');
        msg.style.color = "#635dff"
        msg.innerHTML = "Creating Product..."
        var productName = e.target[0].value;
        var unitPrice = e.target[1].value;
        var unitsInStock = e.target[2].value;

        if (!productName || !unitPrice || !unitsInStock) {
            msg.style.color = "red";
            msg.innerHTML = "Please ensure all fields are filled out."
        } else if (unitPrice > 10000000 || unitPrice < 1) {
            msg.style.color = "red";
            msg.innerHTML = "Unit Price must be between $1.00 - $10,000,000.00"
        } else if (unitsInStock > 10000 || unitsInStock < 1) {
            msg.style.color = 'red';
            msg.innerHTML = "Units in stock must be between 1 - 10,000."
        } else {
            const productToAdd = {
                companyId: user.sub,
                productName: productName,
                unitPrice: unitPrice,
                unitsInStock: unitsInStock
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToAdd)
            }
            const response = await fetch("/products", requestOptions);
            const data = await response.json();
            setProducts(data);
            msg.style.color = "limeGreen";
            msg.innerHTML = "Product Added!"
            for (let i = 0; i < 3; i++) {
                e.target[i].value = "";
            }
        }
    }

    //MODIFY AN EXISTING PRODUCT
    async function modifyProduct(productId, e) {
        e.preventDefault();
        var msg = document.getElementById('edit-product-msg');
        var productName = e.target[0].value;
        var unitPrice = e.target[1].value;
        var unitsInStock = e.target[2].value;

        msg.style.color = "#635dff"
        msg.innerHTML = "Modifying Product..."


        if (!productName || !unitPrice || !unitsInStock) {
            msg.style.color = "red";
            msg.innerHTML = "Please ensure all fields are filled out."
        } else if (unitPrice > 10000000 || unitPrice < 1) {
            msg.style.color = "red";
            msg.innerHTML = "Unit Price must be between $1.00 - $10,000,000.00"
        } else if (unitsInStock > 10000 || unitsInStock < 1) {
            msg.style.color = 'red';
            msg.innerHTML = "Units in stock must be between 1 - 10,000."
        } else {
            
            const productToEdit = {
                productId: productId,
                productName: productName,
                unitPrice: unitPrice,
                unitsInStock: unitsInStock
            }
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productToEdit)
            }

            const response = await fetch('/products/'+ user.sub, requestOptions);
            const data = await response.json();
            setProducts(data);
            msg.style.color = "limeGreen";
            msg.innerHTML = "Modified Successfully!"
            setProductToEdit(productToEdit);
            for (let i = 0; i < 3; i++) {
                e.target[i].value = "";
            }
        }
    }

    //DELETE A PRODUCT BY ID
    async function deleteById(productId) {
        const productToDelete = {
            companyId: user.sub,
            productId: productId
        }
        
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productToDelete)
        }
        const response = await fetch('/products', requestOptions);
        const data = await response.json();
        setProducts(data);
    }

    //INCREMENT OR DECREMENT QUANTITY OF A PRODUCT
    async function changeQty(productId, increment) {
        const productToChange = {
            companyId: user.sub,
            productId: productId,
            increment: increment
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productToChange)
        }

        const response = await fetch('/products', requestOptions);
        const data = await response.json();
        setProducts(data);
    }

    //POPULATE PRODUCTS USING ProductsController.cs
    async function populateProducts(companyID) {
        const response = await fetch('products/' + companyID);
        const data = await response.json();
        setProducts(data);
        setProductsLoading(false);
    }



    //////////////////////////////////////////////////////////////////////////// ** DEPARTMENT CONTROLLER FUNCTIONS ** \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //POPULATE DEPARTMENTS BY COMPANYID USING DepartmentsController.cs
    async function populateDepartments(companyID) {
        const response = await fetch('departments/' + companyID)
        const data = await response.json();
        setDepartments(data);
        setDepartmentsLoading(false);
        
    }


    //////////////////////////////////////////////////////////////////////////// ** EMPLOYEE CONTROLLER FUNCTIONS ** \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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
                <Route index="true" element={<Home products={products} productsLoading={productsLoading} departments={departments} departmentsLoading={departmentsLoading} employees={employees}
                    employeesLoading={employeesLoading} />} />

                <Route path="/counter" element={<Counter employees={employees} />} />

                <Route path="/fetch-data" element={<FetchData />} />

                <Route path="/product" element={<Product products={products} productsLoading={productsLoading} changeQty={changeQty} deleteById={deleteById} addProduct={addProduct} modifyProduct={modifyProduct}
                    productToEdit={productToEdit} setProductToEdit={setProductToEdit} />} />

                <Route path="/department" element={<Department departments={departments} departmentsLoading={departmentsLoading} employees={employees} employeesLoading={employeesLoading} /> } />
        </Routes>
      </Layout>
    );
}

export default App;
