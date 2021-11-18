import {useBreakpointValue} from "@chakra-ui/react";

export function useComponentWidth() {
    return useBreakpointValue(["90%", "90%", "700px", "850px", "950px"])
}