import {useColorModeValue} from "@chakra-ui/react";

export function useShadowColor() {
    return useColorModeValue("#aaa", "#000");
}