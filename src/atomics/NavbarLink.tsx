import {Link} from "react-router-dom";
import {Link as LinkBox} from "@chakra-ui/layout";
import React from "react";
import {Center, useColorModeValue} from "@chakra-ui/react";

export interface NavbarLinkProps {
    name: string,
    path: string,
    isActive?: boolean
}

const NavbarLink = (props: NavbarLinkProps) => {
    let mode = useColorModeValue("l", "d")

    return (
        <Link to={`${props.path}`} style={{width: "100%"}}>
            <Center py={4}>
                <LinkBox color={props.isActive ?
                    mode === "d" ? "primary.400" : "primary.400" :
                    mode === "d" ? "white" : "black"
                }
                >
                    {props.name}
                </LinkBox>
            </Center>
        </Link>
    )
}

export default NavbarLink