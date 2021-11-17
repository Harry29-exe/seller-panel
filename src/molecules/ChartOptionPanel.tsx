import React from 'react';
import OptionButton from "../atomics/OptionButton";
import {HStack, Switch} from "@chakra-ui/react";
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

    return (
        <HStack justifyContent="space-evenly" w="100%" px={5} spacing={4}>

            <OptionButton options={[
                [DiagramType.LINE_CHART, intl.formatMessage(chartModuleMessages.lineChar)],
                [DiagramType.BAR_CHART, intl.formatMessage(chartModuleMessages.barChart)]
            ]} onChange={(event: any) => {
                chartInfo.diagramType = Number.parseInt(event.target.value);
                update();
            }}/>
            <OptionButton options={[
                [TimePeriod.DAY, intl.formatMessage(chartModuleMessages.day)],
                [TimePeriod.MONTH, intl.formatMessage(chartModuleMessages.month)],
                [TimePeriod.YEAR, intl.formatMessage(chartModuleMessages.year)]
            ]} onChange={(event: any) => {
                chartInfo.timePeriod = Number.parseInt(event.target.value);
                update();
            }}/>
            <OptionButton options={[
                [DataOnDiagram.SALES_VALUE, intl.formatMessage(chartModuleMessages.salesValue)],
                [DataOnDiagram.SOLD_UNITS, intl.formatMessage(chartModuleMessages.unitsSold)]
            ]} onChange={(event: any) => {
                chartInfo.dataType = Number.parseInt(event.target.value);

                update();
            }}/>

            <Switch/>

        </HStack>
    );
};

export default ChartOptionPanel;