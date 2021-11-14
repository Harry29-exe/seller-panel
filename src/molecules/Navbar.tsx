import React from 'react';
import {
    Box,
    Button,
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

export interface MenuProps {
    routes: NavbarLinkProps[]
}

const Navbar = (props: MenuProps) => {
    let bgColor = useColorModeValue("gray.300", "gray.800");
    let navbarType = useBreakpointValue(["phone", "normal"])

    return (
        <HStack w="100vw" h={["50px", "70px", null, "50px"]} px={4} py={2}
                bg={bgColor}
                fontSize={"lg"} fontWeight={"bold"}>
            {navbarType === "phone"?
                <MobileNavbar routes={props.routes}/>
                :
                <HStack flexGrow={4} spacing={5}>
                    {
                        props.routes.map(route =>
                            <NavbarLink name={route.name} path={route.path}/>
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

    return (
        <>
            <Button onClick={onOpen}>Open navbar</Button>
            <Drawer isOpen={isOpen} onClose={onClose}
                    placement="right" size="full">
                <DrawerOverlay/>
                <DrawerContent>
                    <VStack onClick={onClose}>
                        {
                            props.routes.map(
                                route => <NavbarLink name={route.name} path={route.path}/>
                            )
                        }
                    </VStack>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Navbar;