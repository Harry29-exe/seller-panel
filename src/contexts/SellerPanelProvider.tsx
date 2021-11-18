import {PropsWithChildren, useEffect, useState} from "react";
import {SellerPanelContext, SellerPanelContextHolder, SellerPanelHolder} from "./SellerPanelContext";

export const SellerPanelProvider = (props: PropsWithChildren<any>) => {
    const [holder, updateHolder] = useState<SellerPanelHolder>(new SellerPanelHolder());
    const holderState = {holder, updateHolder};

    useEffect(() => {
        const listener = () => {
            if (holder.paths.length === 0) {
                return;
            }
            let newActiveElId = smallestTopOffset(holder.paths.map(p => p.elementId));
            if (newActiveElId !== holder.activePath?.elementId) {
                updateHolder(new SellerPanelHolder(holder.paths,
                    holder.paths.find(p => p.elementId === newActiveElId)));
            }
        };
        window.addEventListener('wheel', listener);

        return () => {
            window.removeEventListener('wheel', listener);
        }
    }, [holder])

    return (
        <SellerPanelContext.Provider value={new SellerPanelContextHolder(holderState.holder, holderState.updateHolder)}>
            {
                props.children
            }
        </SellerPanelContext.Provider>
    )
}

function smallestTopOffset(elIds: string[]): string {
    let searchedId = "";
    let smallestOffset = 10000;
    for (let i = 0; i < elIds.length; i++) {
        let id = elIds[i];
        let el = document.getElementById(id);

        if (el === null || el === undefined) {
            continue;
        }

        let box = el.getBoundingClientRect();
        if (searchedId === "") {
            searchedId = id;
            smallestOffset = Math.abs(box.top);
        }
        if (Math.abs(box.top) < smallestOffset) {
            searchedId = id;
            smallestOffset = Math.abs(box.top);
        }
    }

    return searchedId;
}