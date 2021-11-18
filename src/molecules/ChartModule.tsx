import React, {useContext, useEffect, useState} from 'react';
import Chart from "../atomics/Chart";
import {Center, VStack} from "@chakra-ui/react";
import {AuthContext} from "../contexts/AuthContext";
import backendAddress from "../logic/ServerAddress";
import {defineMessages, FormattedMessage} from "react-intl";
import ComponentBg from '../atomics/ComponentBG';
import ChartOptionPanel from "./ChartOptionPanel";
import {ChartDataInfo, Data} from "../logic/ChartData";

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
    },
    displaySecondSet: {
        id: "ChartModule_displaySecondSet",
        defaultMessage: "Display data from last period"
    }
})

const ChartModule = () => {
    const [chartDataInfo, updateChartDataInfo] = useState<ChartDataInfo>(new ChartDataInfo({} as Data));
    const authContext = useContext(AuthContext);

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
        <ComponentBg py={5}>
            <VStack>
                <Center fontSize="lg" fontWeight={600}>
                    <FormattedMessage
                        id={"ChartModule_GREETINGS"}
                        defaultMessage="Sales chart"
                        description="chart view greeting"
                    />
                </Center>
                <Chart chartData={chartDataInfo}/>
                <ChartOptionPanel chartInfo={chartDataInfo.info} updateChart={update}/>

            </VStack>
        </ComponentBg>
    );
};

export default ChartModule;