import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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

    if (props.products.length <= 0) {
        return (
            <div className="product-page">
                <h3>It looks like you dont have any products stored. Add one below!</h3>
                <h5>Total Products: {props.products.length}</h5>
                <h5>Total Quantity: {getTotalQty()}</h5>
            </div>
            )
    }

    return isAuthenticated && (
        <div className="product-page">
            <h3>Browse your products below!</h3>
            <span className="add-product-btn pulse-hover"  ><span><FontAwesomeIcon icon={faPlus} /></span>Create</span>
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
                return (
                    <ProductItem key={product.productId} productId={product.productId} productName={product.productName} unitPrice={product.unitPrice}
                        unitsInStock={product.unitsInStock} changeQty={props.changeQty} deleteById={props.deleteById} />
                )
            })}
            <h5>Total Products: {props.products.length}</h5>
            <h5>Total Quantity: {getTotalQty()}</h5>
        </div>
    )
}
