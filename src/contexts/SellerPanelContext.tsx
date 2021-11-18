import {createContext} from "react";
import {MessageDescriptor} from "react-intl";

export interface SellerPanelPath {
    message: MessageDescriptor,
    elementId: string
}

export class SellerPanelHolder {
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

export class SellerPanelContextHolder {
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
        // if (this.holder.paths[0].elementId === elementId) {
        //     document.getElementById(elementId)?.scrollIntoView({behavior: "smooth", block: "center"});
        // } else {
        document.getElementById(elementId)?.scrollIntoView({behavior: "smooth", block: "start"});
        // }
    }

    private update() {
        this.holder = this.holder.clone();
        this.updateHolder(this.holder);
    }

}


export const SellerPanelContext = createContext<SellerPanelContextHolder>(new SellerPanelContextHolder(new SellerPanelHolder(), () => {
}));

