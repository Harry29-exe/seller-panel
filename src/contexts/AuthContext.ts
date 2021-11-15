import React from "react";
import serverAddress from "./ServerAddress";

export class AuthHolder {
    public users?: string[];
    public token?: string;

    constructor(users?: string[], token?: string) {
        this.users = users;
        this.token = token;
    }

    public clone(): AuthHolder {
        return new AuthHolder(this.users, this.token);
    }

}

export class AuthContextHolder {
    public authHolder: AuthHolder;
    private readonly updateFunction: (auth: AuthHolder) => void;

    constructor(authHolder: AuthHolder, updateFunction: (auth: AuthHolder) => void) {
        this.authHolder = authHolder;
        this.updateFunction = updateFunction;
    }

    public isLogged(): boolean {
        return !!this.authHolder.users;
    }

    public login(username: string, password: string) {
        fetch(`${serverAddress}/login`, {
            headers: {
                username: username,
                password: password
            }
        }).then(response => {
            if(response.status == 200) {
                response.json()
                    .then(response => this.parseResponse(response))
            }
        });
    }

    private parseResponse(response: any) {
        this.authHolder.users = response.users;
        this.authHolder.token = response.token;
        this.updateFunction(this.authHolder.clone());
    }

}

export const AuthContext = React.createContext<AuthContextHolder>({} as AuthContextHolder);