import React from 'react';
import {
    Box,
    Button, Center,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    HStack,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {ColorModeSwitcher} from "../ColorModeSwitcher";
import NavbarLink, {NavbarLinkProps} from "../atomics/NavbarLink";
import {useLocation, useMatch, useResolvedPath} from "react-router-dom";

export interface MenuProps {
    routes: NavbarLinkProps[]
}

const Navbar = (props: MenuProps) => {
    let bgColor = useColorModeValue("gray.100", "gray.800");
    let navbarType = useBreakpointValue(["phone", "normal"]);
    const {pathname} = useLocation();

    return (
        <HStack w="100vw" h="70px" px={4} py={2}
                bg={bgColor}
                // textShadow={"1px 1px #ffffff88"}
                fontSize={"3xl"} fontWeight={"bold"}>
            {navbarType === "phone"?
                <>
                    <MobileNavbar routes={props.routes}/>
                    <Box flexGrow={4}/>
                </>
                :
                <HStack flexGrow={4} spacing={[10, null, 10]}>
                    {
                        props.routes.map(route =>
                            <Center>
                                <NavbarLink name={route.name} path={route.path} isActive={route.path === pathname}/>
                            </Center>
                        )
                    }
                </HStack>
            }

            <HStack flexGrow={0}>
                <ColorModeSwitcher justifySelf="flex-end" />*
            </HStack>
        </HStack>
    );
};

const MobileNavbar = (props: MenuProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {pathname} = useLocation();

    return (
        <>
            <Button onClick={onOpen}>Open navbar</Button>
            <Drawer isOpen={isOpen} onClose={onClose}
                    placement="right" size="full">
                <DrawerOverlay/>
                <DrawerContent>
                    <VStack onClick={onClose} fontSize="4xl" fontWeight="bold" spacing={0} py={5}>
                        {
                            props.routes.map(
                                route => <NavbarLink name={route.name} path={route.path}
                                                     isActive={pathname === route.path}/>
                            )
                        }
                    </VStack>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Navbar;