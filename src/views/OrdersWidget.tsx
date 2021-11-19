import React, {useContext, useEffect, useState} from 'react';
import ComponentBg from "../atomics/ComponentBG";
import {Center, Divider, Skeleton, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, VStack} from "@chakra-ui/react";
import {defineMessages, FormattedMessage, MessageDescriptor, useIntl} from "react-intl";
import SellerPanelWidgetPin from "../molecules/SellerPanelWidgetPin";
import OrderLink from '../molecules/OrderLink';
import {AuthContext} from "../contexts/AuthContext";
import backendAddress from "../logic/ServerAddress";
import NoOrdersBanner from "../molecules/NoOrdersBanner";

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
    },
    goToOrders: {
        id: "Orders_goToOrders",
        defaultMessage: "Go to orders"
    }
})

export interface OrdersCount {
    notSend: number,
    notPaid: number,
    returns: number
}

interface OrderTableRowProps {
    link: string;
    message: MessageDescriptor;
    orderCount: number;
}

const SmallOrderTableRow = (props: OrderTableRowProps) => {
    const intl = useIntl();

    return (
        <Tr>
            <Td>
                <OrderLink link={props.link}
                           name={intl.formatMessage(props.message)}
                />
            </Td>
            <Td>
                {props.orderCount < 0 ?
                    <Skeleton height="20px"/> :
                    props.orderCount}
            </Td>
        </Tr>

    )
}

const OrderTableRow = (props: OrderTableRowProps) => {
    const intl = useIntl();

    return (
        <Tr>
            <Td>
                <OrderLink link={props.link}
                           name={intl.formatMessage(ordersWidgetMessages.goToOrders)}
                />
            </Td>

            <Td fontWeight={600}>
                {intl.formatMessage(props.message)}
            </Td>

            <Td>
                {props.orderCount < 0 ?
                    <Skeleton height="20px"/> :
                    props.orderCount}
            </Td>
        </Tr>
    )
}

const OrdersWidget = () => {
    const [ordersCount, setOrdersCount] = useState<OrdersCount | null>(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        fetch(`${backendAddress}/orders-count/${authContext.authHolder.activeUser}`)
            .then(response => response.json())
            .then(json => setOrdersCount(json));
    }, [authContext]);

    const tableSize = useBreakpointValue(["sm", "md"])

    const rows = [
        {
            link: "/seller-dashboard/orders/not-paid",
            message: ordersWidgetMessages.notPaid,
            orderCount: ordersCount ? ordersCount.notPaid : -1
        },
        {
            link: "/seller-dashboard/orders/not-send",
            message: ordersWidgetMessages.notSend,
            orderCount: ordersCount ? ordersCount.notSend : -1
        },
        {
            link: "/seller-dashboard/orders/returns",
            message: ordersWidgetMessages.returns,
            orderCount: ordersCount ? ordersCount.notSend : -1
        }
    ];

    return (
        <ComponentBg>
            <SellerPanelWidgetPin message={ordersWidgetMessages.name} elementId={"orders"}/>
            <VStack w={"100%"} spacing={6}>
                <Center fontSize="lg" fontWeight={600} px={5} textAlign="center">
                    <FormattedMessage id="Orders_chooseOrderType"
                                      defaultMessage="Please choose order type to go to orders page"/>
                </Center>
                <Divider w={"95%"}/>

                <Table fontSize={"lg"} fontWeight={500} size={tableSize}>
                    <Thead>
                        <Tr>
                            <Th w={["750px", "100px", "150px"]}><FormattedMessage id="Orders_goToOrders"
                                                                                  defaultMessage="Go to orders"/></Th>
                            {tableSize !== "sm" &&
                            <Th><FormattedMessage id="Orders_ordersType" defaultMessage="Orders type"/></Th>
                            }
                            <Th><FormattedMessage id="Orders_ordersCount" defaultMessage="Count"/></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tableSize !== "sm" ?
                            rows.map(r =>
                                <OrderTableRow key={r.link} link={r.link}
                                               message={r.message} orderCount={r.orderCount}
                                />
                            )
                            // <div/>
                            :
                            rows.map(r =>
                                <SmallOrderTableRow key={r.link} link={r.link}
                                                    message={r.message} orderCount={r.orderCount}
                                />
                            )
                        }
                    </Tbody>
                </Table>

                {(ordersCount !== null && ordersCount?.notSend === 0 &&
                    ordersCount.notPaid === 0 && ordersCount.returns === 0) &&
                <NoOrdersBanner/>
                }
            </VStack>
        </ComponentBg>
    );
};


export default OrdersWidget;
