import * as React from "react"
import {useEffect, useState} from "react"
import {Box, ChakraProvider,} from "@chakra-ui/react"
import Navbar from "./molecules/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import theme from "./chakra-config/theme";
import {AuthContext, AuthContextHolder, AuthHolder} from "./contexts/AuthContext";
import {defineMessages, IntlProvider, useIntl} from "react-intl";
import {frontendAddress} from "./logic/ServerAddress";
import SellerDashboard from "./views/SellerDashboard";
import ServiceMockPage from "./views/ServiceMockPage";
import OrdersPage from "./views/OrdersPage";
import OrdersWidget from "./views/OrdersWidget";
import ChartModule from "./molecules/ChartModule";
import BuyersReviews from "./views/BuyersReviews";
import {AdvancedForm} from "./views/AdvancedForm";

const pageTitlesMessages = defineMessages({
    home: {
        id: "home",
        defaultMessage: "Home"
    },
    // buyersOpinions: {
    //     id: "buyersOpinions",
    //     defaultMessage: "Buyers Opinions"
    // },
    // orders: {
    //     id: "orders",
    //     defaultMessage: "Orders"
    // }
    sellerDashboard: {
        id: "sellerDashboard",
        defaultMessage: "Seller dashboard",
    },
    orders: {
        id: "orders",
        defaultMessage: "Orders",
    },
    chart: {
        id: "chat",
        defaultMessage: "Sell chart",
    },
    reviews: {
        id: "reviews",
        defaultMessage: "Reviews",
    },
    contact: {
        id: 'contact',
        defaultMessage: "Contact",
    }
})

export const AppRoutes = (props: { setLang: (lang: string) => any }) => {
    const [auth, updateAuth] = useState<AuthHolder>(new AuthHolder());
    // const [isNavbarOn, {on, off, toggle}] = useBoolean(true);
    const intl = useIntl();

    return (
        <AuthContext.Provider value={new AuthContextHolder(auth,
            (auth) => updateAuth(auth))}>
            <BrowserRouter>

                <Box pos="absolute" w={"100vw"} h="100vh"
                    // mt="70px" h={"calc(100vh - 70px)"} maxH={"calc(100vh - 70px)"}
                     overflow="auto">
                    <Navbar
                        // isNavbarOn={isNavbarOn} navbarOn={on} navbarOff={off}
                        routes={[
                            {name: intl.formatMessage(pageTitlesMessages.home), path: "/"},
                            // {name: intl.formatMessage(pageTitlesMessages.sellerDashboard), path: "/seller-dashboard"},
                            {name: intl.formatMessage(pageTitlesMessages.orders), path: "/seller-dashboard/orders-widget"},
                            {name: intl.formatMessage(pageTitlesMessages.chart), path: "/seller-dashboard/chart"},
                            {name: intl.formatMessage(pageTitlesMessages.reviews), path: "/seller-dashboard/buyers-reviews"},
                            {name: intl.formatMessage(pageTitlesMessages.contact), path: "/seller-dashboard/contact"},
                        ]} updateLanguage={(lang) => props.setLang(lang)}/>
                    <Box w={1} h={"70px"}/>

                    <Routes>
                        <Route path={"/"} element={<ServiceMockPage/>}/>
                        <Route path={"/seller-dashboard"} element={<SellerDashboard/>}/>
                        <Route path={"/seller-dashboard/orders-widget"} element={<SellerDashboard><OrdersWidget/></SellerDashboard>}/>
                        <Route path={"/seller-dashboard/chart"} element={<SellerDashboard><ChartModule/></SellerDashboard>}/>
                        <Route path={"/seller-dashboard/buyers-reviews"} element={<SellerDashboard><BuyersReviews/></SellerDashboard>}/>
                        <Route path={"/seller-dashboard/orders/*"} element={<OrdersPage/>}/>
                        <Route path={"/seller-dashboard/contact"} element={<AdvancedForm/>}/>
                    </Routes>

                </Box>

        </BrowserRouter>
    </AuthContext.Provider>)
}

export const App = () => {
    const [langAndMessages, setLangAndMessages] = useState<{ lang: string, messages: any }>(
        {lang: "en", messages: {}});
    const [nextLang, setNextLang] = useState<string>("en")

    useEffect(
        () => {
            fetch(`${frontendAddress}/lang/${nextLang}.json`)
                .then(response => response.json())
                .then(json => {
                    setLangAndMessages({lang: nextLang, messages: json});
                });
        }, [nextLang]
    );

    return (
        <ChakraProvider theme={theme}>
            <IntlProvider defaultLocale="en" locale={langAndMessages.lang} messages={langAndMessages.messages}>
                <AppRoutes setLang={setNextLang}/>
            </IntlProvider>
        </ChakraProvider>
    )
}
