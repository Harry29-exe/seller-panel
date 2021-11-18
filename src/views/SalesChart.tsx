import React from 'react';
import {VStack} from "@chakra-ui/react";
import ChartModule from "../molecules/ChartModule";
import SellerPanelComponentRegister from "../molecules/SellerPanelComponentRegister";
import {defineMessage} from "react-intl";

const message = defineMessage({
    id: "salesChart",
    defaultMessage: "Sales chart"
});

const SalesChart = () => {
    return (
        <VStack w="100%">
            <SellerPanelComponentRegister message={message} elementId={"salesChart"}/>
            <ChartModule/>
        </VStack>
    );
};

export default SalesChart;