import React from 'react';
import ComponentBg from "../atomics/ComponentBG";
import {Center, Divider, Flex, VStack} from "@chakra-ui/react";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import SellerPanelWidgetPin from "../molecules/SellerPanelWidgetPin";
import OrderLink from '../molecules/OrderLink';

const ordersWidgetMessages = defineMessages({
    name: {
        id: "Orders_name",
        defaultMessage: "Orders"
    },
    notPaid: {
        id: "Orders_notPaid",
        defaultMessage: "Not paid"
    },
    notSend: {
        id: "Orders_notSend",
        defaultMessage: "Not send"
    },
    returns: {
        id: "Orders_returns",
        defaultMessage: "Returns"
    }
})

const Orders = () => {
    const intl = useIntl();

    return (
        <ComponentBg>
            <SellerPanelWidgetPin message={ordersWidgetMessages.name} elementId={"orders"}/>
            <VStack w={"100%"} spacing={6}>
                <Center fontSize="lg" fontWeight={600} px={5} textAlign="center">
                    <FormattedMessage id="Orders_chooseOrderType"
                                      defaultMessage="Please choose order type to go to orders page"/>
                </Center>
                <Divider w={"95%"}/>
                <Flex w={"100%"} flexFlow="wrap" flexWrap="wrap" justifyContent="space-evenly">
                    <OrderLink w={["90%", "70%", "60%"]} link={"/seller-dashboard/orders/not-send"}
                               name={intl.formatMessage(ordersWidgetMessages.notSend)}/>
                    <OrderLink w={["90%", "70%", "60%"]} link={"/seller-dashboard/orders/not-paid"}
                               name={intl.formatMessage(ordersWidgetMessages.notPaid)}/>
                    <OrderLink w={["90%", "70%", "60%"]} link={"/seller-dashboard/orders/returns"}
                               name={intl.formatMessage(ordersWidgetMessages.returns)}/>
                </Flex>
            </VStack>
        </ComponentBg>
    );
};

export default Orders;