import React from 'react';
import {
    Box,
    Button, Center, CloseButton, HStack, Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack
} from "@chakra-ui/react";

const LoginModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen}>Login</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Box pos="relative">
                            <Center flexGrow={4}>Login</Center>
                            <CloseButton onClick={onClose} pos="absolute" right={0} top={0}/>
                        </Box>
                    </ModalHeader>
                    <ModalBody>
                        <VStack>
                            <Input placeholder="Login"/>
                            <Input placeholder="Password" type="password"/>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green">Login</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default LoginModal;