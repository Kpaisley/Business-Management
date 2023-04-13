import React from "react";
import './ProductItem.css';

export const ProductItem = (props) => {

    return (
        <table className="product-item">
            <tbody>
                <tr>
                    <td>{props.productName}</td>
                    <td>${props.unitPrice}</td>
                    <td>{props.unitsInStock}</td>
                </tr>
                <tr>
                    <td>Modify</td>
                    <td>DELETE</td>
                    <td>+ -</td>
                </tr>
            </tbody>
        </table>

        
    )
}


