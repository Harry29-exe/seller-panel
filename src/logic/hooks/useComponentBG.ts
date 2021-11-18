import {useColorModeValue} from "@chakra-ui/react";

export function useComponentBG() {
    return useColorModeValue("gray.100", "gray.800");
}