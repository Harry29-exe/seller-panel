import * as React from "react"
import {useEffect, useState} from "react"
import {ChakraProvider,} from "@chakra-ui/react"
import Navbar from "./molecules/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import theme from "./chakra-config/theme";
import {AuthContext, AuthContextHolder, AuthHolder} from "./contexts/AuthContext";
import BuyersOpinions from "./views/BuyersOpinions";
import {defineMessages, IntlProvider, useIntl} from "react-intl";
import {frontendAddress} from "./logic/ServerAddress";
import SalesChart from "./views/SalesChart";
import Orders from "./views/Orders";

const pageTitlesMessages = defineMessages({
    home: {
        id: "home",
        defaultMessage: "Home"
    },
    buyersOpinions: {
        id: "buyersOpinions",
        defaultMessage: "Buyers Opinions"
    },
    orders: {
        id: "orders",
        defaultMessage: "Orders"
    }
})

export const AppRoutes = (props: { setLang: (lang: string) => any }) => {
    const [auth, updateAuth] = useState<AuthHolder>(new AuthHolder());
    const intl = useIntl();

    return (<AuthContext.Provider value={new AuthContextHolder(auth,
        (auth) => updateAuth(auth))}>
        <BrowserRouter>


            <Navbar routes={[
                {name: intl.formatMessage(pageTitlesMessages.home), path: "/"},
                {name: intl.formatMessage(pageTitlesMessages.buyersOpinions), path: "/buyers-opinions"},
                {name: intl.formatMessage(pageTitlesMessages.orders), path: "/orders"}
            ]} updateLanguage={(lang) => props.setLang(lang)}/>

            <Routes>
                <Route path={"/"} element={<SalesChart/>}/>
                <Route path={"/buyers-opinions"} element={<BuyersOpinions/>}/>
                <Route path={"/orders"} element={<Orders/>}/>
            </Routes>

        </BrowserRouter>
    </AuthContext.Provider>)
}

export const App = () => {
    const [lang, setLang] = useState<string>("pl");
    const [langMessages, setMessages] = useState(undefined);

    useEffect(
        () => {
            fetch(`${frontendAddress}/lang/${lang}.json`)
                .then(response => response.json())
                .then(json => setMessages(json)
                );
        }, [lang]
    );

    return (
        <ChakraProvider theme={theme}>
            <IntlProvider defaultLocale="en" locale={lang} messages={langMessages}>
                <AppRoutes setLang={setLang}/>
            </IntlProvider>
        </ChakraProvider>
    )
}
