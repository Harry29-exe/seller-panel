import React from 'react';
import {
    Box,
    Button,
    Flex,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import Rating from "../atomics/Rating";
import "../scrollbar.css";
import {useShadowColor} from "../logic/hooks/useShadowColor";

export interface BuyerOpinionProps {
    name?: string,
    rating: number,
    comment?: string
}

const BuyerReview = (props: BuyerOpinionProps) => {
    const bg = useColorModeValue("gray.100", "gray.800");
    const shadowColor = useShadowColor();
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <VStack bg={bg} w="100%" shadow={`2px 2px 4px 2px ${shadowColor}`} p={5} pb={7}
                    borderRadius="lg" onClick={onOpen} _hover={{cursor: "pointer"}}>

                <OpinionHeader rating={props.rating} name={props.name}/>

                {props.comment &&
                <Box w="100%" maxH="70px" overflowY="auto">
                    {props.comment}
                </Box>
                }
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={"3xl"}>
                <ModalOverlay/>
                <ModalContent bg={bg} mx={5}>
                    <ModalHeader>
                        <OpinionHeader rating={props.rating} name={props.name}/>
                    </ModalHeader>

                    <ModalBody>
                        {props.comment &&
                        <Box w="100%" maxH="60vh" overflowY="auto">
                            {props.comment}
                        </Box>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} bg={"primary.400"}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const OpinionHeader = (props: { name?: string, rating: number }) => {
    const customerBg = useColorModeValue("gray.300", "gray.300");
    const screenSize = useBreakpointValue(["small", "small", "big"]);

    return (
        <Flex w="100%" flexFlow={screenSize === "small" ? "column" : "row"} alignItems="center">
            <HStack>
                <Box w={10} h={10} bg={customerBg} borderRadius="100%"/>
                <Box fontSize="md" fontWeight="600">{props.name ? props.name : "Anonymous"}</Box>
            </HStack>
            <Box flexGrow={4} h={4}/>
            <Rating rating={props.rating}/>
        </Flex>
    )
}

export default BuyerReview;