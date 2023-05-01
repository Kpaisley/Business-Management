import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
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

    function addProduct() {
        var addModal = document.getElementById('add-product-modal');
        var editModal = document.getElementById('edit-product-modal');
        var msg = document.getElementById('add-product-msg');
        editModal.style.left = '-100%';
        addModal.style.left = '20vw';
        msg.innerHTML = "";
        
    }

    function closeModal() {
        var addModal = document.getElementById('add-product-modal');
        var editModal = document.getElementById('edit-product-modal');
        editModal.style.left = "-100%";
        addModal.style.left = '-100%';
    }

    function editProduct(product) {
        props.setProductToEdit(product);
        var editModal = document.getElementById('edit-product-modal');
        var addModal = document.getElementById('add-product-modal');
        var msg = document.getElementById('edit-product-msg');
        addModal.style.left = '-100%';
        editModal.style.left = '20vw';
        msg.innerHTML = "";
    }



    if (!isAuthenticated) {
        window.location.href = "";
    }

    else if (isAuthenticated && props.productsLoading) {
        return (
            <div className="loader"></div>
        )
    }

    else if (isAuthenticated && props.products.length <= 0) {
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
                <br />
                <h3><u>Add a Product!</u></h3>
               
                <div className="product-modal-content">
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

            <div id="edit-product-modal">
                <span className="close-modal-btn" onClick={() => closeModal()}><FontAwesomeIcon icon={faXmark} className="pulse-hover" /></span>
                <br />
                <h3><u>Modify {props.productToEdit.productName}</u></h3>

                <div className="product-modal-content">
                    <form onSubmit={(e) => props.modifyProduct(props.productToEdit.productId, e) }>
                        <label htmlFor="product-name"><strong>Product Name *</strong></label>
                        <input className="product-input" type="text" name="product-name" placeholder={props.productToEdit.productName} maxLength="49" ></input>

                        <label htmlFor="unit-price"><strong>Unit Price *</strong></label>
                        <input className="product-input" type="number" min=".01" step=".01" name="unit-price" placeholder={props.productToEdit.unitPrice}  ></input>

                        <label htmlFor="units-in-stock"><strong>Units in Stock *</strong></label>
                        <input className="product-input" type="number" min="1" name="units-in-stock" placeholder={props.productToEdit.unitsInStock} ></input>
                        
                        <input className="submit-btn" type="submit" value="Continue"></input>
                        <span id="edit-product-msg"></span>
                    </form>
                </div>
            </div>



            <h3>Browse your products below!</h3>
            <span className="create-btn pulse-hover" onClick={() => addProduct() }  ><span><FontAwesomeIcon icon={faPlus} /></span>Create</span>
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
                    <ProductItem key={product.productId} product={product} changeQty={props.changeQty} deleteProduct={props.deleteProduct} editProduct={editProduct} />
                )
            })}
            <h5>Total Products: {props.products.length}</h5>
            <h5>Total Quantity: {getTotalQty()}</h5>
        </div>
    )
}
