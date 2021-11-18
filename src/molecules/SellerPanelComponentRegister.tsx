import React, {useContext, useEffect} from 'react';
import {SellerPanelContext} from "../contexts/SellerPanelContext";
import {MessageDescriptor} from "react-intl";

const SellerPanelComponentRegister = (props: { message: MessageDescriptor, elementId: string }) => {
    const spContext = useContext(SellerPanelContext);


    useEffect(() => {
        spContext.registerPath({message: props.message, elementId: props.elementId});

        return () => {
            spContext.unregisterPath(props.elementId);
        }
    }, [props.message, props.elementId]);


    return (
        <div id={props.elementId}/>
    );
};

export default SellerPanelComponentRegister;