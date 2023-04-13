import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import './Product.css';
import { ProductItem } from "./ProductItem";

export const Product = (props) => {
    const { isAuthenticated } = useAuth0();

    function getTotalQty() {
        var total = 0;
        for (let i = 0; i < props.products.length; i++) {
            total += props.products[i].unitsInStock;
        }
        return total;
    }



    if (!isAuthenticated) {
        window.location.href = "";
    }

    return isAuthenticated && (
        <div className="product-page">
            <h3>Browse your products below!</h3>
            <table className="product-desc">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
            </table>
            
            {props.products.map((product) => {
                console.log(product);
                return (
                    <ProductItem key={product.productId} productName={product.productName} unitPrice={product.unitPrice} unitsInStock={product.unitsInStock} />
                )
            })}
            <h5>Total Products: {props.products.length}</h5>
            <h5>Total Quantity: {getTotalQty()}</h5>
        </div>
    )
}
