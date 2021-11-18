import React from 'react';
import ComponentBg from "../atomics/ComponentBG";
import {Link} from "react-router-dom";

const Order = (props: {}) => {
    return (
        <ComponentBg>
            <Link to={"/seller-dashboard/orders"}>
                Orders page
            </Link>
        </ComponentBg>
    );
};

export default Order;