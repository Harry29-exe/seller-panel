import React, {useState} from 'react';
import Chart from "../atomics/Chart";
import {HStack, Select, VStack} from "@chakra-ui/react";
import {ChartContext, ChartData, DataOnDiagram, DiagramType, TimePeriod} from '../contexts/ChartContext';
import OptionButton from "../atomics/OptionButton";

const data = [
    {x: 1,  y1: 100, y2: 50},
    {x: 2,  y1: 130, y2: 120},
    {x: 3,  y1: 150, y2: 210},
    {x: 4,  y1:  50, y2: 110},
    {x: 5,  y1: 200, y2: 130},
    {x: 6,  y1:  80, y2: 120},
    {x: 7,  y1: 110, y2: 120},
    {x: 8,  y1: 170, y2: 50},
    {x: 9,  y1:  70, y2: 230},
    {x: 10, y1: 170, y2: 180},
]

const ChartModule = () => {
    const [chartData, updateChartData] = useState<ChartData>(new ChartData(data))

    const update = () => updateChartData(chartData.clone());

    return (
        <VStack>
            <Chart data={chartData}/>
            <HStack>

                <OptionButton options={[
                    [DiagramType.BAR_CHART, "bar chart"],
                    [DiagramType.LINE_CHART, "line chart"]
                ]} onChange={(event: any) => {
                    chartData.diagramType = Number.parseInt(event.target.value);
                    update();
                }} />
                <OptionButton options={[
                    [TimePeriod.YEAR, "Year"],
                    [TimePeriod.MONTH, "Month"],
                    [TimePeriod.DAY, "Day"]
                ]} onChange={(event: any) => {
                    chartData.timePeriod = Number.parseInt(event.target.value);
                    update();
                }} />
                <OptionButton options={[
                    [DataOnDiagram.SALES_VALUE, "Sales value"],
                    [DataOnDiagram.SOLD_UNITS, "Units sold"]
                ]} onChange={(event: any) => {
                    chartData.dataType = Number.parseInt(event.target.value);
                    update();
                }} />

            </HStack>
        </VStack>
    );
};

export default ChartModule;