import React, {PropsWithChildren} from 'react';
import {HStack, Link, useBreakpointValue, useColorModeValue, useTheme} from "@chakra-ui/react";
import {ColorModeSwitcher} from "../ColorModeSwitcher";

export interface MenuProps {
    tabs: string[]
}

const Navbar = (props: MenuProps) => {
    let bgColor = useColorModeValue("gray.200", "gray.800");
    let navbarType = useBreakpointValue(["phone", "normal"])

    return (
        <HStack w="100vw" h={["50px", "70px", null, "50px"]} px={4} py={2}
                bg={bgColor}
                fontSize={"lg"} fontWeight={"bold"}>
            <HStack flexGrow={4}>
                {
                    props.tabs.map(tab =>
                        <Link>{tab}</Link>
                    )
                }
            </HStack>

            <HStack flexGrow={0}>
                <ColorModeSwitcher justifySelf="flex-end" />*
            </HStack>
        </HStack>
    );
};

export default Navbar;