import React from 'react';
import {Center} from "@chakra-ui/react";
import {Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

enum DataTime {
    NOW,
    EARLIER
}

const Chart = () => {
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

    let diagramType: string = "Line2";

    if(diagramType === "Line") {
        return (
            <Center pt={10}>
                <LineChart width={600} height={400} data={data}>
                    <CartesianGrid stroke={"#ccc"}/>
                    <XAxis dataKey="x"/>
                    <YAxis dataKey="y2"/>
                    <Line type="monotone" dataKey="y1" stroke="#5c2"/>
                    <Line type="monotone" dataKey="y2" stroke="#5af"/>
                    <Tooltip/>

                </LineChart>
            </Center>
        );
    } else {
        return (
        <Center pt={10}>
            <BarChart width={600} height={400} data={data}>
                <Tooltip/>
                <CartesianGrid stroke={"#ccc"}/>
                <XAxis dataKey="x"/>
                <YAxis dataKey="y2"/>
                <Bar type="monotone" dataKey="y1" fill="#5c2"/>
                <Bar type="monotone" dataKey="y2" fill="#5af"/>


            </BarChart>
        </Center>
        );
    }
};

export default Chart;