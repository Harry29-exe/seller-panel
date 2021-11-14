import * as React from "react"
import {
    ChakraProvider,
} from "@chakra-ui/react"
import Navbar from "./molecules/Navbar";
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import TestComponent1 from "./molecules/TestComponent1";
import TestComponent2 from "./molecules/TestComponent2";
import theme from "./chakra-config/theme";
import { AuthContext } from "./contexts/AuthContext";
import Chart from "./molecules/Chart";

export const App = () => (
    <ChakraProvider theme={theme}>
        <AuthContext.Provider value={null} >
            <BrowserRouter>

                <Navbar routes={[
                    {name: "Home", path: "/"},
                    {name: "Buyers opinions", path: "/buyers-opinions"}
                ]
                }/>

                <Routes>
                    <Route path={"/"} element={<Chart/>}/>
                    <Route path={"/buyers-opinions"} element={<TestComponent2/>}/>
                </Routes>
            </BrowserRouter>

        </AuthContext.Provider>
    </ChakraProvider>
)




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
