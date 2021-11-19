import React from 'react';
import ComponentBg from "../atomics/ComponentBG";
import {Link} from "react-router-dom";
import {Box, ChakraProps} from "@chakra-ui/react";

const OrderLink = (props: ChakraProps & { link: string, name: string }) => {
    const {name, link, ...rest} = props;
    return (
        <Box {...rest} my={[5, 4, 3]}>
            <Link to={link} style={{width: "100%", height: "100%", display: "block"}}>
                <ComponentBg w={"100%"} fontSize={"lg"} fontWeight={600} textAlign="center">
                    {name}
                </ComponentBg>
            </Link>
        </Box>
    );
};

export default OrderLink;