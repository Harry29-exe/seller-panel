import React from 'react';
import {Box, HStack, useColorModeValue} from "@chakra-ui/react";

const Rating = (props: { rating: number }) => {
    const bgColor = useColorModeValue("gray.900", "gray.100");

    return (
        <HStack>
            {
                [...Array(5)].map((e, i) => (
                    <Box borderRadius="100%" w="20px" h="20px" key={i}
                         bg={props.rating > i ? "primary.400" : bgColor}
                    />))
            }
        </HStack>
    );
};

export default Rating;