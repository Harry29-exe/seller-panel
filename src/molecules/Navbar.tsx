import React from 'react';
import {
    Box,
    Center,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    HStack,
    IconButton,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {ColorModeSwitcher} from "../ColorModeSwitcher";
import NavbarLink, {NavbarLinkProps} from "../atomics/NavbarLink";
import {useLocation} from "react-router-dom";
import AccountButton from "../atomics/AccountButton";
import OptionButton from "../atomics/OptionButton";

export interface MenuProps {
    routes: NavbarLinkProps[],
    updateLanguage: (lang: string) => any,
    // isNavbarOn: boolean,
    // navbarOn: () => void,
    // navbarOff: () => void
}

const Navbar = (props: MenuProps) => {
    let bgColor = useColorModeValue("gray.100", "gray.800");
    let shadowColor = useColorModeValue("#aaa", "#000");
    let nextNavbarBg = useColorModeValue("#e7f3ff", "#0f1017");
    document.documentElement.style.setProperty("--navbar-bg", nextNavbarBg)
    let navbarType = useBreakpointValue(["phone", "mobile", null, "normal"]);
    const {pathname} = useLocation();

    return (
        <HStack w="100%" h="70px" px={4} py={2}
                bg={bgColor} pos={"absolute"} zIndex={10}
                shadow={`0px 2px 8px 0px ${shadowColor}`}
                fontSize={"3xl"} fontWeight={"bold"}>
            {navbarType === "phone" || navbarType === "mobile" ?
                <>
                    <MobileNavbar routes={props.routes} size={navbarType === "phone" ? "full" : "sm"}/>
                    <Box flexGrow={4}/>
                </>
                :
                <HStack flexGrow={4} spacing={[10, null, 10]}>
                    {
                        props.routes.map(route =>
                            <Center key={route.name}>
                                <NavbarLink name={route.name} path={route.path} isActive={route.path === pathname}/>
                            </Center>
                        )
                    }
                </HStack>
            }

            <HStack flexGrow={0}>
                <ColorModeSwitcher justifySelf="flex-end"/>

                <Box fontSize={"md"}>
                    <OptionButton options={[["en", "English"], ["pl", "Polski"]]}
                                  onChange={(event) => props.updateLanguage(event.target.value)}/>
                </Box>
                <AccountButton/>
            </HStack>
        </HStack>
    );
};

const MobileNavbar = (props: { routes: NavbarLinkProps[], size: "full" | string }) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {pathname} = useLocation();

    return (
        <>
            <IconButton aria-label="Menu" icon={<HamburgerIcon/>} onClick={onOpen}>Open navbar</IconButton>
            <Drawer isOpen={isOpen} onClose={onClose}
                    placement="left" size={props.size}>
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