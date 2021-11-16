import React from 'react';
import {Alert, AlertIcon, Center} from "@chakra-ui/react";
import {Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {ChartData, DataOnDiagram, DataRow, DiagramType, TimePeriod} from "../contexts/ChartContext";

const Chart = (props: { chartData: ChartData }) => {
    const chartProps = props.chartData;
    let chartData: DataRow[];

    switch (chartProps.timePeriod) {
        case TimePeriod.DAY:
            if (chartProps.dataType == DataOnDiagram.SALES_VALUE)
                chartData = chartProps.data.dayValue;
            else
                chartData = chartProps.data.dayUnits;
            break;
        case TimePeriod.MONTH:
            if (chartProps.dataType == DataOnDiagram.SALES_VALUE)
                chartData = chartProps.data.monthValue;
            else
                chartData = chartProps.data.monthUnits;
            break;
        case TimePeriod.YEAR:
            if (chartProps.dataType == DataOnDiagram.SALES_VALUE)
                chartData = chartProps.data.yearValue;
            else
                chartData = chartProps.data.yearUnits;
            break;
    }

    if (chartProps.diagramType == DiagramType.LINE_CHART) {
        return (
            <Center pt={10}>
                <LineChart width={600} height={400} data={chartData}>
                    <CartesianGrid stroke={"#ccc"}/>
                    <XAxis dataKey="x"/>
                    <YAxis dataKey="y2"/>
                    <Line type="monotone" dataKey="y1" stroke="#5c2"/>
                    <Line type="monotone" dataKey="y2" stroke="#5af"/>
                    <Tooltip/>

                </LineChart>
            </Center>
        );
    } else if (chartProps.diagramType == DiagramType.BAR_CHART) {
        return (
            <Center pt={10}>
                <BarChart width={600} height={400} data={chartData}>
                    <Tooltip/>
                    <CartesianGrid stroke={"#ccc"}/>
                    <XAxis dataKey="x"/>
                    <YAxis dataKey="y2"/>
                    <Bar type="monotone" dataKey="y1" fill="#5c2"/>
                    <Bar type="monotone" dataKey="y2" fill="#5af"/>
                </BarChart>
            </Center>
        );
    } else {
        return (
            <Alert status="error">
                <AlertIcon/>
            </Alert>
        )
    }
};

export default Chart;