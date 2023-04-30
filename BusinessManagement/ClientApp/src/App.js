import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Counter } from './components/Counter';
import { Department } from './components/Department';
import { Employee } from './components/Employee';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { Product } from './components/Product';
import './custom.css';

const App = () => {
    const { isLoading, isAuthenticated, user } = useAuth0();

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);

    const [departments, setDepartments] = useState([]);
    const [departmentsLoading, setDepartmentsLoading] = useState(true);

    const [employees, setEmployees] = useState([]);
    const [employeesLoading, setEmployeesLoading] = useState(true);

    const [productToEdit, setProductToEdit] = useState({});

    const [departmentToEdit, setDepartmentToEdit] = useState({});

    const [employeeToEdit, setEmployeeToEdit] = useState({});




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
        } else if (productName.length > 50) {
            msg.style.color = "red";
            msg.innerHTML = "Product Name must be between 1 - 50 characters."
        } else if (unitPrice > 10000000 || unitPrice < 1) {
            msg.style.color = "red";
            msg.innerHTML = "Unit Price must be between $1.00 - $10,000,000.00"
        } else if (unitsInStock > 10000 || unitsInStock < 1) {
            msg.style.color = 'red';
            msg.innerHTML = "Units in stock must be between 1 - 10,000."
        } else {
                try {
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
                } catch {
                    msg.style.color = "red";
                    msg.innerHTML = "Something went wrong...";
                    console.log('Failed to add a product.')
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
        } else if (productName.length > 50) {
            msg.style.color = "red";
            msg.innerHTML = "Product Name must be between 1 - 50 characters."
        } else if (unitPrice > 10000000 || unitPrice < 1) {
            msg.style.color = "red";
            msg.innerHTML = "Unit Price must be between $1.00 - $10,000,000.00"
        } else if (unitsInStock > 10000 || unitsInStock < 1) {
            msg.style.color = 'red';
            msg.innerHTML = "Units in stock must be between 1 - 10,000."
        } else {
            try {
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

                const response = await fetch('/products/' + user.sub, requestOptions);
                const data = await response.json();
                setProducts(data);
                msg.style.color = "limeGreen";
                msg.innerHTML = "Modified Successfully!"
                setProductToEdit(productToEdit);
                for (let i = 0; i < 3; i++) {
                    e.target[i].value = "";
                }
            } catch {
                msg.style.color = "red";
                msg.innerHTML = "Something went wrong...";
                console.log('Failed to modify a product.')
                }
            
        }
    }

    //DELETE A PRODUCT BY ID
    async function deleteProduct(productId) {
        try {
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
        } catch {
            console.log('Failed to delete a product.')
        }
    }

    //INCREMENT OR DECREMENT QUANTITY OF A PRODUCT
    async function changeQty(productId, increment) {
        try {
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
        } catch {
            console.log('Failed to increment/decrement a product.')
        }
    }

    //POPULATE PRODUCTS USING ProductsController.cs
    async function populateProducts(companyID) {
        try {
            const response = await fetch('products/' + companyID);
            const data = await response.json();
            setProducts(data);
            setProductsLoading(false);
        } catch {
            console.log('Failed to populate products.')
        }
    }



    //////////////////////////////////////////////////////////////////////////// ** DEPARTMENT CONTROLLER FUNCTIONS ** \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    //ADD A DEPARTMENT
    async function addDepartment(e) {
        e.preventDefault();
        var msg = document.getElementById('add-department-msg');
        msg.style.color = "#635dff"
        msg.innerHTML = "Creating Department...";
        var departmentName = e.target[0].value;

        if (departmentName.length > 30 || !departmentName) {
            msg.style.color = "red";
            msg.innerHTML = "Department Name must be between 1 - 30 characters."
        }
        else {
            try {
                const departmentToAdd = {
                    companyId: user.sub,
                    departmentName: departmentName
                }

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(departmentToAdd)
                }
                const response = await fetch("/departments", requestOptions);
                const data = await response.json();

                setDepartments(data);
                msg.style.color = "limeGreen";
                msg.innerHTML = "Department Added!"
                
                e.target[0].value = "";
                
                
            }
            catch {
                msg.style.color = "red";
                msg.innerHTML = "Something went wrong...";
                console.log("Failed to add a department.")
            }
        }
    }

    //MODIFY AN EXISTING DEPARTMENT
    async function modifyDepartment(departmentId, e) {
        e.preventDefault();
        var msg = document.getElementById('edit-department-msg');
        var departmentName = e.target[0].value;

        msg.style.color = "#635dff"
        msg.innerHTML = "Modifying Department..."

        if (!departmentName || departmentName.length > 30) {
            msg.style.color = "red";
            msg.innerHTML = "Department Name must be between 1 - 30 characters."
        }
        else {
            try {
                const departmentToEdit = {
                    departmentId: departmentId,
                    departmentName: departmentName
                }
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(departmentToEdit)
                }

                const response = await fetch('/departments/' + user.sub, requestOptions);
                const data = await response.json();
                setDepartments(data);
                msg.style.color = "limeGreen";
                msg.innerHTML = "Modified Successfully!";
                setDepartmentToEdit(departmentToEdit);
                e.target[0].value = "";
                

            } catch {
                msg.style.color = "red";
                msg.innerHTML = "Something went wrong...";
                console.log('Failed to modify a department');
            }
        }

    }

    //DELETE A DEPARTMENT
    async function deleteDepartment(department) {
        if (window.confirm('Deleting a deparment will result in deleting all employees in the department. Do you want to continue?') === true) {
            try {
                const departmentToDelete = {
                    departmentId: department.departmentId,
                    companyId: user.sub
                }

                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(departmentToDelete)
                }

                const response = await fetch('/departments', requestOptions);
                const data = await response.json();

                setDepartments(data);
                populateEmployees(user.sub);
            }
            catch { 
                console.log("Something went wrong...");
            }
        }
    }

    //POPULATE DEPARTMENTS BY COMPANYID USING DepartmentsController.cs
    async function populateDepartments(companyID) {
        try {
            const response = await fetch('departments/' + companyID)
            const data = await response.json();
            setDepartments(data);
            setDepartmentsLoading(false);
        } catch {
            console.log('Failed to populate departments.')
        }
        
    }


    //////////////////////////////////////////////////////////////////////////// ** EMPLOYEE CONTROLLER FUNCTIONS ** \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    //ADD AN EMPLOYEE
    async function addEmployee(e) {
        e.preventDefault();
        var msg = document.getElementById('add-employee-msg');
        msg.style.color = "#635dff"
        msg.innerHTML = "Creating Department...";

        const employeeToAdd = {
            departmentId: e.target[4].value,
            firstName: e.target[0].value,
            lastName: e.target[1].value,
            position: e.target[2].value,
            salary: e.target[3].value
        }

        if (!employeeToAdd.firstName || !employeeToAdd.lastName || !employeeToAdd.position || !employeeToAdd.salary) {
            msg.style.color = "red";
            msg.innerHTML = "Please ensure all fields are filled out."
        }
        else if (!employeeToAdd.departmentId) {
            msg.style.color = "red";
            msg.innerHTML = "Employees must be part of a department."
        }
        else if (employeeToAdd.firstName.length > 25) {
            msg.style.color = "red";
            msg.innerHTML = "First Name must be between 0 - 25 characters."
        }
        else if (employeeToAdd.lastName.length > 25) {
            msg.style.color = "red";
            msg.innerHTML = "Last Name must be between 0 - 25 characters."
        }
        else if (employeeToAdd.position.length > 30) {
            msg.style.color = "red";
            msg.innerHTML = "Position must be between 0 - 30 characters."
        }
        else if (employeeToAdd.salary.length > 25) {
            msg.style.color = "red";
            msg.innerHTML = "Salary must be between 0 - 25 characters."
        }
        else
            try {

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(employeeToAdd)
                }

                const response = await fetch('/employees/' + user.sub, requestOptions);
                const data = await response.json();
                if (data == true) {
                    msg.style.color = "limeGreen";
                    msg.innerHTML = "Employee Added!"
                    populateEmployees(user.sub);
                }
                else {
                    msg.style.color = "red";
                    msg.innerHTML = "Something went wrong...";
                }                

                for (let i = 0; i < 5; i++) {
                    e.target[i].value = "";
                }
            }
            catch {
                msg.style.color = "red"
                msg.innerHTML = "Something went wrong...";
                console.log('Failed to add an employee.');
            }


    }

    //MODIFY AN EXISTING EMPLOYEE
    async function modifyEmployee(employeeId, e) {
        e.preventDefault();
        var msg = document.getElementById('edit-employee-msg');
        msg.style.color = "#635dff"
        msg.innerHTML = "Modifying Employee...";

        const employeeToModify = {
            departmentId: e.target[4].value,
            firstName: e.target[0].value,
            lastName: e.target[1].value,
            position: e.target[2].value,
            salary: e.target[3].value
        }
        if (!employeeToModify.firstName || !employeeToModify.lastName || !employeeToModify.position || !employeeToModify.salary) {
            msg.style.color = "red";
            msg.innerHTML = "Please ensure all fields are filled out."
        }
        else if (!employeeToModify.departmentId) {
            msg.style.color = "red";
            msg.innerHTML = "Employees must be part of a department."
        }
        else if (employeeToModify.firstName.length > 25) {
            msg.style.color = "red";
            msg.innerHTML = "First Name must be between 0 - 25 characters."
        }
        else if (employeeToModify.lastName.length > 25) {
            msg.style.color = "red";
            msg.innerHTML = "Last Name must be between 0 - 25 characters."
        }
        else if (employeeToModify.position.length > 30) {
            msg.style.color = "red";
            msg.innerHTML = "Position must be between 0 - 30 characters."
        }
        else if (employeeToModify.salary.length > 25) {
            msg.style.color = "red";
            msg.innerHTML = "Salary must be between 0 - 25 characters."
        }
        else {
            try {
                //Call API Here
            }
            catch {
                msg.style.color = "red"
                msg.innerHTML = "Something went wrong...";
                console.log('Failed to modify an employee.');
            }
        }
            
    }

    //DELETE AN EMPLOYEE
    async function deleteEmployee(employee) {
        try {
            const employeeToDelete = {
                companyId: user.sub,
                departmentId: employee.departmentId,
                employeeId: employee.employeeId
            }

            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeToDelete)
            }
            await fetch('/employees', requestOptions);
            populateEmployees(user.sub);
            
        }
        catch {
            console.log('Failed to delete an employee.')
        }
    }

    //POPULATE EMPLOYEES BY CALLING EACH DEPARTMENT FROM THE CompanyID AND THEN RETRIEVING EACH EMPLOYEE BY IT'S DepartmentId
    async function populateEmployees(companyID) {

        try {
            const response = await fetch('employees/' + companyID);
            const data = await response.json();
            setEmployees(data);
            setEmployeesLoading(false);
        }
        catch {
            console.log('Failed to populate employees.');
        }













        //SET EMPLOYEES TO EMPTY ARRAY PREVENTS DUPLICATE EMPLOYEES BEING ADDED TO ARRAY.
        /*setEmployees([]);*/

        //try {
        //    const response = await fetch('departments/' + companyID)
        //    const data = await response.json();
        //    for (let i = 0; i < data.length; i++) {
        //        let departmentID = data[i].departmentId;
        //        let res = await fetch('employees/' + departmentID);
        //        let data2 = await res.json();
        //        for (let x = 0; x < data2.length; x++) {
        //            setEmployees(employees => [...employees, data2[x]])
        //        }
        //    }
        //    setEmployeesLoading(false);
        //} catch {
        //    console.log('Failed to populate employees.')
        //}
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

                <Route path="/product" element={<Product products={products} productsLoading={productsLoading} changeQty={changeQty} deleteProduct={deleteProduct}
                    addProduct={addProduct} modifyProduct={modifyProduct} productToEdit={productToEdit} setProductToEdit={setProductToEdit} />} />

                <Route path="/department" element={<Department departments={departments} departmentsLoading={departmentsLoading} employees={employees} employeesLoading={employeesLoading}
                    addDepartment={addDepartment} deleteDepartment={deleteDepartment} modifyDepartment={modifyDepartment} departmentToEdit={departmentToEdit} setDepartmentToEdit={setDepartmentToEdit} />} />

                <Route path="/employee" element={<Employee employees={employees} employeesLoading={employeesLoading} departments={departments} addEmployee={addEmployee}
                    deleteEmployee={deleteEmployee} modifyEmployee={modifyEmployee} employeeToEdit={employeeToEdit} setEmployeeToEdit={setEmployeeToEdit} />} />
        </Routes>
      </Layout>
    );
}

export default App;
