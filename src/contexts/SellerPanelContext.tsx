import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {MessageDescriptor} from "react-intl";

export interface SellerPanelPath {
    message: MessageDescriptor,
    elementId: string
}

class SellerPanelHolder {
    public paths: SellerPanelPath[];
    public activePath?: SellerPanelPath;

    constructor(paths?: SellerPanelPath[], activePath?: SellerPanelPath) {
        this.paths = paths !== undefined && paths !== null ? paths : [];
        this.activePath = activePath;
    }


    public clone(): SellerPanelHolder {
        return new SellerPanelHolder(this.paths.filter(p => p !== null && p !== undefined), this.activePath);
    }
}

class SellerPanelContextHolder {
    public holder: SellerPanelHolder;
    private readonly updateHolder: (val: SellerPanelHolder) => any;


    constructor(holder: SellerPanelHolder, update: (v: SellerPanelHolder) => any) {
        this.holder = holder;
        this.updateHolder = update;
    }

    public registerPath(path: SellerPanelPath) {
        if (this.holder.paths.length === 0) {
            this.holder.activePath = path;
        }

        this.holder.paths = this.holder.paths.filter(p => p.elementId !== path.elementId);
        this.holder.paths.push(path);
        this.update();
    }

    public unregisterPath(elementId: string) {
        this.holder.paths = this.holder.paths.filter(p => p.elementId !== elementId);
        this.update();
    }


    public setActivePath(elementId: string) {
        const path = this.holder.paths.find(p => p.elementId === elementId);
        if (path) {
            this.holder.activePath = path;
            this.update();
        } else {
            throw new Error();
        }
    }

    public getActivePathMessage(): MessageDescriptor {
        if (this.holder.activePath) {
            return this.holder.activePath.message;
        } else {
            throw new Error();
        }
    }

    public scrollToPath(elementId: string) {
        document.getElementById(elementId)?.scrollIntoView(true);
    }

    private update() {
        this.holder = this.holder.clone();
        this.updateHolder(this.holder);
    }

}


export const SellerPanelContext = createContext<SellerPanelContextHolder>(new SellerPanelContextHolder(new SellerPanelHolder(), () => {
}));

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