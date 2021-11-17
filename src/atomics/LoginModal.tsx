import React, {useContext, useRef} from 'react';
import {
    Box,
    Button,
    Center,
    CloseButton,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {AuthContext} from "../contexts/AuthContext";

class LoginData {
    public username: string = "";
    public password: string = "";
}

const LoginModal = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const modalBg = useColorModeValue("gray.100", "gray.900");
    const loginData = useRef<LoginData>(new LoginData())
    const authContext = useContext(AuthContext);

    return (
        <>
            <Button onClick={onOpen} bg={"primary.400"}>Login</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
                <ModalOverlay/>
                <ModalContent bg={modalBg} pos={"fixed"} top={"0%"} px={5} py={2}>
                    <ModalHeader>
                        <Box pos="relative">
                            <Center flexGrow={4}>Login</Center>
                            <CloseButton onClick={onClose} pos="absolute" right={0} top={0}/>
                        </Box>
                    </ModalHeader>
                    <ModalBody py={4}>
                        <VStack spacing={2}>
                            <Input placeholder="Login" onChange={(event: any) =>
                                loginData.current.username = event.target.value}/>
                            <Input placeholder="Password" type="password" onChange={(event: any) =>
                                loginData.current.password = event.target.value}/>
                        </VStack>
                    </ModalBody>
                    <ModalFooter pt={6}>
                        <Button bg={"primary.400"} onClick={() =>
                            authContext.login(loginData.current.username, loginData.current.password)}>
                            Login
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default LoginModal;