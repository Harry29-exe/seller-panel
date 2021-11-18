import React, {useContext, useEffect} from 'react';
import {SellerPanelContext} from "../contexts/SellerPanelContext";
import {MessageDescriptor} from "react-intl";
import {Box} from "@chakra-ui/react";

const SellerPanelWidgetPin = (props: { message: MessageDescriptor, elementId: string }) => {
    const spContext = useContext(SellerPanelContext);


    useEffect(() => {
        spContext.registerPath({message: props.message, elementId: props.elementId});

        return () => {
            spContext.unregisterPath(props.elementId);
        }
    }, [props.message, props.elementId]);


    return (
        <Box id={props.elementId} pos="absolute" mt={"-100px"}/>
    );
};

export default SellerPanelWidgetPin;