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
        id: "Seller dashboard"
    }
})

export const AppRoutes = (props: { setLang: (lang: string) => any }) => {
    const [auth, updateAuth] = useState<AuthHolder>(new AuthHolder());
    const intl = useIntl();

    return (
        <AuthContext.Provider value={new AuthContextHolder(auth,
            (auth) => updateAuth(auth))}>
            <BrowserRouter>


                <Navbar routes={[
                    {name: intl.formatMessage(pageTitlesMessages.home), path: "/"},
                    {name: intl.formatMessage(pageTitlesMessages.sellerDashboard), path: "/seller-dashboard"}
                ]} updateLanguage={(lang) => props.setLang(lang)}/>

                <Box pos="absolute" mt="70px" w={"100vw"} h={"calc(100vh - 70px)"} maxH={"calc(100vh - 70px)"}
                 overflow="auto">
                    <Routes>
                        <Route path={"/"} element={<ServiceMockPage/>}/>
                        <Route path={"/seller-dashboard"} element={<SellerDashboard/>}/>
                        {/*<Route path={"/buyers-opinions"} element={<BuyersReviews/>}/>*/}
                        {/*<Route path={"/orders"} element={<Orders/>}/>*/}
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
