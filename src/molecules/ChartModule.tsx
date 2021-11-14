import React, {useState} from 'react';
import Chart from "../atomics/Chart";
import {HStack, Select, VStack} from "@chakra-ui/react";
import {ChartContext, ChartData, DiagramType} from '../contexts/ChartContext';

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

    return (
        <ChartContext.Provider value={{data: chartData, update: () => updateChartData(chartData.clone())}}>
            <VStack>
                <Chart/>
                <HStack>
                    <Select defaultValue={DiagramType.LINE_CHART} onChange={() => {
                        
                    }}>
                        <option value={DiagramType.LINE_CHART}>Line chart</option>
                        <option value={DiagramType.BAR_CHART}>Bar chart</option>
                    </Select>
                </HStack>
            </VStack>
        </ChartContext.Provider>
    );
};

export default ChartModule;