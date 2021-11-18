import React, {useEffect, useState} from 'react';
import {Alert, AlertIcon, useBreakpointValue} from "@chakra-ui/react";
import {Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {DataOnDiagram, DiagramType, TimePeriod} from "../logic/ChartInfo";
import {ChartDataInfo, DataRow} from "../logic/ChartData";

const margins = {
    top: 5,
    right: 20,
    bottom: 5,
    left: -10
}

const Chart = (props: { chartData: ChartDataInfo }) => {
    const chartProps = props.chartData;
    const [width, setWith] = useState<number>(0);
    const height = useBreakpointValue([350, 400, 500, 550])

    useEffect(() => {
        const updateW = () => {
            let winW = window.innerWidth;
            let tempW = winW < 480 ?
                winW * 0.8 :
                winW > 900 ?
                    winW * 0.7 :
                    winW * 0.8;
            setWith(tempW);
        }
        updateW();
        window.addEventListener('resize', updateW);

        return () => {
            window.removeEventListener('resize', updateW);
        }
    }, [])

    const chartData: DataRow[] = getChartData(chartProps);
    const chartInfo = props.chartData.info;

    if (chartProps.info.diagramType === DiagramType.LINE_CHART) {
        return (
            <>
                <LineChart width={width} height={height}
                           data={chartData} margin={margins}>
                    <CartesianGrid stroke={"rgba(204,204,204,0.4)"}/>
                    <XAxis dataKey="x"/>
                    <YAxis/>
                    <Line type="monotone" dataKey="y1" stroke={chartInfo.firstSetColor.toRGBA()}
                          dot={{
                              fill: chartInfo.firstSetColor.toRGBA(0.6),
                              stroke: chartInfo.firstSetColor.toRGBA(0.6)
                          }}/>
                    {chartProps.info.secondDataSet &&
                    <Line type="monotone" dataKey="y2" stroke={chartInfo.secondSetColor.toRGBA()}
                          dot={{
                              fill: chartInfo.secondSetColor.toRGBA(0.6),
                              stroke: chartInfo.secondSetColor.toRGBA(0.6)
                          }}/>
                    }
                    <Tooltip/>

                </LineChart>
            </>
        );
    } else if (chartProps.info.diagramType === DiagramType.BAR_CHART) {
        return (
            <>
                <BarChart width={width} height={height}
                          data={chartData} margin={margins}>
                    <Tooltip/>
                    <CartesianGrid stroke={"#ccc"}/>
                    <XAxis dataKey="x"/>
                    <YAxis/>
                    <Bar type="monotone" dataKey="y1" fill={chartInfo.firstSetColor.toRGBA()}/>
                    {chartProps.info.secondDataSet &&
                    <Bar type="monotone" dataKey="y2" fill={chartInfo.secondSetColor.toRGBA()}/>
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