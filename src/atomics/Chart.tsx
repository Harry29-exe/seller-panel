import React from 'react';
import {Alert, AlertIcon} from "@chakra-ui/react";
import {Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {DataOnDiagram, DiagramType, TimePeriod} from "../logic/ChartInfo";
import {ChartDataInfo, DataRow} from "../logic/ChartData";

const margins = {
    top: 5,
    right: 20,
    bottom: 5,
    left: -10
}

const Chart = (props: { chartData: ChartDataInfo, secondDataSeries: boolean }) => {
    const chartProps = props.chartData;
    let chartData: DataRow[] = getChartData(chartProps);

    if (chartProps.info.diagramType === DiagramType.LINE_CHART) {
        return (
            <>
                <LineChart width={700} height={400}
                           data={chartData} margin={margins}>
                    <CartesianGrid stroke={"rgba(204,204,204,0.4)"}/>
                    <XAxis dataKey="x"/>
                    <YAxis/>
                    <Line type="monotone" dataKey="y1" stroke={"#5c2"}
                          dot={{fill: "#5c2", stroke: "rgba(85,204,34,0.6)"}}/>
                    {props.secondDataSeries &&
                    <Line type="monotone" dataKey="y2" stroke={"#5af"}
                          dot={{fill: "#5af", stroke: "rgba(84,169,253,0.6)"}}/>
                    }
                    <Tooltip/>

                </LineChart>
            </>
        );
    } else if (chartProps.info.diagramType === DiagramType.BAR_CHART) {
        return (
            <>
                <BarChart width={700} height={400}
                          data={chartData} margin={margins}>
                    <Tooltip/>
                    <CartesianGrid stroke={"#ccc"}/>
                    <XAxis dataKey="x"/>
                    <YAxis/>
                    <Bar type="monotone" dataKey="y1" fill="#5c2"/>
                    {props.secondDataSeries &&
                    <Bar type="monotone" dataKey="y2" fill="#5af"/>
                    }
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

function getChartData(chartProps: ChartDataInfo): DataRow[] {
    const chartInfo = chartProps.info;
    let chartData: DataRow[];

    switch (chartInfo.timePeriod) {
        case TimePeriod.DAY:
            if (chartInfo.dataType === DataOnDiagram.SALES_VALUE)
                chartData = chartProps.data.dayValue;
            else
                chartData = chartProps.data.dayUnits;
            break;
        case TimePeriod.MONTH:
            if (chartInfo.dataType === DataOnDiagram.SALES_VALUE)
                chartData = chartProps.data.monthValue;
            else
                chartData = chartProps.data.monthUnits;
            break;
        case TimePeriod.YEAR:
            if (chartInfo.dataType === DataOnDiagram.SALES_VALUE)
                chartData = chartProps.data.yearValue;
            else
                chartData = chartProps.data.yearUnits;
            break;
    }

    return chartData;
}

export default Chart;