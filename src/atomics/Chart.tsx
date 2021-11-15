import React from 'react';
import {Alert, AlertIcon, Center} from "@chakra-ui/react";
import {Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {ChartData, DiagramType} from "../contexts/ChartContext";

const Chart = (props: {data: ChartData}) => {
    const chartData = props.data;

    if(chartData.diagramType == DiagramType.LINE_CHART) {
        return (
            <Center pt={10}>
                <LineChart width={600} height={400} data={chartData.data}>
                    <CartesianGrid stroke={"#ccc"}/>
                    <XAxis dataKey="x"/>
                    <YAxis dataKey="y2"/>
                    <Line type="monotone" dataKey="y1" stroke="#5c2"/>
                    <Line type="monotone" dataKey="y2" stroke="#5af"/>
                    <Tooltip/>

                </LineChart>
            </Center>
        );
    } else if (chartData.diagramType == DiagramType.BAR_CHART) {
        return (
        <Center pt={10}>
            <BarChart width={600} height={400} data={chartData.data}>
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