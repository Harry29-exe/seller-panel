import React from 'react';
import WidgetBg from "../atomics/ComponentBG";
import {Center, Stack, VStack} from "@chakra-ui/react";
import {defineMessage, FormattedMessage} from "react-intl";
import SellerPanelComponentRegister from "../molecules/SellerPanelComponentRegister";
import Order from '../molecules/Order';

const ordersWidgetName = defineMessage({
    id: "Orders_name",
    defaultMessage: "Orders"
})

const Orders = () => {
    return (
        <WidgetBg>
            <SellerPanelComponentRegister message={ordersWidgetName} elementId={"orders"}/>
            <VStack>
                <Center fontSize="lg" fontWeight={600}>
                    <FormattedMessage id="Orders_chooseOrderType"
                                      defaultMessage="Please choose order type to go to orders page"/>
                </Center>
                <Stack>
                    <Order/>
                </Stack>
            </VStack>
        </WidgetBg>
    );
};

export default Orders;