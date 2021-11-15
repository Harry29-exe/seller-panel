import React from "react";

export class AuthHolder {
    public users?: string[];
    public token?: string;

    constructor(updateContext: () => void, users?: string[], token?: string) {
        this.users = users;
        this.token = token;
    }

    public isLogged(): boolean {
        return !!this.users;
    }

    public login(username: string, password: string) {

    }

}

export const AuthContext = React.createContext<AuthHolder>(new AuthHolder(() => {}));