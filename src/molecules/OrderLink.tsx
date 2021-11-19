import React from 'react';
import {Link} from "react-router-dom";
import {Button, ChakraProps} from "@chakra-ui/react";

const OrderLink = (props: ChakraProps & { link: string, name: string }) => {
    const {name, link, ...rest} = props;
    return (
        <Link to={link}>
            <Button {...rest} w={["100px", "150px", "150px"]}>
                {name}
            </Button>
        </Link>
    );
};

export default OrderLink;