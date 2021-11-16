import React, {useContext, useEffect, useState} from 'react';
import Chart from "../atomics/Chart";
import {Center, HStack, VStack} from "@chakra-ui/react";
import {ChartData, Data, DataOnDiagram, DiagramType, TimePeriod} from '../contexts/ChartContext';
import OptionButton from "../atomics/OptionButton";
import {AuthContext} from "../contexts/AuthContext";
import backendAddress from "../contexts/ServerAddress";
import ComponentBg from "../atomics/ComponentBG";
import {FormattedMessage as Message} from "react-intl";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

const modulePrefix = "SalesChart_"

const getId = (val: string): string => {
    return modulePrefix + val;
}

const chartTypeOptions: [any, () => ReactJSXElement][] = [
    [DiagramType.LINE_CHART, () =>
        <Message id={getId("line_chart")} defaultMessage="Line chart"/>],
    [DiagramType.BAR_CHART,
        () => <Message id={getId("bar_chart")} defaultMessage="Bar chart"/>]
];

const timePeriodOptions: [any, () => ReactJSXElement][] = [
    [TimePeriod.DAY, () => <Message id={getId("day")} defaultMessage="Day"/>],
    [TimePeriod.MONTH, () => <Message id={getId("month")} defaultMessage="Month"/>],
    [TimePeriod.YEAR, () => <Message id={getId("year")} defaultMessage="Year"/>]
];

const dataTypeOptions: [any, () => ReactJSXElement][] = [
    [DataOnDiagram.SALES_VALUE,
        () => <Message id={getId("sales_value")} defaultMessage="Sales value"/>],
    [DataOnDiagram.SOLD_UNITS,
        () => <Message id={getId("units_sold")} defaultMessage="Units sold"/>]
];

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

                    <OptionButton onChange={(event: any) => {
                        chartData.diagramType = Number.parseInt(event.target.value);
                        update();
                    }}>
                        {chartTypeOptions.map(type =>
                            <option key={type[0]} value={type[0]}>{type[1]()}</option>
                        )}
                    </OptionButton>

                    <OptionButton onChange={(event: any) => {
                        chartData.timePeriod = Number.parseInt(event.target.value);
                        update();
                    }}>
                        {timePeriodOptions.map(type =>
                            <option key={type[0]} value={type[0]}>{type[1]()}</option>
                        )}
                    </OptionButton>

                    <OptionButton onChange={(event: any) => {
                        chartData.dataType = Number.parseInt(event.target.value);
                        update();
                    }}>
                        {dataTypeOptions.map(type =>
                            <option key={type[0]} value={type[0]}>
                                <Message id={getId("units_sold")} defaultMessage="Units sold" description="wewgs"/>
                            </option>
                        )}
                    </OptionButton>
                    <Message id={getId("units_sold")} defaultMessage="Units sold" description="wewgs"/>

                </HStack>
            </VStack>
        </ComponentBg>
    );
};

const createMessage = (id: string) => {
    return <Message id={id}/>
}

export default ChartModule;