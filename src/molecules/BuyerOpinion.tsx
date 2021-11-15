import React from 'react';
import {Box, Center, Flex, HStack, Textarea, useColorModeValue, VStack} from "@chakra-ui/react";
import Rating from "../atomics/Rating";

const BuyerOpinion = () => {
    const customerBg = useColorModeValue("gray.700", "gray.300")
    const bg = useColorModeValue("gray.100", "gray.900")

    return (
        <VStack bg={bg} w="100%" shadow={"2px 2px 4px 2px black"} p={5} borderRadius="lg">
            <HStack w="100%">
                <HStack>
                    <Box w={10} h={10} bg={customerBg} borderRadius="100%"/>
                    <Box fontSize="md" fontWeight="600">Alex Smith</Box>
                </HStack>
                <Box flexGrow={4}/>
                <Rating rating={4}/>
            </HStack>

            <Textarea/>
        </VStack>
    );
};

export default BuyerOpinion;