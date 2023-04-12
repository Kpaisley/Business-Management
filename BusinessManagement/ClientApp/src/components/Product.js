import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import './Product.css';

export const Product = (props) => {
    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        window.location.href = "";
    }


    return isAuthenticated && (
        <>
            <h3>View your products below!</h3>
            List of products here...
            
            
        </>
    )
}
