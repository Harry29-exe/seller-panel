import React from 'react';
import {Box, Center, VStack} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";
import ChartModule from "../molecules/ChartModule";

const SalesChart = () => {
    return (
        <VStack>
            <Box>
                <FormattedMessage
                    id="SalesChart_GREETINGS"
                    defaultMessage="Sales chart"
                    description="chart view greeting"
                />
            </Box>

            <ChartModule/>
        </VStack>
    );
};

export default SalesChart;