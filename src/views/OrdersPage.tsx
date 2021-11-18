import React from 'react';
import {IconButton} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {Link} from 'react-router-dom';

const OrdersPage = () => {
    return (
        <div>
            <Link to={"/seller-dashboard"}>
                <IconButton aria-label={""} icon={<ArrowBackIcon/>}>
                    Back to last page
                </IconButton>
            </Link>
        </div>
    );
};

export default OrdersPage;