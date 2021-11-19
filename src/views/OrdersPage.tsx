import React from 'react';
import {Box, Button, VStack} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {Link, useLocation} from 'react-router-dom';
import {MessageDescriptor, useIntl} from "react-intl";
import ComponentBg from "../atomics/ComponentBG";
import {ordersWidgetMessages} from './OrdersWidget';

const addressUrlToMessage = (address: string): MessageDescriptor => {
    switch (address) {
        case "not-send":
            return ordersWidgetMessages.notSend;
        case "not-paid":
            return ordersWidgetMessages.notPaid;
        case "not-returned":
            return ordersWidgetMessages.returns;
        default:
            return ordersWidgetMessages.name;
    }
}

const OrdersPage = () => {
    const location = useLocation();
    const intl = useIntl();

    const pathParts = location.pathname.split("/");
    const ordersType = pathParts[pathParts.length - 1];

    const orderTypeMessage = addressUrlToMessage(ordersType);
    return (
        <ComponentBg mx="auto" my={8}>
            <VStack w="100%" spacing={8} px={[3, 4, 5]}>
                <Box pos="relative" w="100%">

                    <Link to={"/seller-dashboard"} style={{position: "relative", left: 0, top: 0}}>
                        <Button leftIcon={<ArrowBackIcon/>} icon={<ArrowBackIcon/>} bg={"primary.400"}>
                            Back
                        </Button>
                    </Link>

                    <Box fontSize={"xl"} mx="auto" textAlign="center" fontWeight={600}>
                        {`${intl.formatMessage(orderTypeMessage)} ${intl.formatMessage(ordersWidgetMessages.orders)}`}
                    </Box>

                </Box>
                <VStack spacing={6} w={"100%"}>
                    <ComponentBg w="100%">Some value</ComponentBg>
                    <ComponentBg w="100%">Some value</ComponentBg>
                    <ComponentBg w="100%">Some value</ComponentBg>
                    <ComponentBg w="100%">Some value</ComponentBg>
                </VStack>
            </VStack>
        </ComponentBg>
    );
};

// style={{position: "absolute", left: 0, top: 0}}
export default OrdersPage;