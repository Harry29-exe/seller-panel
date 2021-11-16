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
    updateLanguage: (lang: string) => any
}

const Navbar = (props: MenuProps) => {
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const shadowColor = useColorModeValue("#aaa", "#000");
    const navbarType = useBreakpointValue(["phone", "normal"]);
    const {pathname} = useLocation();

    return (
        <HStack w="100vw" h="70px" px={4} py={2}
                bg={bgColor}
                shadow={`0px 2px 8px 0px ${shadowColor}`}
                fontSize={"3xl"} fontWeight={"bold"}>
            {navbarType === "phone" ?
                <>
                    <MobileNavbar routes={props.routes}/>
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
                    <OptionButton onChange={(event) => props.updateLanguage(event.target.value)}>
                        <option value="pl">Polski</option>
                        <option value="en">English</option>
                    </OptionButton>
                </Box>
                <AccountButton/>
            </HStack>
        </HStack>
    );
};

const MobileNavbar = (props: { routes: NavbarLinkProps[] }) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {pathname} = useLocation();

    return (
        <>
            <IconButton aria-label="Menu" icon={<HamburgerIcon/>} onClick={onOpen}>Open navbar</IconButton>
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