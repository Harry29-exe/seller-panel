import React from 'react';
import {Box, Button, VStack} from "@chakra-ui/react";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {Link, useLocation} from 'react-router-dom';
import {defineMessages} from "react-intl";
import ComponentBg from "../atomics/ComponentBG";

const orderPageMassages = defineMessages({
    notSend: {
        id: "OrdersPage_notSend",
        defaultMessage: "notSend"
    }
})

const OrdersPage = () => {
    const location = useLocation();

    const pathParts = location.pathname.split("/");
    const ordersType = pathParts[pathParts.length - 1];

    console.log(ordersType);
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
                        {ordersType}
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