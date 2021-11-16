import React from 'react';
import {Box, useColorModeValue} from "@chakra-ui/react";
import {HTMLChakraProps} from "@chakra-ui/system";

export interface ComponentBGProps extends HTMLChakraProps<"div"> {

}


const ComponentBg = (props: ComponentBGProps) => {
    const {children, ...rest} = props;
    const bgColor = useColorModeValue("gray.100", "gray.800");
    const shadowColor = useColorModeValue("#aaa", "#000");

    return (
        <Box sx={rest} bg={bgColor} borderRadius={"md"} shadow={`2px 2px 3px 3px ${shadowColor}`}>
            {children}
        </Box>
    );
};

export default ComponentBg;