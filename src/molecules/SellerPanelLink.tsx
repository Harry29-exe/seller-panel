import React from 'react';
import {MessageDescriptor, useIntl} from "react-intl";

const SellerPanelLink = (props: { message: MessageDescriptor, elementId: string }) => {
    const intl = useIntl();

    return (
        <>
            {intl.formatMessage(props.message)}
        </>
    );
};

export default SellerPanelLink;

// useEffect(() => {
//     spContext.registerPath({message: props.message, elementId: props.elementId});
//
//     return () => {
//         spContext.unregisterPath(props.elementId);
//     }
// })