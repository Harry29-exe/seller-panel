import React from 'react';
import {Link} from "react-router-dom";
import {Button, useBreakpointValue} from "@chakra-ui/react";

const OrderLink = (props: { link: string, name: string }) => {
    const {name, link, ...rest} = props;
    const width = useBreakpointValue(["100px", "150px", "150px"]);

    return (
        <Link to={link} style={{width: "100%"}}>
            <Button size={"sm"}>
                {name}
            </Button>
        </Link>
    );
};

export default OrderLink;