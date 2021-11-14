import {extendTheme, useColorModeValue} from "@chakra-ui/react";
import Colors from "./Colors";

export default extendTheme({
    Colors,
    styles: {
        global: (props: any) => ({
            "body": {
                background: props.colorMode === "dark" ? "gray.900" : "gray.200",
            }
        }),
        }
    });