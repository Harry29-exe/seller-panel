import {createContext, PropsWithChildren, useState} from "react";
import {MessageDescriptor} from "react-intl";

export interface SellerPanelPath {
    message: MessageDescriptor,
    elementId: string
}

class SellerPanelHolder {
    public paths: SellerPanelPath[];
    public activePath?: SellerPanelPath;

    constructor(paths?: SellerPanelPath[], activePath?: SellerPanelPath) {
        this.paths = paths ? paths : [];
        this.activePath = activePath;
    }

    public clone(): SellerPanelHolder {
        let clone = new SellerPanelHolder(this.paths, this.activePath);
        console.log("Clone: ", clone.paths);
        return clone;
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
    // useEffect(() => {
    //     const listener = () => {
    //         // console.log(window.screen.);
    //     };
    //     window.addEventListener('wheel', listener);
    //
    //     return () => {
    //         window.removeEventListener('wheel', listener);
    //     }
    // }, [])


    return (
        <SellerPanelContext.Provider value={new SellerPanelContextHolder(holder.clone(),
            (val: any) => updateHolder(val))}>
            {
                props.children
            }
        </SellerPanelContext.Provider>
    )
}