import {extendTheme, useColorModeValue} from "@chakra-ui/react";
import {inspect} from "util";
import {colors} from "./Colors"

export default extendTheme(
    {
    colors,
    styles: {
        global: (props: any) => ({
            "body": {
                background: props.colorMode === "dark" ? "gray.900" : "gray.200",
            }
        }),
        }
    });