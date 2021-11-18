import React from 'react';
import ChartModule from "../molecules/ChartModule";
import SellerPanelComponentRegister from "../molecules/SellerPanelComponentRegister";
import {defineMessage} from "react-intl";

const message = defineMessage({
    id: "salesChart",
    defaultMessage: "Sales chart"
});

const SalesChart = () => {
    return (
        <>
            <SellerPanelComponentRegister message={message} elementId={"salesChart"}/>
            <ChartModule/>
        </>
    );
};

export default SalesChart;