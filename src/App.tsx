import * as React from "react"
import {
    ChakraProvider,
} from "@chakra-ui/react"
import Navbar from "./molecules/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TestComponent2 from "./molecules/TestComponent2";
import theme from "./chakra-config/theme";
import {AuthContext, AuthContextHolder, AuthHolder} from "./contexts/AuthContext";
import ChartModule from "./molecules/ChartModule";
import {useContext, useEffect, useState} from "react";
import BuyersOpinions from "./views/BuyersOpinions";
import {IntlProvider} from "react-intl";
import backendAddress, {frontendAddress} from "./contexts/ServerAddress";
import SalesChart from "./views/SalesChart";

export const I18nMessages = {

}

const plMessages = {
    SalesChart_GREETINGS: {
        message: "Wykres sprzedarzy",
        description: "chart view greeting"
    }
}

export const App = () => {
    const [auth, updateAuth] = useState<AuthHolder>(new AuthHolder());
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
    console.log(langMessages);

    return (
        <ChakraProvider theme={theme}>
        <IntlProvider defaultLocale="en" locale={lang} messages={langMessages}>
        <AuthContext.Provider value={new AuthContextHolder(auth,
            (auth) => updateAuth(auth))}>
            <BrowserRouter>

                <Navbar routes={[
                    {name: "Home", path: "/"},
                    {name: "Buyers opinions", path: "/buyers-opinions"}
                ]}/>

                <Routes>
                    <Route path={"/"} element={<SalesChart/>}/>
                    <Route path={"/buyers-opinions"} element={<BuyersOpinions/>}/>
                </Routes>

            </BrowserRouter>
        </AuthContext.Provider>
            </IntlProvider>
        </ChakraProvider>
    )
}




// {/*<Box textAlign="center" fontSize="xl">*/}
// {/*  <Grid minH="100vh" p={3}>*/}
// {/*    <ColorModeSwitcher justifySelf="flex-end" />*/}
// {/*    <VStack spacing={8}>*/}
// {/*      <Logo h="40vmin" pointerEvents="none" />*/}
// {/*      <Text>*/}
// {/*        Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.*/}
// {/*      </Text>*/}
// {/*      <Link*/}
// {/*        color="teal.500"*/}
// {/*        href="https://chakra-ui.com"*/}
// {/*        fontSize="2xl"*/}
// {/*        target="_blank"*/}
// {/*        rel="noopener noreferrer"*/}
// {/*      >*/}
// {/*        Learn Chakra*/}
// {/*      </Link>*/}
// {/*    </VStack>*/}
// {/*  </Grid>*/}
// {/*</Box>*/}
