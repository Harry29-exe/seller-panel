import React, {useContext, useEffect, useState} from 'react';
import Chart from "../atomics/Chart";
import {Box, HStack, VStack} from "@chakra-ui/react";
import {ChartData, Data, DataOnDiagram, DiagramType, TimePeriod} from '../contexts/ChartContext';
import OptionButton from "../atomics/OptionButton";
import {AuthContext} from "../contexts/AuthContext";
import backendAddress from "../contexts/ServerAddress";

const ChartModule = () => {
    const [chartData, updateChartData] = useState<ChartData>(new ChartData({} as Data));
    const authContext = useContext(AuthContext)
    useEffect(() => {
            // debugger;
            const dataClone = chartData.clone();
            const activeUser = authContext.authHolder.activeUser;
            fetch(`${backendAddress}/chart-data/${activeUser}`)
                .then(response => response.json())
                .then(body => {
                    dataClone.data = body;
                    updateChartData(dataClone);
                });
        }, [authContext]
    );

    const update = () => updateChartData(chartData.clone());

    return (
        <VStack>
            <Box border={"2px solid"} borderColor="primary.400" borderRadius="lg">
                <Chart chartData={chartData}/>
            </Box>

            <HStack justifyContent="space-evenly" w="100%">

                <OptionButton options={[
                    [DiagramType.LINE_CHART, "line chart"],
                    [DiagramType.BAR_CHART, "bar chart"]
                ]} onChange={(event: any) => {
                    chartData.diagramType = Number.parseInt(event.target.value);
                    update();
                }}/>
                <OptionButton options={[
                    [TimePeriod.DAY, "Day"],
                    [TimePeriod.YEAR, "Year"],
                    [TimePeriod.MONTH, "Month"]
                ]} onChange={(event: any) => {
                    chartData.timePeriod = Number.parseInt(event.target.value);
                    update();
                }}/>
                <OptionButton options={[
                    [DataOnDiagram.SALES_VALUE, "Sales value"],
                    [DataOnDiagram.SOLD_UNITS, "Units sold"]
                ]} onChange={(event: any) => {
                    chartData.dataType = Number.parseInt(event.target.value);
                    update();
                }}/>

            </HStack>
        </VStack>
    );
};

export default ChartModule;