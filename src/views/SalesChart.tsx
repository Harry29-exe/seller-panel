import React from 'react';
import {Box, VStack} from "@chakra-ui/react";
import ChartModule from "../molecules/ChartModule";
import SellerPanelComponentRegister from "../molecules/SellerPanelComponentRegister";
import {defineMessage} from "react-intl";

const message = defineMessage({
    id: "salesChart",
    defaultMessage: "Sales chart"
});

const SalesChart = () => {
    return (
        <VStack mx={[3, 5, 7]}>
            <Box h={"50px"}/>
            <SellerPanelComponentRegister message={message} elementId={"salesChart"}/>
            <ChartModule/>
        </VStack>
    );
};

export default SalesChart;