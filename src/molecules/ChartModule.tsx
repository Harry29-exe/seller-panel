import React, {useContext, useEffect, useState} from 'react';
import Chart from "../atomics/Chart";
import {Center, useBoolean, VStack} from "@chakra-ui/react";
import {AuthContext} from "../contexts/AuthContext";
import backendAddress from "../contexts/ServerAddress";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import ComponentBg from '../atomics/ComponentBG';
import ChartOptionPanel from "./ChartOptionPanel";
import {ChartDataInfo, Data} from "../logic/ChartData";

function addId(v: string): string {
    return "ChartModule_" + v;
}

export const chartModuleMessages = defineMessages({
    lineChar: {
        id: `ChartModule_lineChart`,
        defaultMessage: "Line chart"
    },
    barChart: {
        id: "ChartModule_barChart",
        defaultMessage: "Bar chart"
    },
    day: {
        id: "ChartModule_day",
        defaultMessage: "Day"
    },
    month: {
        id: "ChartModule_month",
        defaultMessage: "Month"
    },
    year: {
        id: "ChartModule_year",
        defaultMessage: "Year"
    },
    salesValue: {
        id: "ChartModule_salesValue",
        defaultMessage: "Sales value"
    },
    unitsSold: {
        id: "ChartModule_unitsSold",
        defaultMessage: "Units sold"
    }
})

const ChartModule = () => {
    const [chartDataInfo, updateChartDataInfo] = useState<ChartDataInfo>(new ChartDataInfo({} as Data));
    const [secondDataSeries, toggleSecondDS] = useBoolean(true);
    const authContext = useContext(AuthContext)
    const intl = useIntl();

    useEffect(() => {
        const dataClone = chartDataInfo.clone();
        const activeUser = authContext.authHolder.activeUser;
        fetch(`${backendAddress}/chart-data/${activeUser}`)
            .then(response => response.json())
            .then(body => {
                dataClone.data = body;
                updateChartDataInfo(dataClone);
            });
        }, [authContext]
    );

    const update = () => updateChartDataInfo(chartDataInfo.clone());

    return (
        <ComponentBg px={4} py={5}>
            <VStack>
                <Center fontSize="lg" fontWeight={600}>
                    <FormattedMessage
                        id={"ChartModule_GREETINGS"}
                        defaultMessage="Sales chart"
                        description="chart view greeting"
                    />
                </Center>
                <Chart chartData={chartDataInfo} secondDataSeries={secondDataSeries}/>
                <ChartOptionPanel chartInfo={chartDataInfo.info} updateChart={update}/>

            </VStack>
        </ComponentBg>
    );
};

export default ChartModule;