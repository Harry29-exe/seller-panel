import React from 'react';
import {Box, VStack} from "@chakra-ui/react";
import ChartModule from "../molecules/ChartModule";

const SalesChart = () => {
    return (
        <VStack>
            <Box h={"50px"}/>
            <ChartModule/>
        </VStack>
    );
};

export default SalesChart;