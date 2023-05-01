import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './NavMenu.css';

export const NavMenu = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  

    
    

  function toggleNavbar() {
    setCollapsed(!collapsed)
  }

  
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">Business Management</NavbarBrand>
          <NavbarToggler onClick={() => toggleNavbar()} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem hidden={!isAuthenticated}>
                <NavLink tag={Link} className="text-dark pulse-hover-sm" to="/product">Products</NavLink>
              </NavItem>
              <NavItem hidden={!isAuthenticated}>
                            <NavLink tag={Link} className="text-dark pulse-hover-sm" to="/department">Departments</NavLink>
              </NavItem>
              <NavItem hidden={!isAuthenticated}>
                            <NavLink tag={Link} className="text-dark pulse-hover-sm" to="/employee">Employees</NavLink>
              </NavItem>
              <NavItem hidden={!isAuthenticated}>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem hidden={!isAuthenticated}>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
              <NavItem hidden={isAuthenticated}>
                            <NavLink tag={Link} className="text-dark pulse-hover-sm" to="/" onClick={() => loginWithRedirect()}>Login/Signup</NavLink>
              </NavItem>
              <NavItem hidden={!isAuthenticated}>
                <NavLink tag={Link} className="text-dark pulse-hover-sm" to="/" onClick={() => logout()}>Logout</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
}
