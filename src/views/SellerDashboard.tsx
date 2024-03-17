import React, {PropsWithChildren, useContext} from 'react';
import {Center, VStack} from "@chakra-ui/react";
import BuyersReviews from "./BuyersReviews";
import OrdersWidget from './OrdersWidget';
import {AuthContext} from "../contexts/AuthContext";
import SellerPanelNavbar from "../molecules/SellerPanelNavbar";
import {SellerPanelProvider} from "../contexts/SellerPanelProvider";
import ChartModule from "../molecules/ChartModule";

const SellerDashboard = (props: PropsWithChildren<any>) => {
    const authContext = useContext(AuthContext);

    if (!authContext.isLogged()) {
        return (
            <Center>
                To access this page please login into your account
            </Center>
        )
    } else {
        return (
            <SellerPanelProvider>
                <SellerPanelNavbar/>
                <VStack spacing={16} mt={12} mb={12}>
                    {props.children}
                    {/*<OrdersWidget/>*/}
                    {/*<ChartModule/>*/}
                    {/*<BuyersReviews/>*/}
                </VStack>
            </SellerPanelProvider>
        );
    }
};

export default SellerDashboard;