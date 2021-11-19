import React from 'react';
import {Alert, AlertIcon} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";

const NoOrdersBanner = () => {
    return (
        <Alert status="info">
            <AlertIcon/>
            <FormattedMessage id={"Orders_NoOrders"}
                              defaultMessage={"You have no active orders, would you like " +
                              "to use our offer promotion service"}/>
        </Alert>
    );
};

export default NoOrdersBanner;