import {useBreakpointValue} from "@chakra-ui/react";

export function useComponentWidth() {
    return useBreakpointValue(["95%", "90%", "700px", "850px", "950px"])
}