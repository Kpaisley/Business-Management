import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './ProductItem.css';
import { faBorderAll } from "../../../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";

export const ProductItem = (props) => {

    return (
        <table className="product-item">
            <tbody>
                <tr>
                    <td>{props.productName}</td>
                    <td>${props.unitPrice}</td>
                    <td className="qty-btns">
                        <FontAwesomeIcon style={{ marginTop: '4px' }} className="pulse-hover" icon={faPlus} color="#635dff" width="25px" onClick={() => props.changeQty(props.productId, 1)} />
                        <span className="prevent-select">{props.unitsInStock}</span>
                        <FontAwesomeIcon style={{ marginTop: '4px' }} className="pulse-hover" icon={faMinus} color="#635dff" width="25px" onClick={() => props.changeQty(props.productId, 0)} />
                    </td>
                </tr>
                <tr>
                    <td><FontAwesomeIcon className="pulse-hover" icon={faPen} color="#635dff" /></td>
                    <td><FontAwesomeIcon className="shake-hover" icon={faTrash} color="red" /></td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        
    )
}


