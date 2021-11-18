import React, {useContext, useEffect} from 'react';
import {SellerPanelContext} from "../contexts/SellerPanelContext";
import {MessageDescriptor} from "react-intl";

const SellerPanelComponentRegister = (props: { message: MessageDescriptor, elementId: string }) => {
    const spContext = useContext(SellerPanelContext);

    useEffect(() => {
        console.log("mount " + props.elementId);
        spContext.registerPath({message: props.message, elementId: props.elementId});

        return () => {
            console.log("unmount " + props.elementId);
            spContext.unregisterPath(props.elementId);
        }
    }, [props.message, props.elementId]);


    return (
        <div id={props.elementId}/>
    );
};

export default SellerPanelComponentRegister;