import React, {useContext, useRef, useState} from 'react';
import {
    Box,
    Button, Center, CloseButton, Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {AuthContext} from "../contexts/AuthContext";

class LoginData {
    public username: string = "";
    public password: string = "";
}

const LoginModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const loginData = useRef<LoginData>(new LoginData())
    const authContext = useContext(AuthContext);

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
                            <Input placeholder="Login" onChange={(event: any) =>
                                loginData.current.username = event.target.value}/>
                            <Input placeholder="Password" type="password" onChange={(event: any) =>
                                loginData.current.password = event.target.value}/>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={() =>
                            authContext.login(loginData.current.username,loginData.current.password)}>
                            Login
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default LoginModal;