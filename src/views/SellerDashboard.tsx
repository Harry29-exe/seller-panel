import React, {useContext} from 'react';
import {Center, VStack} from "@chakra-ui/react";
import SalesChart from "./SalesChart";
import BuyersReviews from "./BuyersReviews";
import Orders from './Orders';
import {AuthContext} from "../contexts/AuthContext";
import SellerPanelNavbar from "../molecules/SellerPanelNavbar";
import {SellerPanelProvider} from "../contexts/SellerPanelProvider";

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
                <VStack spacing={16} mt={3} mb={12}>
                    <SalesChart/>
                    <BuyersReviews/>
                    <Orders/>
                </VStack>
            </SellerPanelProvider>
        );
    }
};

export default SellerDashboard;