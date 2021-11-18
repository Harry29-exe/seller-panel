import React, {useContext} from 'react';
import {Center, VStack} from "@chakra-ui/react";
import SalesChart from "./SalesChart";
import BuyersReviews from "./BuyersReviews";
import Orders from './Orders';
import {AuthContext} from "../contexts/AuthContext";
import {SellerPanelProvider} from "../contexts/SellerPanelContext";
import SellerPanelNavbar from "../molecules/SellerPanelNavbar";

const SellerDashboard = () => {
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
                <VStack spacing={6} mt={5} mb={12}>
                    <SalesChart/>
                    <Orders/>
                    <BuyersReviews/>
                </VStack>
            </SellerPanelProvider>
        );
    }
};

export default SellerDashboard;