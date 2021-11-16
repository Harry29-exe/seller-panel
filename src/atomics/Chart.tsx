import React from 'react';
import {Alert, AlertIcon} from "@chakra-ui/react";
import {Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {ChartData, DataOnDiagram, DataRow, DiagramType, TimePeriod} from "../contexts/ChartContext";

const margins = {
    top: 5,
    right: 20,
    bottom: 5,
    left: -10
}

const Chart = (props: { chartData: ChartData }) => {
    const chartProps = props.chartData;
    let chartData: DataRow[] = getChartData(chartProps);

    if (chartProps.diagramType === DiagramType.LINE_CHART) {
        return (
            <>
                <LineChart width={600} height={400}
                           data={chartData} margin={margins}>
                    <CartesianGrid stroke={"rgba(204,204,204,0.4)"}/>
                    <XAxis dataKey="x"/>
                    <YAxis/>
                    <Line type="monotone" dataKey="y2" stroke={"#5af"}
                          dot={{fill: "#5af", stroke: "rgba(84,169,253,0.6)"}}/>
                    <Line type="monotone" dataKey="y1" stroke={"#5c2"}
                          dot={{fill: "#5c2", stroke: "rgba(85,204,34,0.6)"}}/>
                    <Tooltip/>

                </LineChart>
            </>
        );
    } else if (chartProps.diagramType === DiagramType.BAR_CHART) {
        return (
            <>
                <BarChart width={600} height={400}
                          data={chartData} margin={margins}>
                    <Tooltip/>
                    <CartesianGrid stroke={"#ccc"}/>
                    <XAxis dataKey="x"/>
                    <YAxis/>
                    <Bar type="monotone" dataKey="y1" fill="#5c2"/>
                    <Bar type="monotone" dataKey="y2" fill="#5af"/>
                </BarChart>
            </>
        );
    } else {
        return (
            <Alert status="error">
                <AlertIcon/>
            </Alert>
        )
    }
};

function getChartData(chartProps: ChartData): DataRow[] {
    let chartData: DataRow[];
    switch (chartProps.timePeriod) {
        case TimePeriod.DAY:
            if (chartProps.dataType === DataOnDiagram.SALES_VALUE)
                chartData = chartProps.data.dayValue;
            else
                chartData = chartProps.data.dayUnits;
            break;
        case TimePeriod.MONTH:
            if (chartProps.dataType === DataOnDiagram.SALES_VALUE)
                chartData = chartProps.data.monthValue;
            else
                chartData = chartProps.data.monthUnits;
            break;
        case TimePeriod.YEAR:
            if (chartProps.dataType === DataOnDiagram.SALES_VALUE)
                chartData = chartProps.data.yearValue;
            else
                chartData = chartProps.data.yearUnits;
            break;
    }

    return chartData;
}

export default Chart;