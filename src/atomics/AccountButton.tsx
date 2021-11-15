import React, {useContext} from 'react';
import {Box, Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {AuthContext} from "../contexts/AuthContext";
import LoginModal from "../molecules/LoginModal";

const AccountButton = () => {
    const authContext = useContext(AuthContext);

    if (authContext === null) {
        return (
            <LoginModal/>
        )
    } else {
        return (
            <Box fontSize="lg">
                <Menu>
                    <MenuButton as={Button} pos="relative" w="40px" h="40px" p={2}
                                borderRadius="100%" bg={"primary.400"}>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Account 1</MenuItem>
                        <MenuItem>Account 2</MenuItem>
                        <MenuItem>Account 3</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        );
    }
};

export default AccountButton;