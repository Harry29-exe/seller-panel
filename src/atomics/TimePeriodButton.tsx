import {Button, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import React from 'react';

const TimePeriodButton = () => {


    return (
        <Menu>
            <MenuButton as={Button} pos="relative" w="40px" h="40px" p={2} borderRadius="100%" bg={"primary.400"}>

            </MenuButton>
            <MenuList>
                <MenuItem>Account 1</MenuItem>
                <MenuItem>Account 2</MenuItem>
                <MenuItem>Account 3</MenuItem>
                <MenuItem>Logout</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default TimePeriodButton;