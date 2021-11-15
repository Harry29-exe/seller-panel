import React, {useContext} from 'react';
import {Box, Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {AuthContext} from "../contexts/AuthContext";
import LoginModal from "../molecules/LoginModal";

const AccountButton = () => {
    const authContext = useContext(AuthContext);

    if (!authContext.isLogged()) {
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
                        {
                            authContext.authHolder.users?.map(user =>
                                <MenuItem ket={user} onClick={() => authContext.changeActiveUser(user)}>
                                    {user}
                                </MenuItem>
                            )
                        }
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        );
    }
};

export default AccountButton;