import React from 'react';
import OptionButton from "../atomics/OptionButton";
import {Box, Flex, HStack, Switch, useBreakpointValue} from "@chakra-ui/react";
import {chartModuleMessages} from "./ChartModule";
import {useIntl} from "react-intl";
import {ChartInfo, DataOnDiagram, DiagramType, TimePeriod} from "../logic/ChartInfo";

export interface ChartOptionPanelProps {
    chartInfo: ChartInfo,
    updateChart: () => any
}

const ChartOptionPanel = (props: ChartOptionPanelProps) => {
    const intl = useIntl();
    const chartInfo = props.chartInfo;
    const update = props.updateChart;
    const maxW = useBreakpointValue(["80%", "45%", "30%"])
    const py = useBreakpointValue(["6px", "8px", "12px"])

    return (
        <Flex wrap="wrap" justifyContent="space-evenly" w="100%" px={[3, 4, 5]}>

            <OptionButton maxW={maxW} py={py}
                          options={[
                              [DiagramType.LINE_CHART, intl.formatMessage(chartModuleMessages.lineChar)],
                              [DiagramType.BAR_CHART, intl.formatMessage(chartModuleMessages.barChart)]
                          ]} onChange={(event: any) => {
                chartInfo.diagramType = Number.parseInt(event.target.value);
                update();
            }}/>
            <OptionButton maxW={maxW} py={py}
                          options={[
                              [TimePeriod.DAY, intl.formatMessage(chartModuleMessages.day)],
                              [TimePeriod.MONTH, intl.formatMessage(chartModuleMessages.month)],
                              [TimePeriod.YEAR, intl.formatMessage(chartModuleMessages.year)]
                          ]} onChange={(event: any) => {
                chartInfo.timePeriod = Number.parseInt(event.target.value);
                update();
            }}/>
            <OptionButton maxW={maxW} py={py}
                          options={[
                              [DataOnDiagram.SALES_VALUE, intl.formatMessage(chartModuleMessages.salesValue)],
                              [DataOnDiagram.SOLD_UNITS, intl.formatMessage(chartModuleMessages.unitsSold)]
                          ]} onChange={(event: any) => {
                chartInfo.dataType = Number.parseInt(event.target.value);
                update();
            }}/>

            <HStack fontSize="md" py={py}>
                <Switch defaultChecked={true} colorScheme="blue"
                        onChange={event => {
                            chartInfo.secondDataSet = !chartInfo.secondDataSet;
                            update();
                        }}/>
                <Box>
                    {intl.formatMessage(chartModuleMessages.displaySecondSet)}
                </Box>
            </HStack>

        </Flex>
    );
};

export default ChartOptionPanel;