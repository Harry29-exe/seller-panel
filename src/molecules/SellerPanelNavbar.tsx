import React, {useContext} from 'react';
import {HStack, Link, useColorModeValue} from "@chakra-ui/react";
import {SellerPanelContext} from "../contexts/SellerPanelContext";
import SellerPanelLink from "./SellerPanelLink";
import {useComponentBG} from "../logic/hooks/useComponentBG";
import {useShadowColor} from "../logic/hooks/useShadowColor";

const SellerPanelNavbar = () => {
    const spContext = useContext(SellerPanelContext);
    const bg = useComponentBG();
    const shadow = useShadowColor();
    const textColor = useColorModeValue("black", "white");

    const activePathId = spContext.holder.activePath?.elementId;
    return (
        <HStack bg={bg} spacing={4} fontSize="lg" fontWeight={600} shadow={`0px 1px 2px 2px ${shadow}`}
                w={"100%"} h={"40px"} pos={"sticky"} top={"0px"} px={4} zIndex={5}>
            {
                spContext.holder.paths.map(p =>
                    <Link color={activePathId === p.elementId ? "primary.400" : textColor}
                          onClick={() => {
                              spContext.scrollToPath(p.elementId);
                              spContext.setActivePath(p.elementId);
                          }} key={p.elementId}>
                        <SellerPanelLink message={p.message} elementId={p.elementId}/>
                    </Link>
                )
            }
        </HStack>
    );
};

export default SellerPanelNavbar;