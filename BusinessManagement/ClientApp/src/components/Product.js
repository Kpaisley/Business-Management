﻿import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
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

    function displayModal() {
        var modal = document.getElementById('add-product-modal');
        var msg = document.getElementById('add-product-msg');
        modal.style.left = '25vw';
        msg.innerHTML = "";
        
    }

    function closeModal() {
        var modal = document.getElementById('add-product-modal');
        modal.style.left = '-100%';
    }




    if (!isAuthenticated) {
        window.location.href = "";
    }

    else if (props.products.length <= 0) {
        return (
            <div className="product-page">
                <h3>It looks like you dont have any products stored.</h3>
                

                
                    <h4><u>Add a Product Below!</u></h4>

                    
                        <form className="add-product-form" onSubmit={(e) => props.addProduct(e)}>
                            <label htmlFor="product-name"><strong>Product Name *</strong></label>
                            <input className="product-input" type="text" name="product-name" placeholder="Baseball Cap" maxLength="49" ></input>

                            <label htmlFor="unit-price"><strong>Unit Price *</strong></label>
                            <input className="product-input" type="number" min=".01" step=".01" name="unit-price" placeholder="$14.99"  ></input>

                            <label htmlFor="units-in-stock"><strong>Units in Stock *</strong></label>
                            <input className="product-input" type="number" min="1" name="units-in-stock" placeholder="8" ></input>
                            <input className="submit-btn" type="submit" value="Add Product"></input>
                            <span id="add-product-msg"></span>
                        </form>
                    
                
            </div>
            )
    }
    else 
    return isAuthenticated && (
        <div className="product-page">

            <div id="add-product-modal" >
                <span className="close-modal-btn" onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark} className="pulse-hover" /></span>
                <h3><u>Add a Product!</u></h3>
                
                <div id="modal-content" className="modal-content">
                    <form onSubmit={(e) => props.addProduct(e)}>
                        <label htmlFor="product-name"><strong>Product Name *</strong></label>
                        <input className="product-input" type="text" name="product-name" placeholder="Baseball Cap" maxLength="49" ></input>

                        <label htmlFor="unit-price"><strong>Unit Price *</strong></label>
                        <input className="product-input" type="number" min=".01" step=".01" name="unit-price" placeholder="$14.99"  ></input>

                        <label htmlFor="units-in-stock"><strong>Units in Stock *</strong></label>
                        <input className="product-input" type="number" min="1" name="units-in-stock" placeholder="8" ></input>
                        <input className="submit-btn" type="submit" value="Add Product"></input>
                        <span id="add-product-msg"></span>
                    </form>
                </div>
            </div>



            <h3>Browse your products below!</h3>
            <span className="add-product-btn pulse-hover" onClick={() => displayModal() }  ><span><FontAwesomeIcon icon={faPlus} /></span>Create</span>
            <table className="product-desc">
                <thead>
                    <tr>
                        <th><u>Product Name</u></th>
                        <th><u>Unit Price</u></th>
                        <th><u>Quantity</u></th>
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
