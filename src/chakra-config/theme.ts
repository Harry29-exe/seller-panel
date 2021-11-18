import {extendTheme} from "@chakra-ui/react";
import {colors} from "./Colors"
import {mode} from "@chakra-ui/theme-tools"

export default extendTheme(
    {
        components: {
            // Select,
            Divider: {
                baseStyle: (props: any) => ({
                    borderColor: mode("blackAlpha.700", "whiteAlpha.700")(props)
                })
            },
            Select: {
                parts: ["field", "icon"],
                variants: {
                    outline: (props: any) => ({
                        field: {
                            borderColor: mode("blackAlpha.700", "whiteAlpha.700")(props)
                        }
                    })
                }
            }
        },
        // borders: {
        //     '1px': `1px solid ${borderColor}`,
        //     '2px': `2px solid ${borderColor}`
        // },
        colors,
        styles: {
            global: (props: any) => ({
                "body": {
                    background: props.colorMode === "dark" ? "gray.900" : "gray.200",
                }
            }),
        }
    });

