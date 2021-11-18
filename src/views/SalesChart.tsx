import React from 'react';
import {Box, VStack} from "@chakra-ui/react";
import ChartModule from "../molecules/ChartModule";

const SalesChart = () => {
    return (
        <VStack mx={[3, 5, 7]}>
            <Box h={"50px"}/>
            <ChartModule/>
        </VStack>
    );
};

export default SalesChart;