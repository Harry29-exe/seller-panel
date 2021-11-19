import React, {useContext, useEffect, useState} from 'react';
import ComponentBg from "../atomics/ComponentBG";
import {Center, Divider, Skeleton, Table, Tbody, Td, Th, Thead, Tr, VStack} from "@chakra-ui/react";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import SellerPanelWidgetPin from "../molecules/SellerPanelWidgetPin";
import OrderLink from '../molecules/OrderLink';
import {AuthContext} from "../contexts/AuthContext";
import backendAddress from "../logic/ServerAddress";

export const ordersWidgetMessages = defineMessages({
    name: {
        id: "Orders_name",
        defaultMessage: "Orders"
    },
    orders: {
        id: "Orders_orders",
        defaultMessage: "orders"
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

export interface OrdersCount {
    notSend: number,
    notPaid: number,
    returns: number
}

const OrdersWidget = () => {
    const [ordersCount, setOrdersCount] = useState<OrdersCount | null>(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        fetch(`${backendAddress}/orders-count/${authContext.authHolder.activeUser}`)
            .then(response => response.json())
            .then(json => setOrdersCount(json));
    }, [authContext])
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

                <Table fontSize={"lg"} fontWeight={500}>
                    <Thead>
                        <Tr>
                            <Th><FormattedMessage id="Orders_ordersPage" defaultMessage="View orders"/></Th>
                            <Th><FormattedMessage id="Orders_ordersType" defaultMessage="Orders type"/></Th>
                            <Th><FormattedMessage id="Orders_ordersCount" defaultMessage="Count"/></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td></Td>
                            <Td>{intl.formatMessage(ordersWidgetMessages.notSend)}</Td>
                            <Td>{ordersCount === null ? <Skeleton height="20px"/> : ordersCount.notSend}</Td>
                        </Tr>
                        <Tr>
                            <Td>
                                <OrderLink w={["90%", "70%", "60%"]} link={"/seller-dashboard/orders/not-paid"}
                                           name={intl.formatMessage(ordersWidgetMessages.notPaid)}/>
                            </Td>
                            <Td>{intl.formatMessage(ordersWidgetMessages.notPaid)}</Td>
                            <Td>{ordersCount === null ? <Skeleton height="20px"/> : ordersCount.notPaid}</Td>

                        </Tr>
                        <Tr>
                            <Td>
                                <OrderLink w={["90%", "70%", "60%"]} link={"/seller-dashboard/orders/returns"}
                                           name={intl.formatMessage(ordersWidgetMessages.returns)}/>
                            </Td>
                            <Td>{intl.formatMessage(ordersWidgetMessages.returns)}</Td>
                            <Td>{ordersCount === null ? <Skeleton height="20px"/> : ordersCount.returns}</Td>
                        </Tr>
                    </Tbody>
                </Table>

            </VStack>
        </ComponentBg>
    );
};


export default OrdersWidget;
