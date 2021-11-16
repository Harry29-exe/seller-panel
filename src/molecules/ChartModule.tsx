import React, {useContext, useEffect, useState} from 'react';
import Chart from "../atomics/Chart";
import {Box, HStack, VStack} from "@chakra-ui/react";
import {ChartData, Data, DataOnDiagram, DiagramType, TimePeriod} from '../contexts/ChartContext';
import OptionButton from "../atomics/OptionButton";
import {AuthContext} from "../contexts/AuthContext";
import backendAddress from "../contexts/ServerAddress";
import {defineMessages, useIntl} from "react-intl";

function addId(v: string): string {
    return "ChartModule_" + v;
}

const messages = defineMessages({
    lineChar: {
        id: addId("lineChart"),
        defaultMessage: "Line chart"
    },
    barChart: {
        id: addId("barChart"),
        defaultMessage: "Bar chart"
    }
})

const ChartModule = () => {
    const [chartData, updateChartData] = useState<ChartData>(new ChartData({} as Data));
    const authContext = useContext(AuthContext)
    const intl = useIntl();

    useEffect(() => {
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
        <ComponentBg px={4} py={5}>
            <VStack>
                <Center fontSize="lg" fontWeight={600}>
                    <Message
                        id={getId("GREETINGS")}
                        defaultMessage="Sales chart"
                        description="chart view greeting"
                    />
                </Center>
                <Chart chartData={chartData}/>

                <HStack justifyContent="space-evenly" w="100%">

                <OptionButton options={[
                    [DiagramType.LINE_CHART, intl.formatMessage(messages.lineChar)],
                    [DiagramType.BAR_CHART, intl.formatMessage(messages.barChart)]
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
        </ComponentBg>
    );
};

export default ChartModule;