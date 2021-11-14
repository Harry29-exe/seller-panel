import {Link} from "react-router-dom";
import {Link as LinkBox} from "@chakra-ui/layout";
import React from "react";

export interface NavbarLinkProps {
    name: string,
    path: string
}

const  NavbarLink = (props: NavbarLinkProps) => {
    return (
        <Link to={`${props.path}`}>
            <LinkBox>{props.name}</LinkBox>
        </Link>
    )
}

export default NavbarLink